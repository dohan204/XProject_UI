import { Box, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Paper, Typography } from "@mui/material";
// import background2 from '../../assets/dongLucp1.jpg'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import  { useEffect, useState } from 'react'
import { type Subject } from '../../../model/apiResponse/Subject'
import axios, { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
import { subjectImage } from "../../../image/SubjectImage";
import { ListImage } from "../../publicPage/Homepage/DifferentSubject";
export default function SubjectName() {
    const navigate = useNavigate()
    const [subject, setSubject] = useState<Subject[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    // const [codeSubject, setCodeSubject] = useState<string>('');
    const getAllSubject = async () => {
        setLoading(true)
        try {
            const response = await axios.get<Subject[]>('https://api.testx.space/api/Subject/subjects')
            const payload = response.data.map((e, i) => ({
                ...e,
                img: subjectImage[i],
            }))
            setSubject(payload);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status === 404) {
                    console.error('Not found data')
                }
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllSubject();
    }, [])

    const subjectOutline = subject.filter(e => e.moduleId === 2).map((e, i) => ({
        ...e,
        img: ListImage[i]
    }))
    const handleClickSubject = (code: string) => {
        // setCodeSubject(code)
        navigate(`${code}`)
    }
    return (
        <div>
            <Box sx={{width: '97vw', height: 'auto', background: 'linear-gradient(to right bottom, #66FF99, #FFFFFF)'}}>
                <Box p={4}>
                    <Typography sx={{ fontSize: 35 }}>
                        Danh sách bài thi theo môn thi chủ đề hiện có
                    </Typography>

                </Box>

                <Box>
                    <Typography sx={{ fontSize: 30 , p: 2}}>
                        1. Chủ đề Lập trình
                    </Typography>
                    <Box width={'93vw'} height='auto' p={5}
                        display={'flex'} flexDirection={'column'}
                        bgcolor={'linear-gradient(to right,#9BB8ED, #FCF0CF'}
                        sx={{
                            background: 'linear-gradient(to right, #9BB8ED, #FCF0CF)'
                        }}
                    >
                        <Grid width={'100%'} height={'50%'} container columns={20}
                            display={'flex'} flexDirection={'row'} spacing={3}
                        >
                            {/* <Grid size={2}></Grid> */}
                            {loading ? (<Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>) : subject.filter(e => e.moduleId === 1).map((sub) => (
                                <Grid size={5}
                                    key={sub.id}
                                    component={Paper}
                                    sx={{
                                        transition: '0.5s',
                                        '&:hover': {
                                            transition: '0.5s ease',
                                            transform: 'translateY(-10px)',
                                            boxShadow: '4px 4px 6px lightgray'
                                        }
                                    }}
                                >
                                    <CardActionArea sx={{
                                        // background: ''
                                        width: '100%', height: '100%', outline: 'none',
                                        '&:focus, &:hover': {
                                            outline: 'none',
                                            borderColor: 'white'
                                        }
                                    }} onClick={() => handleClickSubject(sub.code)}>
                                        <CardHeader title={sub.name} />
                                        <CardMedia
                                            component={'img'}
                                            height={'160px'}
                                            image={sub.img}
                                        />
                                        <CardContent>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            ))}
                            {/* <Grid size={2}></Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{ fontSize: 40, padding: 4 }}>
                        2 .Các môn đại cương
                    </Typography>
                    <Box width={'93vw'} height='auto' p={5}
                        display={'flex'} flexDirection={'column'}
                        bgcolor={'linear-gradient(to right,#9BB8ED, #FCF0CF'}
                        sx={{
                            background: 'linear-gradient(to right, #9BB8ED, #FCF0CF)'
                        }}
                    >
                        <Grid width={'100%'} height={'50%'} container columns={20}
                            display={'flex'} flexDirection={'row'} spacing={3}
                        >
                            {/* <Grid size={2}></Grid> */}
                            {loading ? (<Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>) : subjectOutline.map((sub) => (
                                <Grid size={5}
                                    key={sub.id}
                                    component={Paper}
                                    sx={{
                                        transition: '0.5s',
                                        '&:hover': {
                                            transition: '0.5s ease',
                                            transform: 'translateY(-10px)',
                                            boxShadow: '4px 4px 6px lightgray'
                                        }
                                    }}
                                >
                                    <CardActionArea sx={{
                                        // background: ''
                                        width: '100%', height: '100%', outline: 'none',
                                        '&:focus, &:hover': {
                                            outline: 'none',
                                            borderColor: 'white'
                                        }
                                    }} onClick={() => handleClickSubject(sub.code)}>
                                        <CardHeader title={sub.name} />
                                        <CardMedia
                                            component={'img'}
                                            height={'160px'}
                                            image={sub.img}
                                        />
                                        <CardContent>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            ))}
                            {/* <Grid size={2}></Grid> */}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </div>
    )

}
