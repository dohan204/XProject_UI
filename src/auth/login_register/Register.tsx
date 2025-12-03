import { Alert, Autocomplete, Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { RegisterDto } from "../../model/auth/RegisterDto";
import { type Province } from "../../model/apiResponse/Province";
import { type WardsCommune } from "../../model/apiResponse/WardsCommune";
import { useCallback, useEffect, useState } from "react";
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import styles from '../../css/authentication.module.css'
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate()
    const [provinces, setProvinces] = useState<Province[]>([])
    const [wardsCommunes, setWardsCommune] = useState<WardsCommune[]>([])
    const { control, handleSubmit } = useForm<RegisterDto>({
        defaultValues: {
            userName: '',
            fullName: '',
            password: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: null,
            provinceId: 0,
            wardsCommuneId: 0
        }
    })

    const getProvince = useCallback(async () => {
        const provine = await axios.get('http://localhost:8089/api/Province/get-AllProvinceWithCommune')
        const result = provine.data
        setProvinces(result)
    }, [])

    useEffect(() => {
        getProvince()
    }, [])

    const onSubmit: SubmitHandler<RegisterDto> = async (data: RegisterDto) => {
        const payload = {
            ...data,
            dateOfBirth: data.dateOfBirth
                ? format(data.dateOfBirth, 'yyyy-MM-dd') // hoặc 'dd/MM/yyyy' tùy backend
                : null,
        }
        console.log('data, ', payload)
        setLoading(true)
        try {
            await axios.post('http://localhost:8089/api/Account/create', payload)
            setSuccess(true)
            setTimeout(() => {

            }, 400)
            navigate('/login', { replace: true })
        } catch (err) {
            console.error('lỗi đăng ký,', err)
        } finally {
            setLoading(false)
        }
    }
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <Box
            sx={{
                width: { xs: '90%', sm: '80%', md: 520 },
                maxWidth: 600,
                mx: 'auto', // căn giữa
                my: { xs: 2, md: 4 },
                p: { xs: 2, md: 3 },
                borderRadius: 2,
            }}
            component={Paper}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                pt={2}
            >
                <IconButton onClick={handleBack} size="small">
                    <ArrowBackIcon color="error" />
                </IconButton>
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Đăng ký tài khoản
                </Typography>
                <Box width={40} /> {/* placeholder để căn giữa */}
            </Box>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {success && <Alert severity="success">Đăng ký thành công!!</Alert>}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={2} columns={12} p={{ xs: 1, md: 2 }}
                        sx={{
                            overflow: 'hidden',
                            justifyContent: "center",
                        }}
                    >
                        <Grid

                            size={6}
                            sx={{
                                xs: 12,
                                md: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { xs: 3, md: 6 },
                                pr: { md: 1 },
                            }}
                        >
                            <Controller
                                name='userName'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Tài khoản"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='fullName'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Họ và tên"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='password'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Mật khẩu"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='email'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={6}
                            sx={{
                                xs: 12,
                                md: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { xs: 3, md: 5 },
                                pl: { md: 1 },
                            }}
                        >
                            <Controller
                                name='phoneNumber'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Điện thoại"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                rules={{ required: 'Chọn ngày sinh đi mày' }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={value}
                                        onChange={(date) => onChange(date)}
                                        format="dd/MM/yyyy"
                                        sx={{ mt: 1 }}
                                        slotProps={{
                                            textField: {
                                                variant: 'standard',
                                                fullWidth: true,
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
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        options={provinces}
                                        getOptionLabel={option => option.name}
                                        value={provinces.find(p => p.id === value)}
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
                                                variant="standard"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                name='wardsCommuneId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Autocomplete
                                        options={wardsCommunes}
                                        getOptionLabel={option => option.name}
                                        value={wardsCommunes.find(w => w.id === value)}
                                        disabled={!wardsCommunes.length}
                                        onChange={(_, value) => onChange(value?.id ?? 0)}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{ mt: 1 }}
                                                variant="standard"
                                                label="Phường/Xã"
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            sx={{
                                sx: 12,
                                display: 'flex',
                                justifyContent: "center",
                                mt: { xs: 2, md: 0 },
                                pb: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                size="large"
                                // fullWidth={{ xs: true, sm: false }}
                                sx={{
                                    minWidth: { xs: '100%', sm: 200 },
                                    py: 1.5,
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                            </Button>
                        </Grid>
                    </Grid>
                </LocalizationProvider>

            </form>
        </Box>
    )
}