import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { responseApi } from '../../protectedPage/subjectExam/DialogConfirm'
interface Props {
    open: boolean,
    handleClose: () => void
    id: number
}
export default function DialogConfirm({open, handleClose, id} :Props) {
    const navigate = useNavigate();
    const [response, setResponse] = useState<responseApi | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
      // laays ra ma bai thi 
      const nextDialog = () => {
    }
    // lấy dữ liệu đã lưu vào localStorage trước đó
    const value = localStorage.getItem('examTestFree')
    // console.log(value)
    const handleSubmit = async () => {
        if(value === null || value.length === 0){
            return;
        }
        const payload = JSON.parse(value)
        setLoading(true)
        try {
            const res = await axios.post(`https://localhost:7151/api/Exam/Submit?examId=${id}`, payload)
            setResponse(res.data);
            localStorage.setItem('testFree', res.data)
            navigate(`/freetest/${id}/result`)
            console.log('nộp bài thành công')
        } catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status === 404) {
                    console.log("không tìm thấy đề thi")
                } else if (err.response?.status === 400){
                    console.log("Dữ liệu không hợp lệ")
                } else if (err.response?.status === 500){
                    console.log('Lỗi server.')
                } else {
                    console.log('đang xảy ra lỗi vui lòng thử lại sau ít phút')
                }
            }
        }
    }
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{
            fontSize: '32px'
        }}>
                Xác nhận nộp bài
            {/* </Typography> */}
        </DialogTitle>
        <DialogContent>
            <Typography>
                Vui lòng kiểm tra kỹ lại trước khi xác nhận
            </Typography>
            <Typography>
                Nếu đã chắc chắn thì xác nhận bạn nhé.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='success' size='small'
                onClick={handleSubmit}
            >
                Xác nhận
            </Button>
            <Button variant='contained' color='error' size='small'
                onClick={handleClose}
            >
                Hủy
            </Button>
        </DialogActions>
    </Dialog>
  )
}
