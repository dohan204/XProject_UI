import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { type RegisterDto } from "../../model/auth/RegisterDto";
import type { UserView } from "../../model/user/UserView";
import { type Profile } from "../../model/props/ProfileProps";
import axios from "axios";

export default function Profile({open, handleClose}: Profile) {
    const [user, setUser] = useState<UserView | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const getUser = async () => {
        setLoading(true)
        const userId = localStorage.getItem('tokenUser')
        if(!userId)
            return; 
        try {
            const response = await axios.get(`http://localhost:8089/api/Account/getbyId?id=${userId}`)
            setUser(response.data)
        } catch (error) {
            console.error('lỗi khi xử lý lấy thông tin người dùng.', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <Box>
            <Dialog open={open}>
                <DialogTitle>
                    <Typography component={'h3'} variant="h3" color="success">
                        Thông tin người dùng
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Alert severity="success">Đang lấy thông tin...</Alert>
                    ) : user ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Typography>Tên tài khoản: {user.userName}</Typography>
                            <Typography>Họ và tên: {user.fullName}</Typography> 
                            <Typography>Tài khoản email: {user.email}</Typography>
                            <Typography>Số liên hệ: {user.phoneNumber}</Typography>
                            <Typography>Ngày sinh: {user.dateOfBirth}</Typography>
                            <Typography>Tỉnh/thành phố: {user.provinceName}</Typography>
                            <Typography>Phường/Xã: {user.wardsCommuneName}</Typography>
                        </Box>
                    ) : <Alert severity="error" >
                            Đéo lấy đucợ thông tin.
                        </Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}