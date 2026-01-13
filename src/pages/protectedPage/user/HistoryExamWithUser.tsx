import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import type { StudentExam } from '../../../model/apiResponse/StudentExamView';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
export default function HistoryExamWithUser() {
    const [loading, setLoading] = useState<boolean>(false);
    const [studentExams, setStudentExams] = useState<StudentExam[]>([]);
    // lấy id từ token 
    const { user } = useAuth();
    const userId = user?.nameid

    const getHistory = useCallback(async () => {
        if (userId === null || !userId) {
            console.log('Không có thông tin về người dùng.')
            return;
        }
        setLoading(true)
        try {
            const res = await axios.get<StudentExam[]>(`https://api.testx.space/api/Exam/GetExamOfUser?accountId=${userId}`)
            setStudentExams(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 404) {
                    console.log("khoogn có thông tin.")
                } else if (err.response?.status === 500) {
                    console.log('lỗi server')
                } else {
                    console.log('....')
                }
            }
        } finally {
            setLoading(false);
        }
    }, [userId])
    useEffect(() => {
        getHistory();
    }, [userId])
    const currentPath = window.location.pathname
    let exam = false;
    if (currentPath === '/user/history') {
        exam = true;
    }
    const TableSkeleton = () => (
        <>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: 10 }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                            <Skeleton animation='wave' />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
    return (
        <Box style={{padding: 10}} component={Paper} >
            {exam && <Typography fontSize={'30px'}
            >Lịch sử làm bài thi</Typography>}
            <TableContainer>
                <Table sx={{
                    color: 'white'
                }}>
                    <TableHead sx={{ backgroundColor: 'lightskyblue' }}>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã đề thi</TableCell>
                            {/* <TableCell>Mã đề thi</TableCell> */}
                            <TableCell>Tên đề thi</TableCell>
                            <TableCell>Môn thi</TableCell>
                            <TableCell>Số câu hỏi</TableCell>
                            <TableCell>Thời gian làm</TableCell>
                            <TableCell>Số câu đúng</TableCell>
                            <TableCell>Số câu sai</TableCell>
                            <TableCell>Điểm số</TableCell>
                            <TableCell>Ngày thi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? <TableSkeleton /> : studentExams ? studentExams.filter(e => e.score >= 5)
                            .sort((a, b) => b.score - a.score).map((exam, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{exam.examId}</TableCell>
                                    <TableCell>{exam.examName}</TableCell>
                                    <TableCell>{exam.subjectName}</TableCell>
                                    <TableCell>{exam.questionQuantity}</TableCell>
                                    <TableCell>{exam.duration}</TableCell>
                                    <TableCell>{exam.isCorrect}</TableCell>
                                    <TableCell>{exam.isWrong}</TableCell>
                                    <TableCell>{exam.score}</TableCell>
                                    <TableCell>{new Date(exam.examDate).toLocaleDateString('vi-VN')}</TableCell>
                                </TableRow>
                            )) : <Typography>
                            Không có dữ liệu điểm thi
                        </Typography>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
