import { Box, Grid, Paper, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box width={'98vw'} height={'40'} p={5} component={Paper}>
        <Grid container columns={16} spacing={3} >
            <Grid size={4}>
                <Box>
                    <Typography variant='h5'>Bạn cần hỗ trợ</Typography>
                    <Typography variant='h5'>1900 1234</Typography>
                    {/* <Typography>Địa chỉ: '79/44 Nghia Lo, Ward Yen Nghia, Ha Noi </Typography> */}
                    <Typography>Email: dohan2005@gmail.com</Typography>
                </Box>
            </Grid>
            <Grid size={4}>
                <Box>
                    <Typography variant='h5'>
                        Hướng dẫn sử dụng
                    </Typography>
                    <Typography>
                        Trang chủ
                    </Typography>
                    <Typography>Giới thiệu</Typography>
                    <Typography>
                        Tính năng
                    </Typography>
                    <Typography>
                        Tin tức 
                    </Typography>
                    <Typography>
                        Hướng dẫn 
                    </Typography>
                    <Typography>
                        Chính sách và điều khoản
                    </Typography>
                    
                </Box>
            </Grid>
            <Grid size={4}>
                <Box>
                    <Typography variant='h5'>
                        Hỗ trợ khách hàng
                    </Typography>
                    <Typography>
                        Trang chủ
                    </Typography>
                    <Typography>Giới thiệu</Typography>
                    <Typography>
                        Tính năng
                    </Typography>
                    <Typography>
                        Tin tức 
                    </Typography>
                    <Typography>
                        Hướng dẫn 
                    </Typography>
                    <Typography>
                        Liên hệ
                    </Typography>
                </Box>
            </Grid>
            <Grid size={4}>
                <Box>
                    <Typography variant='h5'>
                        Mạng xã hội & thông tin bản quền
                    </Typography>
                    <Typography>
                        faceBook
                    </Typography>
                    <Typography>zalo</Typography>
                    <Typography>
                    Youtobe
                    </Typography>
                    <Typography variant='h5'>
                        Bản quền
                    </Typography>
                    <Typography>
                        hansonakk205
                    </Typography>
                    <Typography>
                        vnpay, dalopay
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}
