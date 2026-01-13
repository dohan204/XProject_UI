import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import createExam from '../../assets/createExam.png'
import exam from '../../assets/Exam.png';
import cheat from '../../assets/chonggianlan.png'
import report from '../../assets/Report.png';
import management from '../../assets/management.png'
// import { useState } from "react";
import { motion } from 'framer-motion'

export default function Feature() {
    // const [hoverCreate, setHoverAll] = useState<boolean>(false)
    // // const [hoverExam, setHoverExam] = useState<boolean>(false)
    // // const [hoverCheat, setHoverCheat] = useState<boolean>(false)
    // // const [hoverReport, setHoverReport] = useState<boolean>(false)
    // // const [hoverManager, setHoverManager] = useState<boolean>(false)
    // const handleHover = () => {
    //     setHoverAll(true)
    //     // alert('hello')
    // }
    const feature = [
        { id: 1, name: 'Tạo đề', img: createExam, content: '+ Nhanh chóng - hiệu quả', content2: '+ Tối ưu thời gian', content3: '+ Soạn đề thông minh' },
        { id: 2, name: 'Tổ chức thi', img: exam, content: '+ Linh hoạt - Chính xác', content2: '+ Thi thử dễ dàng', content3: '+ Quy trình tối ưu' },
        { id: 3, name: 'Chống gian lận', img: cheat, content: '+ Giám sát chặt chẽ', content2: '+ An toàn - Minh bạc', content3: '+ Ngăn gian lận tuyệt đối' },
        { id: 4, name: 'Báo cáo', img: report, content: '+ Thống kê chi tiết', content2: '+ Số liệu trực quan', content3: '+ Phân tích toàn diện' },
        { id: 5, name: 'Quản lý', img: management, content: '+ Kiểm soát dễ dàng', content2: '+ Quản trị hiệu quả', content3: '+ Đồng bộ - Tập chung' }
    ]
    return (
        <Box display={'flex'} position={'relative'}
            flexDirection={'column'} m={1} p={1}>
            <Box display={'flex'} width={'94vw'} height={'50vh'} flexDirection={'column'}>
                <Box height={'20%'} width={'100%'}>
                    <Typography component={'h3'} variant="h3">Chức năng</Typography>
                </Box>
                <Box width={'100%'} height={'80%'} p={1} m={2}>
                    <Grid width={'100%'} height={'100%'} container columns={20} spacing={3}>
                        {feature.map((f) => (
                            <Grid size={4} bgcolor={'lightblue'} key={f.id}>
                                <Card sx={{ width: '100%', height: '100%' }}
                                >
                                    <CardMedia
                                        sx={{ p: 1 }}
                                        component={'img'}
                                        image={f.img}
                                        height={'150'}
                                    />
                                    <CardContent>
                                        <motion.div
                                            initial={{ opacity: 0, x: -25 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: 'easeOut'
                                            }}
                                        >
                                            <Typography>
                                                {f.content} <br />
                                                {f.content2} <br />
                                                {f.content3}
                                            </Typography>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box marginTop={5}>
                <Box width={'92dvw'} height={'20vh'} justifyContent={'center'} alignContent={'center'} >
                    <Typography variant="h3">Chi tiết các tính năng chính: </Typography>
                </Box>
                <Box width={'92dvw'} height={'auto'} display={'flex'} flexDirection={'column'} p={1}>
                    <Box width={'100%'} height={'19%'} p={1} m={2}>
                        <Box height={'25%'} >
                            <Typography component={'h4'} variant="h4" sx={{ pl: 10 }}>
                                Tạo đề thi - Nhanh chóng, Thông minh:
                            </Typography>
                        </Box>
                        <Box height={'75%'}>
                            <Box pl={30}>
                                <Typography>Tạo đề thi chỉ trong 30 giây bằng cách kéo thả từ ngân hàng cau hỏi, hoặc tay</Typography>
                                <Typography>Import đề từ file Excel, word, pdf</Typography>
                                <Typography>
                                    Ngân hàng câu hỏi không giới hạn, phân theo môn học, mức độ khó
                                </Typography>
                                <Typography>
                                    Tạo câu hỏi đa dạng: Trắc nghiệm 4 đáp án, nhiều đáp án đúng, điền từ,...
                                </Typography>
                                <Typography>
                                    Tứ động sinh nhiều đề thi khác nhau cùng một ngân hàng câu hỏi
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box width={'100%'} height={'19%'} p={1} m={2}>
                        <Box height={'25%'} >
                            <Typography component={'h4'} variant="h4" sx={{ pl: 10 }}>
                                Tổ chức thi - Linh hoạt, tiện lợi:
                            </Typography>
                        </Box>
                        <Box height={'75%'}>
                            <Box pl={30}>
                                <Typography>Giao bài cho cả lớp, từng học sinh hoặc từng nhóm riêng</Typography>
                                <Typography>Thi không giới hạn, thời tgian link hoạt</Typography>
                                <Typography>
                                    Hỗ trợ trên nhiều thiết bị, không cần app
                                </Typography>
                                <Typography>
                                    Cho phép làm lại bài thi, bài thi thử không tính điểm
                                </Typography>
                                <Typography>
                                    Hiển thị đồng hồ đếm ngược, tự động nộp bài khi hết giờ
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box width={'100%'} height={'19%'} p={1} m={2}>
                        <Box height={'25%'} >
                            <Typography component={'h4'} variant="h4" sx={{ pl: 10 }}>
                                CHỐNG GIAN LẬN – HIỆU QUẢ CAO NHẤT HIỆN NAY:
                            </Typography>
                        </Box>
                        <Box height={'75%'}>
                            <Box pl={30}>
                                <Typography>Tự động trộn thứ tự câu hỏi & trộn thứ tự đáp án cho từng học sinh</Typography>
                                <Typography>Chặn Copy – Paste, chuột phải, phím tắt Windows</Typography>
                                <Typography>
                                    Khóa chuyển tab, thoát toàn màn hình (fullscreen mode bắt buộc)
                                </Typography>
                                <Typography>
                                    Phát hiện nhiều thiết bị đăng nhập cùng lúc bằng một tài khoản
                                </Typography>
                                <Typography>
                                    Quay video màn hình toàn bộ quá trình làm bài (lưu lại để xem lại nếu cần)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box width={'100%'} height={'19%'} p={1} m={2}>
                        <Box height={'25%'} >
                            <Typography component={'h4'} variant="h4" sx={{ pl: 10 }}>
                                CHẤM THI & BÁO CÁO – TỰ ĐỘNG & CHI TIẾT:
                            </Typography>
                        </Box>
                        <Box height={'75%'}>
                            <Box pl={30}>
                                <Typography>Chấm điểm tức thì ngay khi học sinh nộp bài</Typography>
                                <Typography>Xuất kết quả chi tiết: điểm số, thời gian làm bài, câu trả lời của từng học sinh</Typography>
                                <Typography>
                                    Báo cáo phân tích sâu: tỷ lệ đúng/sai từng câu hỏi, mức độ khó của đề, biểu đồ phân bố điểm
                                </Typography>
                                <Typography>
                                    So sánh kết quả giữa các lớp, các lần thi
                                </Typography>
                                <Typography>
                                    Xuất file Excel, PDF có định dạng đẹp
                                </Typography>
                                <Typography>
                                    Gửi thông báo kết quả qua email
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Divider />
                    <Box width={'100%'} height={'19%'} p={1} m={2}>
                        <Box height={'25%'} >
                            <Typography component={'h4'} variant="h4" sx={{ pl: 10 }}>
                                QUẢN LÝ & PHÂN QUYỀN – DỄ DÀNG MỞ RỘNG:
                            </Typography>
                        </Box>
                        <Box height={'75%'}>
                            <Box pl={30}>
                                <Typography>Phân quyền rõ ràng</Typography>
                                <Typography>Đăng nhập bằng tài khoản Google</Typography>
                                <Typography>
                                    Quản lý gói dịch vụ, gia hạn tự động, theo dõi số lượng người dùng
                                </Typography>
                                <Typography>
                                    Hỗ trợ tiếng Việt 100% + giao diện thân thiện, dễ sử dụng
                                </Typography>
                                <Typography>
                                    Tích hợp sẵn với Google Classroom, Microsoft Teams, Zoom Meeting
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}