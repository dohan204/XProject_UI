// import React, { useState } from 'react'
import type { PropsStart } from '../../../model/props/Home'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import DialogStartIn from './DialogStartIn';
// import { useAuth } from '../../../context/AuthContext';
export default function DialogStart({ open, handleClose }: PropsStart) {
    // const [openTest, setOpenTest] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleNextPage = () => {
            navigate('/freetest')
    }
    return (
        <>(
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >
                    <Typography color='info' sx={{ fontSize: '30px' }}>
                        Bạn muốn làm bài thi thử ư?
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bài thi này sẽ không lưu lại, Bạn muốn xem lại kêt quả sau các bài thi thì vui lòng thực hành ở phần khác nhé.
                    </Typography>
                    <Typography>
                        Phần này chỉ mang tính thử thôi, ..
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        outline: 'none',
                        '&:focus': {
                            outline: 'none'
                        },
                        color: 'lightgreen'
                    }} variant='contained' color='success' onClick={handleNextPage}>Bắt đầu</Button>
                    <Button sx={{
                        outline: 'none',
                        '&:focus': {
                            outline: 'none'
                        }
                    }} variant='contained' color={'error'} onClick={handleClose}>Hủy</Button>
                </DialogActions>
            </Dialog>
            )
        </>
    )
}
