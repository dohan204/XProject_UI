import React, { useState } from 'react'
import type { PropsStart } from '../../../model/props/Home'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DialogStartIn from './DialogStartIn';
import { useAuth } from '../../../context/AuthContext';
export default function DialogStart({ open, handleClose }: PropsStart) {
    // const [openTest, setOpenTest] = useState<boolean>(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleNextPage = () => {
        if (!localStorage.getItem('token')) {
            navigate('/freetest')
        }
    }
    return (
        <>
            {user ? 
                (<DialogStartIn open={open} handleClose={handleClose} />)
            : (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography color='info'>
                            Bạn muốn làm bài thi thử ư?
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bài thi này sẽ không lưu lại, nếu muốn lưu lại thì hãy đăng nhập trước
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }} onClick={handleNextPage}>Bắt đầu</Button>
                        <Button sx={{
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }} onClick={handleClose}>Hủy</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}
