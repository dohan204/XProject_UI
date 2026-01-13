import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
// import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
interface props {
    open: boolean,
    handleClose: () => void
}
export default function AlertSuccess({open, handleClose}: props) {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <Typography>
                Thông báo
            </Typography>
        </DialogTitle>
        <DialogContent>
            <CheckCircleOutlineIcon />
            <Typography>
                Tạo nhóm thành công.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button>
                Đóng
            </Button>
        </DialogActions>
    </Dialog>
  )
}
