import { Box, Paper, Typography, Card, CardHeader, CardContent } from "@mui/material";
import quiz from '../../assets/quiz.jpg';
import { motion } from "framer-motion";
// import { lightBlue } from "@mui/material/colors";
export default function About() {
    const textList = [
        '• Ra đề, trộn đề mất cả buổi',
        '• Học sinh quay cóp, nhìn bài nhau',
        '• Chấm bài thủ công, thống kê cả tuần chưa xong'
    ]
    const textList2 = [
        '→ Tạo & import đề cực nhanh (Word, Excel, PDF đều không được)',
        '→ Chống gian lận thực sự: trộn đề riêng từng em, khóa tab, quay màn hình',
        '→ Chấm tức thì + báo cáo chi tiết đẹp'
    ]
    return (
        <Box>
            <Box width={'98vw'} height={'60vh'} display={'flex'} component={Paper} mb={1}>
                <Box width={'50%'} height={'100%'}>
                    <img
                        width={'100%'}
                        height={'100%'}
                        src={quiz}
                    />
                </Box>
                <Box
                    display={'flex'}
                    bgcolor={'lightgrey'}
                    width={'50%'}
                    height={'100%'}
                >
                    <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'}>
                        <Box height={'50%'} width={'100%'}
                            display={'flex'} justifyContent={'center'} alignItems={'center'}
                        >
                            <motion.h1 style={{ padding: 5 }}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Trắc nghiệm nhanh chóng, Chính xác
                            </motion.h1>
                        </Box>
                        <Box height={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <motion.h1 style={{ padding: 5 }}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                Thi online không lo quay cóp!
                            </motion.h1>`
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box width={'98vw'} height={'25vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} mt={3}>
                <Typography component={'h4'} variant="h4">
                    Tạo đề thi chỉ trong 30 giây - chấm điểm tự động - báo cáo chi tiết
                </Typography>
            </Box>
            <Box width={'98vw'} height={'45vh'} display={'flex'} flexDirection={'column'} >
                <Box height={'20%'}>
                    <Typography component={'h4'} variant="h4" p={2}>
                        TEST X được xây dựng dành riêng cho bạn!!!
                    </Typography>
                </Box>
                <Box p={5} width={'100%'}
                    height={'80%'}
                    display={'flex'} overflow={'hidden'} flexDirection={'row'}
                >
                    <Box width={'50%'}>
                        <Typography component={'h5'} variant="h5" pl={3}>
                            Chúng tôi hiểu bạn mệt mỏi vì:
                        </Typography>
                        <Box pl={15}>
                            {textList.map((text) => (
                                <Typography key={text}>
                                    {text}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box width={'50%'}>
                        <Typography component={'h5'} variant="h5">
                            TEST X giải quyết triệt để 3 vấn đề đó:
                        </Typography>
                        <Box pl={15}>
                            {textList2.map((text) => (
                                <Typography key={text}>
                                    {text}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box width={'98vw'} height={'75vh'} p={10}>
                <Box height={'20%'}
                    display={'flex'} justifyContent={'center'}
                    alignItems={'center'} flexDirection={'column'}
                >
                    <Typography component={'h4'} variant="h4">
                        Vì vậy còn chần chờ gì nữa, hãy tới tham gia ngay đi!!!
                    </Typography>
                    <Typography sx={{ fontSize: 20 }}>
                        Chúng tôi có các lựa chọn ở phía dưới.
                    </Typography>
                </Box>
                <Box height={'80%'} display={'flex'} flexDirection={'row'}
                    p={2}
                    justifyContent={'space-around'}
                >
                    <Box width={'10%'}></Box>
                    <Box width={'25%'}>
                        <Card sx={{
                            width: '100%', height: '100%',
                            // transition: 'with 2s',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                transition: '0.2s linear'
                            },
                            '&:not(:hover)': {
                                transition: '0.2s linear'
                            }
                        }}>
                            <CardHeader title='Gói thành viên' />
                            <CardContent>
                                <Typography>
                                    Gói này có các dịch vụ hấp dẫn
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'25%'}>
                        <Card sx={{
                            width: '100%', height: '100%', '&:hover': {
                                transform: 'translateY(-8px)',
                                transition: '0.2s linear'
                            },
                            '&:not(:hover)': {
                                transition: '0.2s linear'
                            }
                        }}>
                            <CardHeader title='Gói Prenium' />
                            <CardContent>
                                <Typography>
                                    Gói này có các dịch vụ hấp hấp dẫn
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'25%'}>
                        <Card sx={{
                            width: '100%', height: '100%', '&:hover': {
                                transform: 'translateY(-8px)',
                                transition: '0.2s linear'
                            },
                            '&:not(:hover)': {
                                transition: '0.2s linear'
                            }
                        }}>
                            <CardHeader title='Gói siêu Prenium' />
                            <CardContent>
                                <Typography>
                                    Gói này có dịch vụ hấp hấp hấp dẫn
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box width={'10%'}></Box>
                </Box>
            </Box>
        </Box>
    )
}