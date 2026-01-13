import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, Form, useForm } from 'react-hook-form'
import AlertSuccess from './AlertSuccess';

interface AddGroup {
    group_name: string,
    group_size: number,
    group_description: string,
}

interface props {
    open: boolean,
    handleClose: () => void
}

export default function NewGroup({ open, handleClose }: props) {
    const [success, setSuccess] = useState<boolean>(false);
    const handleOpenAlert = () => setSuccess(true);
    const handleCloseAlert = () => setSuccess(false);
    // 1. Sửa kiểu Ref cho đúng với thẻ button
    const submitBtnRef = React.useRef<HTMLButtonElement>(null);

    const { control } = useForm<AddGroup>({
        defaultValues: {
            group_name: '',
            group_description: '',
            group_size: 0
        }
    })
    const token = localStorage.getItem('token');
    if(!token)
        console.error('token không hợp lệ.')
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <DialogTitle>
                <Typography fontSize={'20px'} fontWeight="bold" color='textSecondary'>Thêm nhóm</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Form
                    control={control}
                    action={'https://api.testx.space/api/Group/CreateGroup'}
                    method='post'
                    headers={{ 
                        'Content-Type': 'application/json',
                        'Authorization':  `Bearer ${token}`
                    }}
                    onSuccess={({ response }) => {
                        console.log('Tạo nhóm thành công:', response);
                        // alert('Tạo nhóm thành công!')
                        handleOpenAlert()
                        setSuccess(true)
                        handleClose(); // Đóng dialog khi thành công
                    }}
                    onError={({ response }) => {
                        console.error('Lỗi API (Check tab Network để xem chi tiết):', response);
                    }}
                >
                    <Controller
                        name='group_name'
                        control={control}
                        rules={{ required: 'Tên nhóm không được bỏ trống' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label='Tên nhóm'
                                error={!!error} // Dùng error từ fieldState
                                helperText={error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    
                    <Controller
                        name='group_description'
                        control={control}
                        rules={{ required: 'Phần mô tả không được để trống' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label='Mô tả'
                                multiline
                                rows={3}
                                error={!!error} // Dùng error từ fieldState
                                helperText={error?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name='group_size'
                        control={control}
                        rules={{ 
                            required: 'Không được bỏ trống',
                            min: { value: 1, message: 'Tối thiểu là 1 thành viên' }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                type='number'
                                label='Số thành viên'
                                error={!!error}
                                helperText={error?.message}
                                fullWidth
                                margin="normal"
                                // Chống lỗi NaN khi xóa sạch ô input
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                        )}
                    />
                    
                    {/* Nút ẩn để trigger submit */}
                    <button type='submit' ref={submitBtnRef} style={{ display: 'none' }}></button>
                </Form>
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
                <Button variant='outlined' color='inherit' onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant='contained' onClick={() => submitBtnRef.current?.click()}>
                    Tạo nhóm
                </Button>
            </DialogActions>
            <AlertSuccess open={success} handleClose={handleCloseAlert} />
        </Dialog>
    )
}
