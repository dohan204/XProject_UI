import {
    Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Paper
} from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import TabelSkeletion from './TabelSkeletion';

// Interface
interface Response {
    subjectName: string
    titleExam: string
    numberOfExam: number
}

interface ResponseScore {
    id: number
    fullName: string
    titleExam: string
    subjectName: string
    numberOfQuestion: string
    examDate: string
    score: number
    rank: number
}


export default function RatingGeneric() {
    const [loading, setLoading] = useState<boolean>(true)
    const [rating, setRating] = useState<Response[]>([])
    const [scores, setScores] = useState<ResponseScore[]>([])

    const getRatingExam = async () => {
        setLoading(true)
        try {
            const [res1, res2] = await Promise.all([
                axios.get<Response[]>('https://api.testx.space/api/Rating'),
                axios.get<ResponseScore[]>('https://api.testx.space/api/Rating/Rank')
            ])

            setRating(res1.data ?? [])
            setScores(res2.data ?? [])
        } catch (err) {
            console.error('Lỗi tải dữ liệu:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRatingExam()
    }, [])

    // Tính xếp hạng có xử lý đồng hạng
    const rankedScores = scores
        .filter(e => e.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item, index, arr) => {
            if (index === 0) return { ...item, rank: 1 }
            const prev = arr[index - 1]
            const rank = item.score === prev.rank ? prev.rank : index + 1
            return { ...item, rank }
        })

    // Render icon/huy chương top 3
    const renderRank = (rank: number) => {
        if (rank === 1) return <Typography fontWeight="bold" color="#FFD700" fontSize="1.4rem">🥇</Typography>
        if (rank === 2) return <Typography fontWeight="bold" color="#C0C0C0" fontSize="1.3rem">🥈</Typography>
        if (rank === 3) return <Typography fontWeight="bold" color="#CD7F32" fontSize="1.2rem">🥉</Typography>
        return <Typography fontWeight="bold">#{rank}</Typography>
    }

    return (
        <Box width={'98vw'}>
            {/* ================== BẢNG 1: ĐỀ THI NHIỀU NHẤT ================== */}
            <Box p={3} height={'100vh'}>
                <Typography variant="h5" color="lightseagreen" fontWeight="bold" gutterBottom>
                    Đề thi được thi nhiều nhất
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                                <TableCell><b>STT</b></TableCell>
                                <TableCell><b>Môn thi</b></TableCell>
                                <TableCell><b>Tên bài thi</b></TableCell>
                                <TableCell align="center"><b>Số lần thi</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TabelSkeletion row={10} col={4} />
                            ) : (
                                rating
                                    .filter(e => e.numberOfExam > 0)
                                    .sort((a, b) => b.numberOfExam - a.numberOfExam)
                                    .slice(0, 10)
                                    .map((e, i) => (
                                        <TableRow key={i} hover>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{e.subjectName}</TableCell>
                                            <TableCell>{e.titleExam}</TableCell>
                                            <TableCell align="center">{e.numberOfExam}</TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* ================== BẢNG 2: XẾP HẠNG ĐIỂM ================== */}
            <Box p={3}>
                <Typography variant="h5" color="lightseagreen" fontWeight="bold" gutterBottom>
                    Bảng xếp hạng điểm thi cao nhất
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#fff3e0' }}>
                                <TableCell width={100} align="center"><b>Hạng</b></TableCell>
                                <TableCell><b>Họ và tên</b></TableCell>
                                <TableCell><b>Bài thi</b></TableCell>
                                <TableCell><b>Môn</b></TableCell>
                                <TableCell align="center"><b>Số câu</b></TableCell>
                                <TableCell><b>Ngày thi</b></TableCell>
                                <TableCell align="center"><b>Điểm</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TabelSkeletion row={8} col={7} />
                            ) : rankedScores.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography color="text.secondary">Chưa có dữ liệu xếp hạng</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rankedScores.map((r, index) => (
                                    <TableRow
                                        key={r.id}
                                        sx={{
                                            backgroundColor: index < 3 ? '#fff8e1' : 'inherit',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                    >
                                        <TableCell align="center">
                                            {renderRank(r.rank)}
                                        </TableCell>
                                        <TableCell>{r.fullName}</TableCell>
                                        <TableCell>{r.titleExam}</TableCell>
                                        <TableCell>{r.subjectName}</TableCell>
                                        <TableCell align="center">{r.numberOfQuestion}</TableCell>
                                        <TableCell>{new Date(r.examDate).toLocaleDateString('vi-VN')}</TableCell>
                                        <TableCell align="center">
                                            <Typography fontWeight="bold" color="primary.main">
                                                {r.score.toFixed(1)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}