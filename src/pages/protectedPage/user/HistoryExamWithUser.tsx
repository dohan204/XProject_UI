import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import type { StudentExam } from '../../../model/apiResponse/StudentExamView';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
export default function HistoryExamWithUser() {
    const [loading,setLoading] = useState<boolean>(false);
    const [studentExams, setStudentExams] = useState<StudentExam[]>([]);
    // lấy id từ token 
    const {user} = useAuth();
    const userId = user?.nameid

    const getHistory = useCallback( async () => {
        if(userId === null || !userId){
            console.log('Không có thông tin về người dùng.')
            return;
        }
        setLoading(true)
        try {
            const res = await axios.get<StudentExam[]>(`http://localhost:8089/api/Exam/GetExamOfUser?accountId=${userId}`)
            setStudentExams(res.data);
        } catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status === 404){
                    console.log("khoogn có thông tin.")
                } else if (err.response?.status === 500){
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
    return (
        <div>
            {!loading ?(
                <TableContainer>
                <Table sx={{
                    color: 'white'
                }}>
                    <TableHead sx={{backgroundColor: 'lightskyblue'}}>
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
                        {studentExams ? studentExams.filter(e => e.score > 0)
                        .sort((a,b) => b.score - a.score).map((exam, index) => (
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
                                <TableCell>{exam.examDate}</TableCell>
                            </TableRow>
                        )) : []}
                    </TableBody>
                </Table>
            </TableContainer>
            ) : <Alert>Không có dữ liệu</Alert>}
        </div>
    )
}
