import {
    Box, Paper, Stack, TextField,
    FormControl, InputLabel, InputAdornment, Input, IconButton,
    Typography,
    Button
} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type { LoginDto } from "../../model/auth/LoginDto"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react";
import axios from "axios";
import styles from '../../css/authentication.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const handleClickShowPassword = () => setShowPassword(show => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const { control, handleSubmit } = useForm<LoginDto>({
        defaultValues: {
            username: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<LoginDto> = async (data: LoginDto) => {
        setLoading(true)
        try {
            const res = await axios.post('http://localhost:8089/api/Account/login', data)
            const result = res.data
            const token: string = result.token
            localStorage.setItem('token', token)
            localStorage.setItem('tokenUser', result.userId)
            navigate('/', { replace: true })
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError("Tài khoản hoặc mật khẩu không chính xác.")
                } else if (err.response?.status === 500) {
                    setError("Lỗi server, vui lòng liên hệ với người quản trị.");
                } else if (err.response?.status === 404) {
                    setError("Không có thông tin người dùng")
                } else {
                    setError("Vui lòng thử lại sau")
                }
            } else {
                setError("Có lỗi sảy ra vui lòng thử lại.")
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formLogin}>
                <Typography variant="h5">
                    Đăng nhập
                </Typography>
                <Controller
                    name='username'
                    control={control}
                    rules={{ required: 'Tài khoản không đươc để trống' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            sx={{
                                width: 260,
                                m: 2
                            }}
                            variant="standard"
                            label='Tài khoản'
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    rules={{ required: "Mật khẩu không được bỏ trống" }}
                    render={({ field, fieldState: { error } }) => (
                        <FormControl sx={{ m: 2 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                {...field}
                                id="standard-adornment-password"
                                sx={{
                                    width: 260,
                                }}
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "hide the password" : "display the password"}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                disabled={loading}
                            />
                        </FormControl>
                    )}
                />
                <Button type='submit' sx={{
                    p: 1, m: 1
                }} variant="contained" color="secondary">
                    {loading ? 'Đang đăng nhập' : 'Đăng nhập'}
                </Button>
                <Typography component={Link} to='/register' sx={{
                    textDecorationColor: 'lightblue', textDecoration: 'none'
                }}>
                    Nếu chưa có tài khoản, vào đăng ký nhé!!
                </Typography>
            </form>
            {/* <FormControlLabel
                    label='Lưu đăng nhập'
                    control={x
                        <Checkbox
                            checked={checked}
                            onChange={handleChecked}
                        />
                    }
                /> */}
        </Box>
    )
}