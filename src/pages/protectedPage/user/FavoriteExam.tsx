import React, { useState, useCallback, useEffect } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { FavoriteExam } from '../../../model/apiResponse/FavoriteExam';
import { useAuth } from '../../../context/AuthContext';
import axios from "axios";

export default function FavoriteExam() {
    const [favorites, setFavorites] = useState<FavoriteExam[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const [success, setSuccess] = useState<boolean>(false);
    const userId = user?.nameid;
    const getFavorite = useCallback(async () => {
        if (!userId || userId === null) {
            console.log("Không có id người dùng")
            return;
        }
        setLoading(true)
        try {
            const res = await axios.get(`http://localhost:8089/api/Exam/GetFavoriteExams?accountId=${userId}`)
            setFavorites(res ? res.data : []);
            console.log(res.data)
            setSuccess(true);
        } catch (err) {
            console.error("lỗi lấy dữ liệu: ", err);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }, [userId])

    useEffect(() => {
        getFavorite();
    }, [userId, getFavorite])

    const handleDelete = async (id: number) => {
        setLoading(true)
        try {
            await axios.delete(`https://localhost:7151/api/Exam/DeleteFavorite?Id=${id}`)
            alert('Xóa thành công')
        } catch (err) {
            if(axios.isAxiosError(err)){
                if(err.response?.status === 500){
                    console.log('lỗi server');
                } else if (err.response?.status === 404){
                    console.log('không tìm thấy đề thi..');
                } else {
                    console.log('lỗi');
                }
            }
        }
    }
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: 'lightskyblue'}}>
                        <TableRow>
                            <TableCell>Stt</TableCell>
                            <TableCell>Mã đề thi</TableCell>
                            <TableCell>Tên đề thi</TableCell>
                            <TableCell>Môn thi</TableCell>
                            <TableCell>Số câu hỏi</TableCell>
                            <TableCell>Thời gian làm</TableCell>
                            <TableCell>Thêm</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? favorites.map((favorite, index) => (
                            <TableRow key={favorite.examId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{favorite.examId}</TableCell>
                                <TableCell>{favorite.examName}</TableCell>
                                <TableCell>{favorite.subjectName}</TableCell>
                                <TableCell>{favorite.questionQuantity}</TableCell>
                                <TableCell>{favorite.duration}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(favorite.id)}>
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : []}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
