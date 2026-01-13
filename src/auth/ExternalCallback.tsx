import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function ExternalCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        localStorage.setItem("token", token);

        // nếu BE trả thêm userId thì set tiếp
        // localStorage.setItem("tokenUser", userId);

        navigate("/", { replace: true });
    }, []);

    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress />
            <Typography>Đang đăng nhập bằng Google...</Typography>
        </Box>
    );
}
