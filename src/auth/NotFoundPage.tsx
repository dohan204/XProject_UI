import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function NotFoundPage(){
    return (
        <Card>
            <CardHeader>
                <Typography>
                    Lỗi tìm trang
                </Typography>
            </CardHeader>
            <CardContent>
                <Typography color='error' component={'h3'} variant="h3">
                    KHông tìm thấy trang bạn đang yêu cầu.
                </Typography>
            </CardContent>
        </Card>
    )
}