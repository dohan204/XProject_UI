import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs'
import React from 'react'
import type { UpdateUser, Gender } from '../../../model/user/UpdateUser';
import { Box, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export default function TabModifiedAll() {
    const {control, handleSubmit, reset, formState: {errors}} = useForm<UpdateUser>({defaultValues: {
        userName: '',
        fullName: '',
        email: '',
        gender: 'Other' ,
        phoneNumber: '',
        dateOfBirth: null,
        provinceId: 0,
        wardId: 0
    }})
  return (
    <div>
        <form style={{
            width: '800px',
            height: '180px'
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box width={'100%'}>
                    <Box display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-around'}
                     >
                        <Controller
                            name='userName'
                            control={control}
                            render={({field}) => (
                                <TextField
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Tài khoản'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                        <Controller
                            name='fullName'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Họ và tên'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                        <Controller
                            name='email'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Tài khoản email'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                        <Controller
                            name='gender'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Giới tính'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                    </Box>
                    <Box display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-around'}
                        alignItems={'center'}
                     >
                        <Controller
                            name='phoneNumber'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Điện thoại'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                        <Controller
                            name='dateOfBirth'
                            control={control}
                            rules={{ required: 'Chọn ngày sinh đi mày' }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={value}
                                        onChange={(date) => onChange(date)}
                                        sx={{ mt: 1 }}
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                                // fullWidth: true,
                                                error: !!error,
                                                helperText: error?.message,
                                                margin: 'normal',
                                            },
                                        }}
                                    />
                                )}
                        />
                        <Controller
                            name='provinceId'
                            control={control}
                            render={({field}) => (
                                <TextField 
                                    sx={{
                                        m: 1
                                    }}
                                    {...field}
                                    label='Tỉnh/Thành phố'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                        <Controller
                            name='wardId'
                            control={control}
                            render={({field}) => (
                                <TextField
                                     sx={{
                                        m: 1
                                    }}
                                    {...field}

                                    label='Phường/ Xã'
                                    variant='outlined'
                                    error={!!errors}
                                    helperText={errors.wardId?.message}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </LocalizationProvider>
        </form>
    </div>
  )
}
