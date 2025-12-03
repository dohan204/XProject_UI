import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'
import React, { useState, useCallback, useEffect } from 'react'
import { type Province } from "../../../model/apiResponse/Province";
import { type WardsCommune } from "../../../model/apiResponse/WardsCommune";
import type { UpdateUser, Gender } from '../../../model/user/UpdateUser';
import { Box, TextField, Autocomplete, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import { format } from 'date-fns';

const Gender = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'}
]
export default function TabModifiedAll() {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { user } = useAuth();
    const [provinces, setProvinces] = useState<Province[]>([])
    const [wardsCommunes, setWardsCommune] = useState<WardsCommune[]>([])
    const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateUser>({
        defaultValues: {
            userName: '',
            fullName: '',
            email: '',
            gender: 'Other',
            phoneNumber: '',
            dateOfBirth: null,
            provinceId: 0,
            wardId: 0
        }
    })

    const getProvince = useCallback(async () => {
        const provine = await axios.get('http://localhost:8089/api/Province/get-AllProvinceWithCommune')
        const result = provine.data
        setProvinces(result)
    }, [])
    const userId = user?.nameid
    const getUserById = useCallback(async () => {
        if (!userId || userId === null) {
            console.log('Khong co id nguoi dung.')
            return;
        }
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8089/api/Account/getbyId?id=${userId}`)
            if (response) {
                reset({
                    userName: response?.data.userName,
                    fullName: response?.data.fullName,
                    email: response?.data?.email,
                    gender: response?.data?.gender ?? "Chua thiet lap gioi tinh",
                    phoneNumber: response?.data?.phoneNumber,
                    dateOfBirth: response?.data?.dateOfBirth,
                    provinceId: response?.data?.provinceId,
                    wardId: response?.data?.wardsCommuneName
                })
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 500) {
                    console.log("Loi server")
                    return;
                } else if (err.response?.status === 404) {
                    console.log('Khong co du lieu nguoi dung');
                    return;
                } else {
                    console.log("Vui long thu lai sau, vai phut")
                }
            }
        } finally {
            setLoading(false)
        }

    }, [userId])
    useEffect(() => {
        getProvince();
        getUserById();
    }, [userId, getProvince, getUserById])

    const onSubmitData = async (data: UpdateUser) => {
        console.log('thong tin nguoi dung chinh sua truoc di gui di: ', data)
        const payload = {
            ...data,
            dateOfBirth: data.dateOfBirth ?
                format(data.dateOfBirth, 'yyyy-MM-dd') : 
                null
        }
        console.log(payload)
        setLoadingForm(true)
        try {
            await axios.put(`https://localhost:7151/api/Account/updateAccount?id=${userId}`, payload)
            setSuccess(true)
            setMessage("Chỉnh sửa thông tin thành công.");
            console.log('thành công.')
        } catch(err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status === 500){
                    setError(true)
                    setErrorMessage("Lỗi server, chưa thể cập nhật thông tin")
                } else if (err.response?.status === 400){
                    setError(true)
                    setErrorMessage("Thông tin không hợp lệ vui lòng kiểm tra lại")
                }
            } else {
                setError(true)
                setErrorMessage("Vui lòng thử lại sau.")
            }
        } finally {
            setError(false)
            setSuccess(false)
            setLoadingForm(false)
        }
    }
    return (
        <div>
            <form style={{
                width: '800px',
                height: '180px'
            }} onSubmit={handleSubmit(onSubmitData)}>
                <Box height={'15%'} bgcolor={'lightblue'}>
                    <Typography>
                        {success && <Alert severity='success'>{message}</Alert>}
                    </Typography>
                    <Typography>
                        {error && <Alert severity='error'>{errorMessage}</Alert>}
                    </Typography>
                </Box>
                {!loading ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box width={'100%'} height={'90%'}>
                        <Box display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'space-around'}
                        >
                            <Controller
                                name='userName'
                                control={control}
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                render={({ field: {value, onChange} }) => (
                                    <Autocomplete
                                        options={Gender}
                                        getOptionLabel={option => option.name}
                                        value={Gender.find(e => e.name === value) || null}
                                        onChange={(_, newValue) => (
                                            onChange(newValue?.name || null)
                                        )}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    m:1,
                                                    width: '200px'
                                                }}
                                                label='Gender'
                                            />  
                                        )}
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
                                render={({ field }) => (
                                    <TextField
                                        sx={{
                                            m: 1,
                                            width: '225px'
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
                                name="dateOfBirth"
                                control={control}
                                rules={{ required: 'Chọn ngày sinh đi mày' }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={value ? dayjs(value) : null}        // quan trọng: phải convert sang dayjs
                                        onChange={(date) => onChange(date ? date.toISOString() : null)}
                                        slotProps={{
                                            textField: {
                                                error: !!error,
                                                helperText: error?.message,
                                                // fullWidth: true,
                                                // margin: "normal", // không cần nếu dùng sx
                                            },
                                        }}
                                        sx={{
                                            m: 1,
                                             width: '210px'
                                        }}
                                    // sx={{ mt: 1, width: '100%' }}
                                    />
                                )}
                            />
                            <Controller
                                name='provinceId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        options={provinces}
                                        getOptionLabel={option => option.name}
                                        value={provinces.find(p => p.id === value) ?? null}
                                        onChange={(_, newValue) => {
                                            newValue ? onChange(newValue.id) : 0
                                            setWardsCommune(newValue ? newValue.wardsDto : [])
                                        }}
                                        disabled={wardsCommunes ? false : true}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                // sx={{mt: -0.2}}
                                                label="Tỉnh/thành phố"
                                                variant="outlined"
                                                sx={{
                                                    m: 1,
                                                    width: '190px'
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                name='wardId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        options={wardsCommunes}
                                        getOptionLabel={option => option.name}
                                        value={wardsCommunes.find(w => w.id === value) || null}
                                        disabled={!wardsCommunes.length}
                                        onChange={(_, value) => onChange(value?.id ?? 0)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{ m: 1, width: '200px' }}
                                                variant="outlined"

                                                label="Phường/Xã"
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                </LocalizationProvider>
                ) : 'Khong co du lieu nguoi dung.'}
                <Button type='submit' variant='contained' size='medium'
                    disabled={loadingForm && true}
                >
                    {loadingForm ? 'Đang lưu' : 'Lưu'}
                </Button>
            </form>
        </div>
    )
}
