import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleNextHomePage = () => {
        navigate('/');
    }
    return (
        <Box width={'100%'} height={'97dvh'}display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Card
                sx={{
                    width: '400px',
                    height: '260px',
                }}
            >
                <CardContent>
                    <Typography color='error'>
                        Lỗi tìm trang(not found-404)
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography color='gray' component={'h5'} variant="h5">
                        Trang mà bạn đang yêu cầu, hiện không có hoặc không tìm thấy bạn vui lòng kiểm tra lại.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={handleNextHomePage}>
                        Quay về trang chủ
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}