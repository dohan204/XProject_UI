import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Snackbar, Typography, type SnackbarCloseReason } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import type { Favorite } from '../../../model/examtest/FavoriteExam';
import { type Exam } from '../../../model/apiResponse/ExamDetails';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
export default function ExamPHP() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [exam, setExam] = useState<Exam[]>([]);
    const [openSnakbar, setOpenSnakbar] = useState<boolean>(false);
    // const [examId, setExamId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const { code } = useParams()
    // const [page, setPage] = useState<number>(0);
    // const page_size = 4;
    // const start = page * page_size;
    // const end = start + page_size;

    // const visible = exam.slice(start, end);
    // const hasMore = end < exam.length
    // const hasPrev = start > exam.length
    // lasy ra danh sach bai thi theo mon hoc 
    const getExamBySubject = async () => {
        setLoading(true)
        try {
            const res = await axios.get<Exam[]>(`http://localhost:8089/api/Exam/examBySubjectName?name=${code}`)
            setExam(res.data)
            console.log('lay du lieu thanh cong.', res.data);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!code && code === null) return;
        getExamBySubject();
    }, [code])
    const handlePrevouis = () => {
        navigate(-1)
    }

    const handleSubmitFavorite = (id: number) => {
        setOpenSnakbar(true)
        console.log(id)
        const payload = {
            accountId: user?.nameid,
            examId: id
        };
        console.log(payload);
        try {
            axios.post('http://localhost:8089/api/Exam/FavoriteExam', payload)
            console.log('them vào danh sách yêu thích thành công.');
        } catch (err) {
            console.error("lỗi khi thực hiện.", err)
        } finally {

        }
    }
    const handleCloseSnakBar = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSnakbar(false);
    }
    // thực hiện lưu lại đáp án vào localStorage
    return (
        <Box display={'flex'} flexDirection={'column'} width={'98vw'} height={'auto'}>
            <Box width='98vw' height={'12vh'} p={2} m={1} display={'flex'} flexDirection={'row'}>
                <Box width={'10%'} display={'flex'} justifyContent={'flex-start'}>
                    <Button onClick={handlePrevouis} variant='contained'
                        size='small'
                        sx={{
                            height: '35px',
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                        color='success'
                    >Quay lai</Button>
                </Box>
                <Box width={'70%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h5'>
                        Các bài thi, đề thi môn {code}
                    </Typography>
                </Box>
            </Box>
            <Box width='98vw' height={'auto'} p={2} m={1}>
                <Box height={'auto'} width={'100%'} display={'flex'} flexDirection={'column'}>
                    <Box width={'100%'}>
                        <Typography variant='h4'>
                            Danh sách bài thi, đề thi...
                        </Typography>
                    </Box>
                    {/* <Box height={'50%'} width={'100%'} display={'flex'} justifyContent={'flex-end'} pb={2}>
                        {hasMore && (
                            <Box component={'a'} onClick={() => setPage(page => page + 1)} display={'flex'} flexDirection={'row'}
                                justifyContent={'center'} alignContent={'center'} alignItems={'center'}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography fontSize={30} >
                                    Xem thêm
                                </Typography>
                                <ArrowForwardIcon sx={{ fontSize: 30 }} />
                            </Box>
                        )}
                        {hasPrev && (
                            <Box component={'a'} onClick={() => setPage(page => page - 1)} display={'flex'} flexDirection={'row'}
                                justifyContent={'center'} alignContent={'center'} alignItems={'center'}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography fontSize={30} >
                                    Quay lai
                                </Typography>
                                <ArrowForwardIcon sx={{ fontSize: 30 }} />
                            </Box>
                        )}
                    </Box> */}
                </Box>
                <Box height={'85%'} width={'100%'} component={Paper} display={'flex'} flexDirection={'row'}
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                    p={1}
                >
                    {loading ? <Alert severity='success'>Dang tai du lieu...</Alert>
                        : exam.map((e) => (
                            <Box width={'22%'} height={'auto'} key={e.id} m={1}>
                                <Card sx={{
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    <CardHeader
                                        // component={'img'}
                                        title={e.examName}
                                    />
                                    <CardContent>
                                        <Typography>
                                            Số câu hỏi: {e.numberOfQuestion}
                                        </Typography>
                                        <Typography>
                                            Thời gian làm bài: {e.testingTime}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                            <Box display={'flex'} width={'50%'} alignContent={'flex-start'}>
                                                <Button size='small' onClick={() => navigate(`/test/${e.id}`)
                                                }>
                                                    Làm bài
                                                </Button>
                                            </Box>
                                            <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
                                                <IconButton onClick={() => handleSubmitFavorite(e.id)}
                                                        sx={{
                                                            '&:active, &:hover' : {
                                                                backgroundColor: 'pink',
                                                            }
                                                        }}
                                                    >
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <Snackbar
                                                    open={openSnakbar}
                                                    autoHideDuration={1500}
                                                    onClose={handleCloseSnakBar}
                                                    message="Đã thêm vào danh sách yêu thích."
                                                />
                                                <IconButton>
                                                    <BookIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}
