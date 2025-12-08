import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useBlocker } from 'react-router-dom'
import type { ExamDetails, Question } from '../../../model/apiResponse/ExamDetails';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import background from '../../../assets/background3.jpg'
import DialogConfirm from './DialogConfirm';

// import AutoSubmitWarning from './AutoSubmit';
type ChoiceOption = Record<number, string>;
export default function TestPage() {
    // reset value when page reload
    const getInitialState = (key: string, defaultValue: ChoiceOption | number) => {
        // lấy ra danh sách từ localStorage
        const value = sessionStorage.getItem(key)
        if (value) {
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        }
        return defaultValue;
    }
    const [selectedValue, setSelectedValue] = useState<ChoiceOption>(
        getInitialState('exam', {})
    );
    const location = useLocation();
    const params = useParams()
    const [tab, setTab] = useState(!document.hidden);
    const [numberChangeTab, setNumberChangeTab] = useState<number>(0)
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [ms, setMs] = useState<number>(0);
    const [timeTests, setTimeTests] = useState<number>(0)
    const [selectedIndex, setSelectedIndex] = useState<number>(
        getInitialState('indexQuestion', 0)
    );
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [showModel, setShowModel] = useState<boolean>(false)
    const [question, setQuestion] = useState<Question[]>([]);
    const [exam, setExam] = useState<ExamDetails | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openAuto, setOpenAuto] = useState<boolean>(false);
    const [middleWarning, setMiddleWaring] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    debugger;
    // logic chặn
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        console.log('isDirty value:', isDirty);
        return isDirty && currentLocation.pathname !== nextLocation.pathname
    })

    // theo dõi trạng thái
    useEffect(() => {
        // Nếu trạng thái của blocker là "blocked", tức là người dùng đang cố gắng rời đi
        if (blocker.state === 'blocked') {
            setShowModel(true)
        } else if (blocker.state === 'unblocked') {
            // Khi không bị chặn nữa, ẩn modal (ví dụ: sau khi người dùng bấm Hủy)
            setShowModel(false)
        }
    }, [blocker.state, isDirty])

    // hàm xử lý khi người dùng rời đi 
    const handleProceed = () => {
        setShowModel(false)
        // đây là hàm quan trọng nhất: cho phép điều hướng tới trang đích
        if (!openAuto) {
            sessionStorage.removeItem('exam')
            sessionStorage.removeItem('indexQuestion')
            sessionStorage.removeItem('timeTest')
        }
        if (blocker.proceed) {
            blocker.proceed();
        }
    }
    useEffect(() => {
        if(!openAuto){
            handleProceed
        }
    }, [openAuto])
    // hàm ở lại khi người dùng bắm hủy 
    const handleCancel = () => {
        setShowModel(false)
        // đây là hàm quan trọng nhất: thông báo bỏ qua yêu cầu 
        if (blocker.reset) {
            blocker.reset();
        }
    }
    // Lấy dữ liệu bài thi/ get data exam
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
                localStorage.setItem('examResponse', JSON.stringify(res.data))
                const index = sessionStorage.getItem('indexQuestion');
                if (index)
                    setSelectedIndex(parseInt(index) ?? 0);
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
    useEffect(() => {
        const selectedIndex = sessionStorage.getItem('indexQuestion')
        if (selectedIndex) {
            setSelectedIndex(parseInt(selectedIndex!))
        }
    }, [])
    // Lưu đáp án vào localStorage mỗi khi selectedValue thay đổi
    // useEffect(() => {
    //     localStorage.setItem('exam', JSON.stringify(selectedValue));
    // }, [selectedValue]);
    // useEffect(() => {
    //     handleProceed()
    // }, [openAuto])
    // save data to sesstionStorage
    useEffect(() => {
        sessionStorage.setItem('indexQuestion', selectedIndex.toString())
        sessionStorage.setItem('exam', JSON.stringify(selectedValue))
    }, [selectedValue, selectedIndex])
    console.log(selectedIndex)
    const examId = exam?.id;
    console.log(examId)
    const prevPathname = useRef(location.pathname);
    console.log('path curent: ', prevPathname.current)
    useEffect(() => {
        const handleChangeRouter = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }
        window.addEventListener('beforeunload', handleChangeRouter)
        return () => {
            window.removeEventListener('beforeunload', handleChangeRouter)
        }
    }, [location.pathname]);
    // submit Data
    const handlePostExamToServer = async () => {
        const exam = sessionStorage.getItem('exam')
        console.log(exam)
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
            console.log(res)
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
            localStorage.removeItem('exam');
        }
        navigate(`/test/${examId}/result`);
    }
    const AutoSubmit = () => {
        handlePostExamToServer()
        // handleProceed()
    }

    // check tab visibility change
    useEffect(() => {
        const handleChangeVisibility = () => {
            // cap nhat thuoc tinh dua tren document cua hidden 
            setTab(!document.hidden)
            if (document.hidden) {
                setNumberChangeTab(prev => prev + 1)
                console.log('Nguoi dung da roi khoi tab')
            } else {
                console.log('nguoi dung da quay tro lai Tab')
            }
        }
        window.addEventListener('visibilitychange', handleChangeVisibility)
        return () => {
            {
                window.removeEventListener('visibilitychange', handleChangeVisibility)
            }
        }
    }, [])
    // handle Tab change
    const MAX_OUT_TAB = 10;
    useEffect(() => {
        if (numberChangeTab >= MAX_OUT_TAB) {
            setMessage("Hệ thống sẽ nộp bài giúp bạn, bạn không cần phải cảm ơn nhé!!")
            setOpenAuto(true);
        } else if (numberChangeTab === 8) {
            setMiddleWaring(true)
            setMessage("Số lần Chuyển trang đang sắp giới hạn!!!")
        }
    }, [numberChangeTab])

    // handleAutoSubmit when tabchange = 10
    useEffect(() => {
        if (openAuto) {
            const timer = setTimeout(() => {
                AutoSubmit()
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [openAuto])


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

    // get current by index
    const currentQuestion = question[selectedIndex];

    const handleClickPrevious = () => {
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };

    const handleClickNext = () => {
        if (selectedIndex < question.length - 1) setSelectedIndex(selectedIndex + 1);
    };

    // add value to arr
    const handleSelect = (questionId: number, answer: string) => {
        setSelectedValue(prev => ({
            ...prev,
            [questionId]: answer
        }));
        setIsDirty(true)
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const disablePrevious = selectedIndex === 0;
    const disableNext = selectedIndex === question.length - 1;

    // hhandledate
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
    // const handleCopy = () => {
    //     window.addEventListener('copy', (e) => {
    //         e.preventDefault();
    //     })
    // }
    return (
        <Box width={'98vw'} display={'flex'} flexDirection={'column'}
            sx={{ backgroundImage: `${background}` }}
        >
            {/* Header info */}
            <Box width={'100%'} height={'18vh'} display={'flex'} p={1}
                flexDirection={'row'} justifyContent={'space-around'}>
                <Box width={'20%'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography>Bài thi: {exam?.name || "Tên bài thi"}</Typography>
                </Box>
                <Box width={'20%'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography> Môn thi: {exam?.subjectName || "Môn thi"}</Typography>
                </Box>
                <Box width={'20%'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Typography>Số câu hỏi: {question.length || 0} câu </Typography>
                    <Typography>Câu số {selectedIndex + 1}/{question.length}</Typography>
                </Box>
                <Box width={'35%'} height={'100%'} component={Paper}
                    display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Typography sx={{ display: 'block' }}>Thời gian: {formatTime(ms)}</Typography>
                    <Typography>Số lần rời trang: {numberChangeTab}/{MAX_OUT_TAB}</Typography>
                    <Typography p={1} fontStyle={'20px'} color='error'>{middleWarning && message}</Typography>
                </Box>
            </Box>

            {/* Question content */}
            <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'space-around'} pt={1} overflow={'hidden'} mb={1}>
                <Box width={'65%'} height={'100%'} component={Paper} onCopy={e => e.preventDefault()}>
                    <Box height={'10%'} width={'100%'} display={'flex'} alignItems={'center'} p={1}>
                        {currentQuestion ? (
                            <Typography sx={{
                                userSelect: 'none', // Prevents selection of text
                                cursor: 'default',  // Optional: Changes cursor to indicate no interaction
                            }}> Câu {selectedIndex + 1}: {currentQuestion.content}</Typography>
                        ) : (
                            <Typography>Đang tải câu hỏi...</Typography>
                        )}
                    </Box>
                    <Box height={'50%'} sx={{ p: 2, m: 1 }} borderRadius={5}>
                        {currentQuestion && (
                            <FormControl key={currentQuestion.id}>
                                <RadioGroup sx={{
                                    userSelect: 'none', // Prevents selection of text
                                    cursor: 'default',  // Optional: Changes cursor to indicate no interaction
                                }}>
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
                    <Box height={'20%'} width={'100%'} display={'flex'} bgcolor={'lavender'} justifyContent={'flex-end'}>
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
                    <Box p={1} m={1}>
                        <Typography variant='h5'>Hướng dẫn làm bài</Typography>
                        <Typography>1. Chọn đáp án bạn cho là đúng</Typography>
                        <Typography>2. Chuyển câu bằng Next, xem lại câu trước bằng Previous</Typography>
                        <Typography>3. Làm trong thời gian quy định</Typography>
                        <Typography>4. Khi xong thì click nút nộp bài</Typography>
                    </Box>
                    <Box p={1} m={1}>
                        <Typography color='red' fontStyle={'italic'}>
                            Lưu ý: Để minh bạch trong quá trình làm bài, bạn vui lòng không chuyển trang
                            nếu bạn vượt quá số lần thì bài thi của bạn sẽ được nộp tự động.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Dialog open={openAuto}>
                <DialogTitle>
                    <Typography color='warning'>Thông báo</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bài làm của bạn sẽ được nộp tự động trong vòng 2 giây,
                        Bạn không cần phải cảm on nhé!!
                    </Typography>
                </DialogContent>
            </Dialog>
            <Dialog open={showModel}>
                <DialogTitle>
                    <Typography color='warning'>
                        Xác nhận rời đi
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bài thi của bạn chưa hoàn thành, bạn có chắc là rời đi chứ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleProceed}
                        variant='contained'
                        color='success'
                    >
                        Thoát
                    </Button>
                    <Button onClick={handleCancel}
                        variant='contained'
                        color='success'
                    >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            <DialogConfirm open={openDialog} handleClose={handleCloseDialog} examId={exam?.id} />
        </Box>
    );
}
