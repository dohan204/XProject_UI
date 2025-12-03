import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import axios from 'axios';
import React,  {useState} from 'react'
import { useNavigate } from 'react-router-dom';
interface props {
    open: boolean,
    handleClose: () => void,
    examId?: number
}
export interface responseApi {
    totalQuestions: number,
    correctAnswers: number,
    wrongAnswers: number,
    score: number
}

export default function DialogConfirm({open, handleClose, examId}: props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<responseApi|null>(null);
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
            var result = await axios.post(`http://localhost:8089/api/Exam/submitExam/${examId}`, examData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const res = JSON.stringify(result.data)
            localStorage.setItem('resultExam', res);

            sessionStorage.removeItem('examStart');

            // setResult(res);
        } catch (errr) {
            if(axios.isAxiosError(errr)){
                if(errr.response?.status === 500){
                    console.log("lỗi server, vui lòng liên hệ tới quản trị viên.");
                }
            }
        } finally {
            setLoading(false);
            localStorage.removeItem('exam');
        }
        navigate(`/test/${examId}/result`);
    }
    console.log(result)

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
