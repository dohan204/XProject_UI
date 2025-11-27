import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { type Exam } from '../../../model/apiResponse/ExamDetails';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
export default function ExamPHP() {
    const navigate = useNavigate();
    const [exam, setExam] = useState<Exam[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { code } = useParams()
    const [page, setPage] = useState<number>(0);
    const page_size = 4;
    const start = page * page_size;
    const end = start + page_size;

    const visible = exam.slice(start, end);
    const hasMore = end < exam.length
    const hasPrev = start > exam.length
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
    // thực hiện lưu lại đáp án vào localStorage
    return (
        <Box display={'flex'} flexDirection={'column'} width={'98vw'} height={'auto'}>
            <Box width='98vw' height={'12vh'} p={2} m={1} display={'flex'} flexDirection={'row'}>
                <Box width={'10%'} height={'100%'} display={'flex'} justifyContent={'flex-start'}>
                    <Button onClick={handlePrevouis} variant='contained'
                        sx={{
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
            <Box width='98vw' height={'60vh'} p={2} m={1}>
                <Box height={'15%'} width={'100%'} display={'flex'} flexDirection={'column'}>
                    <Box height={'50%'} width={'100%'}>
                        <Typography variant='h4'>
                            Các bài thi nổi bật
                        </Typography>
                    </Box>
                    <Box height={'50%'} width={'100%'} display={'flex'} justifyContent={'flex-end'} pb={2}>
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
                    </Box>
                </Box>
                <Box height={'85%'} width={'100%'} component={Paper} display={'flex'} flexDirection={'row'}
                    justifyContent={'space-around'}
                    p={1}
                >
                    {loading ? <Alert severity='success'>Dang tai du lieu...</Alert>
                        : visible.map((e) => (
                            <Box width={'20%'} height={'100%'} key={e.id}>
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
                                        <Button size='small' onClick={() => navigate(`/test/${e.id}`)
                                        }>
                                            Làm bài
                                        </Button>
                                        <IconButton>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton>
                                            <BookIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box width={'98vw'} height={'40vh'} p={2}>
                <Box width={'100%'} height={'20%'} bgcolor={'lightcyan'}>
                    <Typography variant='h5'>
                        Các bài thi Chủ đề liên quan khác
                    </Typography>
                </Box>
                <Box width={'100%'} height={'80%'} bgcolor={'lightcoral'} p={1} m={1}
                    display={'flex'} flex={1} flexDirection={'row'} justifyContent={'space-around'}
                >
                    <Box width={'18%'} height={'100%'} bgcolor={'lemonchiffon'}></Box>
                    <Box width={'18%'} height={'100%'} bgcolor={'lemonchiffon'}></Box>
                    <Box width={'18%'} height={'100%'} bgcolor={'lemonchiffon'}></Box>
                    <Box width={'18%'} height={'100%'} bgcolor={'lemonchiffon'}></Box>
                    <Box width={'18%'} height={'100%'} bgcolor={'lemonchiffon'}></Box>
                </Box>
            </Box>
        </Box>
    )
}
