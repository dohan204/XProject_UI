import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { responseApi } from '../../protectedPage/subjectExam/DialogConfirm'
// import { ok } from 'assert'
interface Props {
    open: boolean,
    handleClose: () => void
    id: number
}
export default function DialogConfirm({ open, handleClose, id }: Props) {
    const navigate = useNavigate();
    const [response, setResponse] = useState<responseApi | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    // lấy dữ liệu đã lưu vào localStorage trước đó
    const value = localStorage.getItem('examTestFree')
    if (response)
        return <>
            <Typography>
                Có dữ liệu nhé
            </Typography>
        </>
    // console.log(value)
    const handleSubmit = async () => {
        if (value === null || value.length === 0) {
            return;
        }
        const payload = JSON.parse(value)
        setLoading(true)
        try {
            const res = await axios.post(`https://api.testx.space/api/Exam/Submit?examId=${id}`, payload)
            setResponse(res.data);
            sessionStorage.setItem('resultExam', JSON.stringify(res.data))
            navigate(`/freetest/${id}/result`)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 404) {
                    console.log("không tìm thấy đề thi")
                } else if (err.response?.status === 400) {
                    console.log("Dữ liệu không hợp lệ")
                } else if (err.response?.status === 500) {
                    console.log('Lỗi server.')
                } else {
                    console.log('đang xảy ra lỗi vui lòng thử lại sau ít phút')
                }
            }
        } finally {
            setLoading(false);
            sessionStorage.removeItem('saveExam')
            sessionStorage.removeItem('timeTest')
            sessionStorage.removeItem('index')
            sessionStorage.removeItem('answer')
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
                    disabled={loading}
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
