import React, { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import {type ChangePassword } from '../../../model/user/ChangePassword'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function TabChangPassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const {user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const {control, handleSubmit, formState: {errors}, reset} = useForm<ChangePassword>({defaultValues: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }})
    const userId = user?.nameid
    const onSubmitData: SubmitHandler<ChangePassword> = async (data: ChangePassword) => {
        console.log(data)
        setLoading(true)
        try {
            await axios.patch(`http://localhost:8089/api/Account/ChangePassword?userId=${userId}`, data)
            setSuccess(true);
            reset();
            setMessage('Thay đổi mật khẩu thành công.');
        } catch (err) {
            setSuccess(false);
            console.error('loi,', err)
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
        <form style={{
            width: '500px',
            height: '220px'
        }} onSubmit={handleSubmit(onSubmitData)}>
            <Typography>
                {success ? <Alert severity='success'>{message}</Alert> : ''}
            </Typography>
            <Box width={'100%'} display={'flex'} flexDirection={'column'}>
                <Box>
                    <Box sx={{
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Controller
                            name='currentPassword'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    {...field}
                                    sx={{p: 1}}
                                    fullWidth
                                    label='Mật khẩu hiện tại'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.currentPassword?.message}
                                />
                            )}
                        />
                        <Controller
                            name='newPassword'
                            control={control}
                            render={({field}) => (
                                <TextField
                                sx={{p: 1}}
                                // sx={{
                                //         width: '40%'
                                //     }}
                                fullWidth
                                    {...field}
                                    label='Mật khẩu mới'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.newPassword?.message}
                                />
                            )}
                        />
                        <Controller
                            name='confirmNewPassword'
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    sx={{p: 1}}
                                    fullWidth
                                    label='Xác nhận'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.newPassword?.message}
                                />
                            )}
                        />
                    </Box>
                    {/* <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        m: 1,
                        p: 1
                    }}>
                        
                    </Box> */}
                </Box>
            </Box>
            <Button type='submit'variant='contained' size='large'
                disabled={loading ? true : false}
            >
                Thay đổi
            </Button>
        </form>
    </div>
  )
}
