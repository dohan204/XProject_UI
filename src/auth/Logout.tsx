import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import type { LogoutProps } from "../model/props/LogoutProps";
export default function Logout({open, handleClose} : LogoutProps){
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleLogout = async () => {
        setLoading(true)
        try {
            // Gọi API logout (nếu backend cần invalidate token, refresh token, v.v.)
            await axios.post('https://localhost:7151/api/Account/logout');
        } catch (error) {
            // Nếu lỗi thì cũng không sao, vì ta vẫn muốn xóa token local
            console.warn('Logout API failed, but proceeding with local cleanup:', error);
        } finally {
            // Luôn xóa token dù API thành công hay thất bại
            localStorage.removeItem('token');
            localStorage.removeItem('tokenUser')
            localStorage.removeItem('user')
            // (Tùy chọn) Xóa các thứ khác nếu có
            // localStorage.removeItem('user');
            // sessionStorage.clear();

            // Redirect về login (nếu dùng React Router)
            navigate('/');
            handleClose();
            // hoặc
            // window.location.href = '/login';
            setLoading(false)
        }
    };
    return <Dialog open={open}>
        <DialogTitle>
            <Typography color="error">
                Đăng xuất tài khoản
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Bạn có chắc là muốn đăng xuất chứ, <br />
                nếu có bấm xác nhận.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleLogout} variant="contained" color="success">
                {loading ? 'Đang đăng xuất...' : 'Xác nhận'}
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
                Hủy
            </Button>
        </DialogActions>
    </Dialog>
}