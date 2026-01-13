import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import  { useState, useCallback, useEffect } from 'react'
import { type Province } from "../../../model/apiResponse/Province";
import { type WardsCommune } from "../../../model/apiResponse/WardsCommune";
import type { UpdateUser, Gender } from '../../../model/user/UpdateUser';
import { Box, TextField, Autocomplete, Button, Typography, Alert, Stack, Dialog, DialogContent } from '@mui/material';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import { format } from 'date-fns';

const Gender = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'}
]
interface props {
    handleCloseModified: () => void
}
export default function TabModifiedAll({handleCloseModified}: props) {
    // const btnUpdateInfoRef = useRef<HTMLInputElement>(null);
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
            gender: 'Other',
            phoneNumber: '',
            dateOfBirth: null,
            provinceId: 0,
            wardId: 0
        }
    })
    const handleNotificationClose = () => setSuccess(false) 
    const handleNotificationOpen = () => setSuccess(true)
    const getProvince = useCallback(async () => {
        const provine = await axios.get('https://api.testx.space/api/Province/get-AllProvinceWithCommune')
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
            const response = await axios.get(`https://api.testx.space/api/Account/getbyId?id=${userId}`)
            if (response) {
                reset({
                    gender: response?.data?.gender,
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
            await axios.put(`https://api.testx.space/api/Account/updateAccount?id=${userId}`, payload)
            setSuccess(true)
            handleNotificationOpen()
            setMessage("Cập Nhật thành công.")
            // setMessage("Chỉnh sửa thông tin thành công.");
            setTimeout(() => {
                handleNotificationClose()
            }, 1500)
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
        <Box sx={{ width: '90%', p: 5, borderRadius: 5, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'}}>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        {/* 1. Hàng thông báo */}
                        {(success || error) && (
                            <Box>
                                {success && <Alert severity='success'>{message}</Alert>}
                                {error && <Alert severity='error'>{errorMessage}</Alert>}
                            </Box>
                        )}

                        {!loading ? (
                            <Stack spacing={2}>
                                {/* 2. Khu vực Input dàn hàng ngang (3 hàng) */}
                                <Stack 
                                    direction="row" 
                                    useFlexGap 
                                    flexWrap="wrap" 
                                    spacing={2}
                                >
                                    {/* Hàng 1: Giới tính & Điện thoại */}
                                    <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
                                        <Controller
                                            name='gender'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <Autocomplete
                                                    options={Gender}
                                                    getOptionLabel={option => option.name}
                                                    value={Gender.find(e => e.name === value) || null}
                                                    onChange={(_, newValue) => onChange(newValue?.name || null)}
                                                    renderInput={(params) => <TextField {...params} label='Giới tính' fullWidth />}
                                                />
                                            )}
                                        />
                                    </Box>

                                    <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
                                        <Controller
                                            name='phoneNumber'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField {...field} label='Điện thoại' fullWidth error={!!errors.phoneNumber} />
                                            )}
                                        />
                                    </Box>

                                    {/* Hàng 2: Ngày sinh & Tỉnh/Thành phố */}
                                    <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <DatePicker
                                                    label="Ngày sinh"
                                                    value={value ? dayjs(value) : null}
                                                    onChange={(date) => onChange(date ? date.toISOString() : null)}
                                                    slotProps={{ textField: { error: !!error, fullWidth: true } }}
                                                />
                                            )}
                                        />
                                    </Box>

                                    <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
                                        <Controller
                                            name='provinceId'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <Autocomplete
                                                    options={provinces}
                                                    getOptionLabel={option => option.name}
                                                    value={provinces.find(p => p.id === value) ?? null}
                                                    onChange={(_, newValue) => {
                                                        onChange(newValue?.id ?? 0);
                                                        setWardsCommune(newValue ? newValue.wardsDto : []);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Tỉnh/thành phố" fullWidth />}
                                                />
                                            )}
                                        />
                                    </Box>

                                    {/* Hàng 3: Phường/Xã (Có thể cho rộng ra hoặc để 50%) */}
                                    <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
                                        <Controller
                                            name='wardId'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <Autocomplete
                                                    options={wardsCommunes}
                                                    getOptionLabel={option => option.name}
                                                    value={wardsCommunes.find(w => w.id === value) || null}
                                                    disabled={!wardsCommunes.length}
                                                    onChange={(_, val) => onChange(val?.id ?? 0)}
                                                    renderInput={(params) => <TextField {...params} label="Phường/Xã" fullWidth />}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Stack>

                                {/* 3. Hàng nút bấm */}
                                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                    <Button 
                                        type='submit' 
                                        variant='contained' 
                                        disabled={loadingForm}
                                        sx={{ minWidth: 100 }}
                                    >
                                        {loadingForm ? 'Đang lưu' : 'Lưu'}
                                    </Button>
                                    <Button variant='outlined' color='inherit' onClick={handleCloseModified}>
                                        Đóng
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : (
                            <Typography align="center">Đang tải dữ liệu...</Typography>
                        )}
                    </Stack>
                </LocalizationProvider>
            </form>
            <DialogNotification open={success} handleClose={handleNotificationClose} />
        </Box>
    );
}
interface SuccessModified {
    open: boolean,
    handleClose: () => void
}
function DialogNotification({open, handleClose}: SuccessModified){
    return <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <Typography>
                Cập nhật thành công
            </Typography>
        </DialogContent>
    </Dialog>
}