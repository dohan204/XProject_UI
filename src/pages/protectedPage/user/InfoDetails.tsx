import {
    Box, CircularProgress, Backdrop, Typography,
    Divider,
    Paper
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios';
// import type { RegisterDto } from '../../../model/auth/RegisterDto';
// interface PropsDetail {
//     open: boolean,
//     handleClose: () => void
// }
interface InfoResponse {
    id: string,
    userName: string, 
    fullName: string,
    email: string,
    phoneNumber: string,
    gender: string
    lastLogin: Date,
    dateOfBirth: Date,
    provinceName: string,
    wardsCommuneName: string
}
export default function InfoDetails() {
    const { user } = useAuth();
    const userId = user?.nameid;
    const [resUser, setResUser] = useState<InfoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const getUser = useCallback(async () => {
        if (!userId || userId === null)
            return;
        setLoading(true)
        try {
            const res = await axios.get<InfoResponse>(`https://api.testx.space/api/Account/getbyId?id=${userId}`);
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
            <Box
                width={'100%'}
                p={1}
                borderRadius={'5px'} 
                boxShadow={'5px 5px 10px lightgray'}
                // border={'1px solid black'}
            >
                <Box height={'5vh'} alignContent={'center'} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <Typography color='warning' fontSize={'20px'}>
                        Thông Tin Hiện tại 
                    </Typography>
                </Box>
                <Box>
                    {loading ? (
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={loading}
                        >
                            <CircularProgress color="secondary" />
                        </Backdrop>
                    ) : (<Box sx={{
                        width: '380px',
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
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Giới tính:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.gender}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Ngày sing:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {new Date(resUser?.dateOfBirth!).toLocaleDateString('vi-VN')}
                            </Typography>
                        </Typography>
                        <Divider />
                        <Typography fontWeight={'bold'} fontSize={'18px'}>
                            Tỉnh/Thành phố:
                        </Typography>
                        <Typography component={'div'}
                            sx={{ height: '30px', display: 'flex', justifyContent: 'center' }}
                        >
                            <Typography>
                                {resUser?.provinceName}
                            </Typography>
                        </Typography>
                        <Divider />
                        {/*  */}
                    </Box>)}
                </Box>
            </Box>
        </div>
    )
}
