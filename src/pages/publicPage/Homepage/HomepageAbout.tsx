import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import {
    Box,
    Grid,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
// import {motion} from 'framer-motion';
import axios from 'axios';
export default function HomepageAbout() {
    const [hoverSupport, setHover] = useState<boolean>(false)
    const [hoverAccount, setHoverAccount] = useState<boolean>(false)
    const [hoverExam, setHoverExam] = useState<boolean>(false)
    const [hoverQuestion, setHoverQuestion] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<number>(0);
    const [question, setQuestion] = useState<number>(0);
    const [exam, setExam] = useState<number>(0);

    const getAllDataFromApi = async () => {
        setLoading(true);
        try {
            const [account, question, exam] =
                await Promise.all(
                    [axios.get('http://localhost:8089/api/Account/count'),
                    axios.get('http://localhost:8089/api/Exam/countExam'),
                    axios.get('http://localhost:8089/api/Question/countQuestion')
                    ])
            console.log('lấy dữ liệu thành công.')
            setAccount(account.data);
            setQuestion(question.data);
            setExam(exam.data);
        } catch (err) {
            console.error('lỗi,', err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllDataFromApi()
    }, [])

    return (
        <motion.div>
            <Box width={'99vw'} height={'35vh'} mt={1}>
                <Box 
                    width={'100%'} display={'flex'} flexDirection={'row'}
                    justifyContent={'space-around'}
                    height={'100%'}
                >
                    <Box width={'20%'}>
                        <Card
                            component={'div'}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(110, 164, 195, 0.6)',
                                '&:hover': {
                                    // transform: 'rotate(-10deg)',
                                    transition: '0.3s ease',
                                    boxShadow: '3px 3px 6px gray'
                                },
                                transition: '0.3s ease',
                                overflow: 'hidden'
                                // transform: 'translateX(-10%)'
                            }}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <SupportAgentIcon />
                                    </Avatar>
                                }
                                title='Giải đáp & Hỗ trợ'
                            />
                            <CardContent>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    Hỗ trợ online 24/7
                                </Typography>
                                <motion.div
                                    initial={{opacity: 0 , y: -20}}
                                    animate={{opacity: hoverSupport ? 1 : 0, y: hoverSupport ? 0 : -20}}
                                    transition={{
                                        duration: 0.4,
                                        ease: 'easeOut'
                                    }}
                                >
                                    <Typography >
                                        Khi gặp các sự cố bạn có thể liên hệ ngay với người quản trị để được hỗ trợ và giải quết
                                    </Typography>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'20%'}>
                        <Card component={'div'}
                            onMouseEnter={() => setHoverAccount(true)}
                            onMouseLeave={() => setHoverAccount(false)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(214, 221, 195, 0.6)',
                                '&:hover': {
                                    // transform: 'rotate(10deg)',
                                    transition: '0.3s ease',
                                    boxShadow: '3px 3px 6px gray'
                                },
                                transition: '0.3s ease'
                                // transform: 'translateX(-10%)'
                            }}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                }
                                title='Người dùng'
                                subheader
                            >
                            </CardHeader>
                            <CardContent>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    Số người dùng: {account}+
                                </Typography>
                                <motion.div
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: hoverAccount ? 1 : 0, y: hoverAccount ? 0 : -20}}
                                     transition={{
                                        duration: 0.4,
                                        ease: 'easeOut'
                                    }}
                                >
                                    <Typography>
                                        Với số người dùng đông đảo bạn hãy tham gia cùng chúng mình ngay đi nào!!
                                    </Typography>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'20%'}>
                        <Card component={'div'}
                            onMouseEnter={() => setHoverQuestion(true)}
                            onMouseLeave={() => setHoverQuestion(false)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(214, 221, 226, 0.6)',
                                '&:hover': {
                                    // transform: 'rotate(360deg)',
                                    transition: '0.3s ease',
                                    boxShadow: '3px 3px 6px gray',
                                    // background: 'linear-gradient(to right, #430089, #82ffa1)',
                                },
                                transition: '0.3s ease'
                                // transform: 'translateX(-10%)'
                            }}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <AssuredWorkloadIcon />
                                    </Avatar>
                                }
                                title='Ngân hàng câu hỏi'
                            />
                            <CardContent>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    Số Câu hỏi: {question}+
                                </Typography>
                                <motion.div
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: hoverQuestion ? 1 : 0, y: hoverQuestion ? 0 : -20}}
                                    transition={{
                                        duration: 0.4, ease: 'easeOut'
                                    }}
                                >
                                    <Typography>
                                        Câu hỏi sẽ được cập nhật thường xuyên, bạn không phải lo vấn đề lặp lại!
                                    </Typography>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'20%'}>
                        <Card component={'div'}
                            onMouseEnter={() => setHoverExam(true)}
                            onMouseLeave={() => setHoverExam(false)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(214, 255, 226, 0.6)',
                                '&:hover': {
                                    // transform: 'rotate(10deg)',
                                    transition: '0.3s ease',
                                    boxShadow: '3px 3px 6px gray'
                                },
                                transition: '0.3s ease'
                                // transform: 'translateX(-10%)'
                            }}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <SubjectIcon />
                                    </Avatar>
                                }
                                title='Số lượng đề thi'
                            />
                            <CardContent>
                                <Typography variant='h6' fontWeight={'bold'}>
                                    Số lượng đề thi {exam}+
                                </Typography>
                                <motion.div
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: hoverExam ? 1 : 0, y: hoverExam ? 0 : -20}}
                                    transition={{
                                        duration: 0.4, ease: 'easeOut'
                                    }}
                                >
                                    <Typography>
                                        Số lượng đề thi vô cùng lớn, bạn hãy tham gia trải nghiệm nhé..
                                    </Typography>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}
