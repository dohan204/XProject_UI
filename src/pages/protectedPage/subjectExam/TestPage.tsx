import { Box, Button, ButtonGroup, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { ExamDetails, Question } from '../../../model/apiResponse/ExamDetails';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import background from '../../../assets/background3.jpg'
import TimeDown from './TimeDown';
import DialogConfirm from './DialogConfirm';

type ChoiceOption = Record<number, string>;
// type Result = Record<number, string>

export default function TestPage() {
    const [selectedValue, setSelectedValue] = useState<ChoiceOption>({});    
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [question, setQuestion] = useState<Question[]>([]);
    const [exam, setExam] = useState<ExamDetails | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const examId = Number(id);
        if (!examId) {
            console.log("Id không hợp lệ");
            return;
        }
        setLoading(true);

        const getDetails = async () => {
            try {
                const res = await axios.get<ExamDetails>(`http://localhost:8089/api/Exam/examDetails/${examId}`);
                console.log("Exam details:", res.data);

                setExam(res.data);
                setQuestion(res.data.question);
                setSelectedIndex(0);
            } catch (err) {
                console.log("Lỗi GET:", err);
            } finally {
                setLoading(false);
            }
        };

        getDetails();
    }, [id]);
    const handleOpenDialog = () => setOpenDialog(true)
    const handleCloseDialog = () => setOpenDialog(false)
    const currentQuestion = question[selectedIndex];

    const handleClickPrevious = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const handleClickNext = () => {
        if (selectedIndex < question.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };
    // tao mot danh sach các lựa chọn 
    const disablePrevious = selectedIndex === 0
    const disableNext = selectedIndex === question.length - 1;


    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    //     setSelectedValue(value);
    // }

    const handleSelect = (questionId: number, answer: string) => {
        setSelectedValue(prev => ({
            ...prev, 
            [questionId]: answer
        }))
    }
    console.log(selectedValue)
    // sau khi người dùng chọn xong thì thực hiện lưu lại đáp án vào localStorage 
    localStorage.setItem('exam', JSON.stringify(selectedValue))
    if (loading) {
        return (
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    return (
        <Box width={'98vw'} display={'flex'} flexDirection={'column'}
            sx={{
                backgroundImage: `${background}`
            }}
        >
            <Box width={'100%'} height={'20vh'} display={'flex'} p={1}
                flexDirection={'row'} justifyContent={'space-around'}>

                <Box width={'20%'} bgcolor={'lightcoral'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography>{exam?.name || "Tên bài thi"}</Typography>
                </Box>

                <Box width={'20%'} bgcolor={'lightcoral'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography>{exam?.subjectName || "Môn thi"}</Typography>
                </Box>

                <Box width={'20%'} bgcolor={'lightcoral'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Typography>{question.length || 0} câu </Typography>
                    <Typography>Câu số {selectedIndex + 1}/{question.length}</Typography>
                </Box>

                <Box width={'35%'} bgcolor={'lightcoral'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography><TimeDown time={exam?.timeTest} /> phút</Typography>
                </Box>
            </Box>

            <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'space-around'} pt={1} overflow={'hidden'} mb={1}>
                <Box width={'65%'} height={'100%'} component={Paper}>
                    <Box height={'15%'} width={'100%'} display={'flex'} alignItems={'center'} p={1}>
                        {currentQuestion ? (
                            <Typography> Câu {selectedIndex + 1}: {currentQuestion.content}</Typography>
                        ) : (
                            <Typography>Đang tải câu hỏi...</Typography>
                        )}
                    </Box>

                    <Box height={'60%'} sx={{ p: 2, m: 1 }} borderRadius={5}>
                        {currentQuestion && (
                            <FormControl key={currentQuestion.id}>
                                <RadioGroup
                                >
                                    <FormControlLabel  value={currentQuestion.optionA} control={<Radio 
                                        checked={selectedValue[currentQuestion.id] === currentQuestion.optionA } 
                                        onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionA)}
                                     />} label={currentQuestion.optionA} />
                                    <FormControlLabel value={currentQuestion.optionB} control={<Radio
                                        checked={selectedValue[currentQuestion.id] === currentQuestion.optionB}
                                        onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionB)}
                                     />} label={currentQuestion.optionB} />
                                    <FormControlLabel value={currentQuestion.optionC} control={<Radio
                                        checked={selectedValue[currentQuestion.id] === currentQuestion.optionC}
                                        onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionC)}
                                     />} label={currentQuestion.optionC} />
                                    <FormControlLabel value={currentQuestion.optionD} control={<Radio
                                        checked={selectedValue[currentQuestion.id] === currentQuestion.optionD}
                                        onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionD)}
                                     />} label={currentQuestion.optionD} />
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Box>
                    <Box height={'20%'} width={'100%'} display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyItems: 'stretch',
                            justifyContent: 'space-between'
                        }}>
                            <Button variant='contained' sx={{ m: 1 }} disabled={disablePrevious} onClick={handleClickPrevious}>Previous</Button>
                            <Button variant='contained' sx={{ m: 1 }} disabled={disableNext} onClick={handleClickNext}>Next</Button>
                            <Button variant='contained' sx={{ m: 1 }} onClick={handleOpenDialog}>
                                Nộp bài
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box width={'30%'} height={'100%'} bgcolor={'lemonchiffon'} component={Paper}>
                    <Box width={'100%'} height={'100%'} p={1} m={1}>
                        <Typography variant='h5'>
                            Hướng dẫn làm bài
                        </Typography>
                        <Typography>
                            1. Chọn đáp án bạn cho là nó đúng
                        </Typography>
                        <Typography>
                            2. Chuyển câu bằng Next, xem lại câu trước bằng Previous
                        </Typography>
                        <Typography>
                            3. Làm trong Thời gian quy định
                        </Typography>
                        <Typography>
                            4. Khi xong thì có thể click vào nút nộp bài.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <DialogConfirm open={openDialog} handleClose={handleCloseDialog} examId={exam?.id} />
        </Box>
    );
}
