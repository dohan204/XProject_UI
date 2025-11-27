import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import axios from 'axios';
import React,  {useState} from 'react'
import { useNavigate } from 'react-router-dom';
interface props {
    open: boolean,
    handleClose: () => void,
    examId?: number
}

export default function DialogConfirm({open, handleClose, examId}: props) {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const exam = localStorage.getItem('exam');
    const handlePostExamToServer = async () => {
        if(exam == null || exam.length === 0){
            console.log('Khong do du lieu can gui di, vui long kiem tra lai')
            return false;
        }
        const examData = JSON.parse(exam);
        setLoading(true);
        try {
            await axios.post(`https://localhost:7151/api/Exam/submitExam/${examId}`, examData, {
                headers: {'Content-Type': 'application/json'}
            })
            console.log('gui du lieu thang cong.')
        } catch (errr) {
            console.log('loix', errr)
        } finally {
            setLoading(false);
        }
        navigate(`/test/${examId}/result`);
    }
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <Typography>
                Xác nhận nộp bài
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Typography>
                Bạn có chắc là nộp bài chứ, hãy kiểm tra kỹ lại trước khi xác nhận nhé
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handlePostExamToServer}>
                {loading ? "Dang gui..." : 'Xac nhan'}
            </Button>
            <Button onClick={handleClose}>
                Hủy
            </Button>
        </DialogActions>
    </Dialog>
  )
}
