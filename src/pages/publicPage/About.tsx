import { Box,  Typography, Divider } from "@mui/material";
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
    const textList3 = [
        '– Mỗi học sinh một đề riêng',
        '– Khóa tab, phát hiện chuyển màn hình',
        '– Bật quay màn hình chống nhìn bài',
        '→ Cheat kiểu gì cũng… thua!'
    ]
    const textList4 = [
        '📊 Thống kê điểm',
        '📈 Biểu đồ đánh giá từng câu',
        '📉 Phân tích độ khó – độ phân loại',
        '📄 Báo cáo xuất file siêu đẹp'
    ]
    const textListLast = [
        '- Không cần kỹ thuật – ai cũng dùng được',
        '- Thi được cho hàng ngàn học sinh cùng lúc',
        '- Giao diện nhẹ, mượt, chạy cả máy yếu',
        '- Bảo mật, ổn định, không sập giữa buổi thi',
        '- Đội ngũ hỗ trợ phản hồi nhanh như người yêu lúc mới quen ❤️'
    ]
    return (
        <Box>
            <Box width={'96dvw'} height={'25vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} mt={3}>
                <Typography component={'h4'} variant="h4">
                    Tạo đề thi chỉ trong 30 giây - chấm điểm tự động - báo cáo chi tiết
                </Typography>
            </Box>
            <Divider />
            <Box width={'93dvw'} height={'45dvh'} display={'flex'} flexDirection={'column'} >
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
            <Box m={3}>
                <Typography component={'h5'} variant="h5">
                    Hệ thống tự xử lý từ A → Z: sinh câu hỏi, trộn phiên bản, gán mã đề, xuất file… nhanh hơn pha mì gói.
                </Typography>
            </Box>
            <Divider sx={{ m: 1 }} />
            <Box m={3} display={'flex'} justifyContent={'space-around'}>
                <Box>
                    <Typography component={'h5'} variant="h5">
                        🛡️ Chống gian lận kiểu mới
                    </Typography>
                    <Box m={2} p={1}>
                        {textList3.map((t) => (
                            <Typography key={t}>{t}</Typography>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Typography component={'h5'} variant="h5">
                    3️⃣ Chấm điểm tự động + báo cáo trực quan
                    </Typography>
                    <Box m={2} p={1}>
                        {textList4.map((t) => 
                        <Typography key={t}>
                            {t}
                        </Typography>)}
                    </Box>
                </Box>
            </Box>
             <Divider />
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Typography component={'h5'} variant="h5">
                    💡 Vì sao TEST X phù hợp với bạn?
                </Typography>
                <Box>
                    {textListLast.map((t) => <Typography m={1} key={t}>{t}</Typography>)}
                </Box>
            </Box>
            <Divider />
            <Box width={'96vw'} height={'30vh'} p={2}>
                <Box height={'20%'}
                    display={'flex'} justifyContent={'center'}
                    alignItems={'center'} flexDirection={'column'}
                >
                    <Typography component={'h4'} variant="h4">
                       🔥 Vì vậy còn chần chờ gì nữa, hãy tới tham gia ngay đi!!!
                    </Typography>
                </Box>
                <Box p={5}>
                    <Typography>
                    Mỗi lần làm bài trắc nghiệm là một lần bạn tiến gần hơn đến mục tiêu học tập của mình. 
                    Vì vậy, đừng bỏ lỡ cơ hội ôn luyện và nâng cao kiến thức, hãy tham gia ngay hôm nay để thử sức, 
                    đánh giá năng lực và sẵn sàng chinh phục các kỳ thi một cách tự tin.
                </Typography>
                </Box>
                
            </Box>
        </Box>
    )
}