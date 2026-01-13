import { type Test } from '../../../model/props/Test'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import {  useNavigate } from 'react-router-dom'

export default function AskSubmit({open, handleOpen, id} : Test) {
    const navigate = useNavigate();
    const handleNextTest = () => {
        console.log("Navigating to ID:", id);
        navigate(`/test/${id}`);
    }
  return (
    <Dialog open={open}>
        <DialogTitle>
            <Typography>
                Bạn chắc là làm bài thi này chứ
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Nếu chắc chắn thì bạn hãy bấm bắt đầu nhé, 
                không thì thôi 
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleNextTest}>
                Bắt đầu
            </Button>
            <Button onClick={handleOpen}>
                Hủy
            </Button>
        </DialogActions>
    </Dialog>
  )
}
