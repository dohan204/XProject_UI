import { useState, useCallback, useEffect } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { FavoriteExam } from '../../../model/apiResponse/FavoriteExam';
import { useAuth } from '../../../context/AuthContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TabelSkeletion from '../TabelSkeletion';

export default function FavoriteExam() {
    const [favorites, setFavorites] = useState<FavoriteExam[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    // const [message, setMessage] = useState<string>('');
    // const [success, setSuccess] = useState<boolean>(false);
    const handleNext = (url: string) => {
        navigate(url);
    }
    const userId = user?.nameid;
    const getFavorite = useCallback(async () => {
        if (!userId || userId === null) {
            console.log("Không có id người dùng")
            return;
        }
        setLoading(true)
        try {
            const res = await axios.get(`https://api.testx.space/api/Exam/GetFavoriteExams?accountId=${userId}`)
            setFavorites(res ? res.data : []);
            console.log(res.data)
            // setSuccess(true);
        } catch (err) {
            console.error("lỗi lấy dữ liệu: ", err);
            // setSuccess(false);
        } finally {
            setLoading(false);
        }
    }, [userId])
    const currentPath = window.location.pathname
    let exam = false;
    if (currentPath === '/user/favoriteExam') {
        exam = true;
    }
    console.log(currentPath)
    useEffect(() => {
        getFavorite();
    }, [userId, getFavorite])
    return (
        <div style={{
            padding: 10, margin: 5, display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            // px: { 1}
        }}>
            {exam && <Box display={'flex'} flexDirection={'row'} height={'8vh'} p={2}>
                <Box width={'50%'}>
                    <Typography fontSize={'30px'}>
                        Danh sách đề thi yêu thích
                    </Typography>
                </Box>
                <Box width={'50%'} display={'flex'} justifyContent={'flex-end'} m={'2px'}>
                    <Button variant='contained' color='success' onClick={() => handleNext('/subject')}>
                        Thêm danh sách
                    </Button>
                </Box>
            </Box>}
            <TableContainer>
                <Typography>
                    {/* {success && <span style={{color: 'lightgreen'}}>{message}</span>} */}
                </Typography>
                <Table>
                    <TableHead sx={{ backgroundColor: 'lightskyblue' }}>
                        <TableRow>
                            <TableCell>Stt</TableCell>
                            <TableCell>Mã đề thi</TableCell>
                            <TableCell>Tên đề thi</TableCell>
                            <TableCell>Môn thi</TableCell>
                            <TableCell>Số câu hỏi</TableCell>
                            <TableCell>Thời gian làm</TableCell>
                            {/* <TableCell>Thêm</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? <TabelSkeletion row={6} col={6} /> : favorites.length > 0 ? favorites.map((favorite, index) => (
                            <TableRow key={favorite.examId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{favorite.examId}</TableCell>
                                <TableCell>{favorite.examName}</TableCell>
                                <TableCell>{favorite.subjectName}</TableCell>
                                <TableCell>{favorite.questionQuantity}</TableCell>
                                <TableCell>{favorite.duration}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                    Bạn chưa có Đề thi yêu thích nào cả
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
