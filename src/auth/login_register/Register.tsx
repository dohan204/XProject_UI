import { Alert, Box, Button, Dialog, IconButton, Paper, TextField, DialogTitle, DialogContent, Typography, Stack, CircularProgress } from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { RegisterDto } from "../../model/auth/RegisterDto";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [confirm, setConfirm] = useState<boolean>(false);
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<RegisterDto>({
        defaultValues: {
            userName: '', fullName: '', password: '', email: '',
        }
    });

    const handleClose = () => setConfirm(false);
    const handleOpen = () => setConfirm(true);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => handleClose(), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const onSubmit: SubmitHandler<RegisterDto> = async (data) => {
        setLoading(true);
        try {
            await axios.post('https://localhost:7151/api/Account/create', data);
            handleOpen();
            setSuccess(true);
            setTimeout(() => {
                navigate('/login')

            }, 1500)
        } catch (err) {
            setSuccess(false);
            if (err instanceof AxiosError) {
                if (err.response?.status === 500) setMessage("Email hoặc Tên đăng nhập đã tồn tại, bạn vui lòng tạo khác nhee.")
                else if( err.response?.status === 409) setMessage('Email đã tồn tại.');
                else if (err.response?.status === 400) setMessage('Thông tin không hợp lệ, vui lòng kiểm tra lại.');
                else setMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                width: { xs: '95%', sm: 520 },
                mx: 'auto', my: 4, p: 3, borderRadius: 3
            }}
        >
            {/* Header sử dụng Stack ngang */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <IconButton onClick={() => navigate(-1)} size="small" sx={{ border: '1px solid #eee' }}>
                    <ArrowBackIcon color="error" />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">Đăng ký tài khoản</Typography>
                <Box width={40} />
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {success && <Alert severity="success">Đăng ký thành công!!</Alert>}
                    {message && !success && <Alert severity="error">{message}</Alert>}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {/* Layout chính dùng Stack dọc */}
                        <Stack spacing={2}>
                            <Controller
                                name='userName'
                                control={control}
                                rules={{ required: 'Tài khoản không được để trống.' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field} label="Tên đăng nhập" variant="outlined" fullWidth error={!!error} helperText={error?.message} />
                                )}
                            />

                            <Controller
                                name='fullName'
                                control={control}
                                rules={{ required: 'Họ và tên không được để trống.', minLength: { value: 5, message: 'Tối thiểu 5 ký tự.' } }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field} label="Họ và tên" variant="outlined" fullWidth error={!!error} helperText={'Không được ngắn dưới 5 ký tự'} />
                                )}
                            />

                            <Controller
                                name='password'
                                control={control}
                                rules={{
                                    required: 'Mật khẩu không được bỏ trống',
                                    minLength: { value: 8, message: 'Tối thiểu 8 ký tự' },
                                    validate: (v) => (/[A-Z]/.test(v) && /\d/.test(v)) || 'Phải có 1 chữ hoa và 1 chữ số'
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field} type="password" label="Mật khẩu" variant="outlined" fullWidth error={!!error} helperText={'Tối thiểu 8 ký tự, chứ hoa, chữ số, và ký tự đặc biệt'} />
                                )}
                            />

                            <Controller
                                name='email'
                                control={control}
                                rules={{
                                    required: 'Email không được để trống.',
                                    pattern: { value: /^\S+@\S+$/i, message: "Email không đúng định dạng" }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField {...field} label="Email" variant="outlined" fullWidth error={!!error} helperText={'định dạng chuẩn, vd: user@gmail.com'} />
                                )}
                            />
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={loading}
                            startIcon={loading ?<CircularProgress /> :false}
                            sx={{ mt: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký ngay'}
                        </Button>
                    </LocalizationProvider>
                </Stack>
            </form>

            <CheckConfirmEmail open={confirm} handleClose={handleClose} />
        </Box>
    );
}

// Dialog Component cũng bọc Stack cho đẹp
function CheckConfirmEmail({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 10, height: 10, bgcolor: 'info.main', borderRadius: '50%' }} />
                    <Typography variant="h6" fontWeight="bold">Xác nhận tài khoản</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Typography color="text.secondary">
                    Hệ thống đã gửi một link xác nhận. Bạn vui lòng vào kiểm tra **Email** để kích hoạt tài khoản nhé!
                </Typography>
            </DialogContent>
        </Dialog>
    );
}