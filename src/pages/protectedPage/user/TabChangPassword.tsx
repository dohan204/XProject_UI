import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { type ChangePassword } from '../../../model/user/ChangePassword'
import { 
    Alert, 
    Button, 
    TextField, 
    Stack, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'; // Đừng quên cài @mui/icons-material
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

interface Props {
    open: boolean;
    handleClose: () => void;
}

export default function DialogChangePassword({ open, handleClose }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<ChangePassword>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    });

    const userId = user?.nameid;
    const newPassword = watch('newPassword');

    const onSubmitData: SubmitHandler<ChangePassword> = async (data: ChangePassword) => {
        setLoading(true);
        setError(false);
        try {
            await axios.patch(`https://api.testx.space/api/Account/ChangePassword?userId=${userId}`, data);
            setSuccess(true);
            setMessage('Thay đổi mật khẩu thành công.');
            setTimeout(() => {
                reset();
                handleClose(); // Tự động đóng sau khi thành công
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setSuccess(false);
            setError(true);
            setMessage('Mật khẩu hiện tại không đúng hoặc có lỗi hệ thống.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }}>
                Đổi mật khẩu
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmitData)}>
                <DialogContent dividers>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        {(success || error) && (
                            <Alert severity={success ? 'success' : 'error'}>{message}</Alert>
                        )}

                        <Controller
                            name='currentPassword'
                            control={control}
                            rules={{ required: 'Nhập mật khẩu hiện tại' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    fullWidth
                                    label='Mật khẩu hiện tại'
                                    error={!!errors.currentPassword}
                                    helperText={errors.currentPassword?.message}
                                />
                            )}
                        />

                        <Controller
                            name='newPassword'
                            control={control}
                            rules={{ 
                                required: 'Nhập mật khẩu mới',
                                minLength: { value: 6, message: 'Tối thiểu 6 ký tự' }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    fullWidth
                                    label='Mật khẩu mới'
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword?.message}
                                />
                            )}
                        />

                        <Controller
                            name='confirmNewPassword'
                            control={control}
                            rules={{ 
                                required: 'Xác nhận lại mật khẩu',
                                validate: (val) => val === newPassword || 'Mật khẩu không khớp'
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    fullWidth
                                    label='Xác nhận mật khẩu mới'
                                    error={!!errors.confirmNewPassword}
                                    helperText={errors.confirmNewPassword?.message}
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} color="inherit">Hủy</Button>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        disabled={loading}
                    >
                        {loading ? 'Đang lưu...' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}