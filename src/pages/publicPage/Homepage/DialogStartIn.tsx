import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import type { PropsStart } from '../../../model/props/Home'
export default function DialogStartIn({open, handleClose}: PropsStart) {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <Typography color='warning'>
                Không thể thực hiện
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Typography>
                Phần này chỉ dành cho những người chưa đăng nhập và muốn thi thử,
                bạn vui lòng không thực hiện làm bài ở phần này nhe!!.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                Thoát
            </Button>
        </DialogActions>
    </Dialog>
  )
}
