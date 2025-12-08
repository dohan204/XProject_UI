import {
    Box,
    Button, Dialog, CircularProgress, Backdrop,
    DialogActions, DialogContent, DialogTitle, Typography,
    Divider,
    Paper
} from '@mui/material'
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
                    ) : (<Box sx={{
                        width: '500px',
                        height: 'auto',
                        p: 2,
                        m: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        // backgroundColor: 'lightskyblue'
                    }} component={Paper}>
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Tên đăng nhập:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.userName}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Họ và tên:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.fullName}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Tài khoản Email:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.email}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Điện thoại:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.phoneNumber}
                            </Typography>
                        </Typography>
                        <Divider />
                        {/* <Typography>{resUser</Typography> */}
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Tỉnh/Thành phố:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.provinceId}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Phường/Xã:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.wardsCommuneId ?? "Chưa có thông tin!!"}
                            </Typography>
                        </Typography>
                        {/* <Divider /> */}
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
