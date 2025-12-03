import { Box, Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ExamDetails, Question } from '../../../model/apiResponse/ExamDetails';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import background from '../../../assets/background3.jpg'
import DialogConfirm from './DialogConfirm';

type ChoiceOption = Record<number, string>;

export default function TestPage() {
    const [selectedValue, setSelectedValue] = useState<ChoiceOption>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [ms, setMs] = useState<number>(0);
    const [timeTests, setTimeTests] = useState<number>(0)
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [question, setQuestion] = useState<Question[]>([]);
    const [exam, setExam] = useState<ExamDetails | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Lấy dữ liệu bài thi
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
                setExam(res.data);
                setQuestion(res.data.question);
                setSelectedIndex(0);

                // lưu thời gian bài thi vào sessionStorage
                sessionStorage.setItem('timeTest', JSON.stringify(res.data.timeTest));
                setTimeTests(res.data.timeTest);

            } catch (err) {
                console.log("Lỗi GET:", err);
            } finally {
                setLoading(false);
            }
        };

        getDetails();
    }, [id]);

    // Lưu đáp án vào localStorage mỗi khi selectedValue thay đổi
    useEffect(() => {
        localStorage.setItem('exam', JSON.stringify(selectedValue));
    }, [selectedValue]);
    const examId = exam?.id;
    console.log(examId)
    const handlePostExamToServer = async () => {
        const exam = localStorage.getItem('exam')
        if (exam == null || exam.length === 0) {
            console.log('Khong do du lieu can gui di, vui long kiem tra lai')
            return false;
        }
        const examData = JSON.parse(exam);
        setLoading(true);
        try {
            var result = await axios.post(`http://localhost:8089/api/Exam/submitExam/${examId}`, examData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const res = JSON.stringify(result.data)
            localStorage.setItem('resultExam', res);

            sessionStorage.removeItem('examStart');

            // setResult(res);
        } catch (errr) {
            if (axios.isAxiosError(errr)) {
                if (errr.response?.status === 500) {
                    console.log("lỗi server, vui lòng liên hệ tới quản trị viên.");
                }
            }
        } finally {
            setLoading(false);
            localStorage.removeItem ('exam');
        }
        navigate(`/test/${examId}/result`);
    }
    const AutoSubmit = () => {
        handlePostExamToServer()
    }
    // Countdown timer
    useEffect(() => {
        if (!timeTests) return;

        const totalSeconds = timeTests * 60;
        const savedStart = sessionStorage.getItem("examStart");
        let remaining = totalSeconds;

        if (savedStart) {
            const elapsed = Math.floor((Date.now() - parseInt(savedStart)) / 1000);
            remaining = totalSeconds - elapsed;
            if (remaining <= 0) remaining = 0;
        } else {
            sessionStorage.setItem("examStart", Date.now().toString());
        }

        setMs(remaining);

        const timer = setInterval(() => {
            setMs(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    sessionStorage.removeItem("examStart");
                    AutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeTests]);

    const currentQuestion = question[selectedIndex];

    const handleClickPrevious = () => {
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };

    const handleClickNext = () => {
        if (selectedIndex < question.length - 1) setSelectedIndex(selectedIndex + 1);
    };

    const handleSelect = (questionId: number, answer: string) => {
        setSelectedValue(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const disablePrevious = selectedIndex === 0;
    const disableNext = selectedIndex === question.length - 1;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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
            sx={{ backgroundImage: `${background}` }}
        >
            {/* Header info */}
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
                    <Typography>Thời gian: {formatTime(ms)}</Typography>
                </Box>
            </Box>

            {/* Question content */}
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
                                <RadioGroup>
                                    <FormControlLabel value={currentQuestion.optionA} control={<Radio
                                        checked={selectedValue[currentQuestion.id] === currentQuestion.optionA}
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

                    {/* Navigation buttons */}
                    <Box height={'20%'} width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button variant='contained' sx={{ m: 1 }} disabled={disablePrevious} onClick={handleClickPrevious}>Previous</Button>
                            <Button variant='contained' sx={{ m: 1 }} disabled={disableNext} onClick={handleClickNext}>Next</Button>
                            <Button variant='contained' sx={{ m: 1 }} onClick={handleOpenDialog}>
                                Nộp bài
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Instructions */}
                <Box width={'30%'} height={'100%'} bgcolor={'lemonchiffon'} component={Paper}>
                    <Box width={'100%'} height={'100%'} p={1} m={1}>
                        <Typography variant='h5'>Hướng dẫn làm bài</Typography>
                        <Typography>1. Chọn đáp án bạn cho là đúng</Typography>
                        <Typography>2. Chuyển câu bằng Next, xem lại câu trước bằng Previous</Typography>
                        <Typography>3. Làm trong thời gian quy định</Typography>
                        <Typography>4. Khi xong thì click nút nộp bài</Typography>
                    </Box>
                </Box>
            </Box>

            <DialogConfirm open={openDialog} handleClose={handleCloseDialog} examId={exam?.id} />
        </Box>
    );
}
