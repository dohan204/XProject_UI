import {Box, Grid, Typography} from '@mui/material'

export default function HomepageMiddleTop() {
    return (
        <Box width={'99vw'} height={'70vh'}>
            <Grid container width={'100%'} height={'100%'}
                display={'flex'}
                flexDirection={'row'}
            >
                <Grid size={3}>
                </Grid>
                <Grid size={6}>
                    <Box width={'100%'} height={'100%'}
                        display={'flex'} justifyContent={'center'} flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <Box>
                            <Typography component={'h3'} variant="h3">
                                Tham gia các bài thi Của chúng tôi
                            </Typography>
                        </Box>
                        <Box p={2} fontWeight={'bold'}>
                            <Typography>
                               - Giúp bạn nâng cao kỹ năng và hiểu sâu hơn về các môn học hoặc chuyên ngành mà bạn quan tâm.
                            </Typography>
                            {/* <Typography>
                                Giải phóng tiềm năng của bạn: Vượt qua bài kiểm tra năng khiếu nhân viên hoặc kỳ thi tuyển sinh vào trường một cách dễ dàng với các bài kiểm tra thực hành trực tuyến được thiết kế riêng của chúng tôi.
                            </Typography> */}
                            <Typography>
                               - Hãy luyện tập với các bài kiểm tra năng khiếu miễn phí, rèn luyện phản xạ và chiến lược làm bài, hoặc nâng cao trình độ với các gói luyện thi toàn diện, được thiết kế theo cấp độ từ cơ bản đến nâng cao. Đăng ký ngay hôm nay để bắt đầu hành trình học tập hiệu quả, ghi điểm vượt trội và tự tin hơn trong mọi kỳ thi!
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={3}>
                </Grid>
            </Grid>
        </Box>
    )
}
