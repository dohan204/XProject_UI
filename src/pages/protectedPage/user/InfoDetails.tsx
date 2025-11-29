import { Box, 
    Button, Dialog, CircularProgress, Backdrop,
     DialogActions, DialogContent, DialogTitle, Typography, 
     Divider,
     Paper} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios';
import type { RegisterDto } from '../../../model/auth/RegisterDto';
interface PropsDetail {
    open: boolean,
    handleClose: () => void
}
export default function InfoDetails({ open, handleClose }: PropsDetail) {
    const { user } = useAuth();
    const userId = user?.nameid;
    const [resUser, setResUser] = useState<RegisterDto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const getUser = useCallback(async () => {
        if (!userId || userId === null)
            return;
        setLoading(true)
        try {
            const res = await axios.get<RegisterDto>(`http://localhost:8089/api/Account/getbyId?id=${userId}`);
            setResUser(res.data);
        } catch (err) {
            console.log('lỗi', err);
        } finally {
            setLoading(false);
        }
    }, [])
    useEffect(() => {
        getUser()
    }, [userId])
    return (
        <div>
            <Dialog open={open} maxWidth={'md'}
            >
                <DialogTitle>
                    <Typography color='warning'>
                        Thông Tin Chi tiết
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={loading}
                        >
                            <CircularProgress color="secondary" />
                        </Backdrop>
                    ): (<Box sx={{
                        width: '300px',
                        height: 'auto',
                        p: 2,
                        m: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'lightskyblue'
                    }} component={Paper}>
                        <Typography>Tên đăng nhập:  {resUser?.userName}</Typography>
                        <Divider />
                        <Typography>Họ và tên: {resUser?.fullName}</Typography>
                        <Divider />
                        <Typography>Tài khoản emai: {resUser?.email}</Typography>
                        <Divider />
                        <Typography>Điện thoại: {resUser?.phoneNumber}</Typography>
                        <Divider />
                        {/* <Typography>{resUser</Typography> */}
                        <Typography>Tỉnh/Thành phố: {resUser?.provinceId}</Typography>
                        <Divider />
                        <Typography>Phường/Xã: {resUser?.wardsCommuneId ?? "Chưa có thông tin!!."}</Typography>
                        {/* <Typography>{resUser?.}</Typography> */}
                        <Divider />
                    </Box>)}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='success' size='large'
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
