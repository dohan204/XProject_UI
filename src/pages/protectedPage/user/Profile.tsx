import { useEffect, useState, useCallback } from "react";
// import { type RegisterDto } from "../../model/auth/RegisterDto";
import type { UserView } from "../../../model/user/UserView";
import { type Profile } from "../../../model/props/ProfileProps";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModifiedInfo from "./ModifiedInfo";
import FavoriteExam from "./FavoriteExam";
// import {Backdrop, CircularProgress} from "@mui/material";
import InfoDetails from "./InfoDetails";
import HistoryExamWithUser from "./HistoryExamWithUser";


export default function Profile() {
    const navigate = useNavigate()
    const [openModified, setOpenModified] = useState<boolean>(false)

    const [openDetail, setOpenDetail] = useState<boolean>(false);

    const [users, setUser] = useState<UserView | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)

    const handleOpenDetails = () => {
        setOpenDetail(true)
    }
    const handleCloseDetails = () => setOpenDetail(false)
    const handleOpenModified = () => setOpenModified(true)
    const handleCloseModified = () => setOpenModified(false);
    // const getUser = async () => {
    //     setLoading(true)
    //     const userId = localStorage.getItem('tokenUser')
    //     if (!userId)
    //         return;
    //     try {
    //         const response = await axios.get(`http://localhost:8089/api/Account/getbyId?id=${userId}`)
    //         setUser(response.data)
    //     } catch (error) {
    //         console.error('lỗi khi xử lý lấy thông tin người dùng.', error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // useEffect(() => {
    //     // getUser()
    // }, [])
    const handlePrevRoute = () => {
        navigate(-1)
    }
    return (
        <Box width={'98vw'} height={'auto'} m={1} display={'flex'} flexDirection={'column'}
            sx={{ xs: 4, md: 8 }}
        >
            <Box height={'15%'} bgcolor={'lightcoral'} p={1} width={'100%'}
                display={'flex'} flexDirection={'row'} justifyContent={"space-around"}
            >
                <Box height={'100%'} width={'49%'} bgcolor={'lightcyan'}
                    display={'flex'} justifyContent={'flex-start'} alignItems={'center'}
                >
                    <Button
                        variant="contained"
                        color='success'
                        size="large"
                        sx={{
                            m: 1,
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            },
                            '&:hover': {
                                backgroundColor: 'purple'
                            }
                        }}
                        onClick={handlePrevRoute}
                    >
                        Quay lại
                    </Button>
                </Box>
                <Box height={'100%'} width={'49%'} bgcolor={'lightgoldenrodyellow'}
                    display={'flex'} justifyContent={'flex-end'} alignItems={'center'}
                >
                    <Button variant="contained"
                        color='success'
                        size="large"
                        sx={{
                            m: 1,
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                        onClick={handleOpenModified}
                    >Chỉnh sửa thông tin</Button>
                    <Button variant="contained"
                        color='success'
                        size="large"
                        sx={{
                            m: 1,
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                        onClick={handleOpenDetails}
                    >Xem thông tin chi tiết</Button>
                </Box>
            </Box>
            <Box width={'100%'} height={'auto'} p={1} bgcolor={'lightgray'}>
                <Box height={'20%'} bgcolor={'lightgreen'} p={1}>
                    <Typography variant="h4" >
                        Lớp học hiện tại
                    </Typography>
                </Box>
                <Box height={'80%'} bgcolor={'lightgrey'} width={'100%'}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>
                                        grade level
                                    </TableCell>
                                    <TableCell>School(University/College)</TableCell>
                                    <TableCell>SchoolCode</TableCell>
                                    <TableCell>Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        cnt23432
                                    </TableCell>
                                    <TableCell>
                                        University
                                    </TableCell>
                                    <TableCell>
                                        Hanoi University of Science and Technology
                                    </TableCell>
                                    <TableCell>
                                        Hust
                                    </TableCell>
                                    <TableCell>
                                        Hà nội
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        cnt23432
                                    </TableCell>
                                    <TableCell>
                                        University
                                    </TableCell>
                                    <TableCell>
                                        Hanoi University of Science and Technology
                                    </TableCell>
                                    <TableCell>
                                        Hust
                                    </TableCell>
                                    <TableCell>
                                        Hà nội
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        cnt23432
                                    </TableCell>
                                    <TableCell>
                                        University
                                    </TableCell>
                                    <TableCell>
                                        Hanoi University of Science and Technology
                                    </TableCell>
                                    <TableCell>
                                        Hust
                                    </TableCell>
                                    <TableCell>
                                        Hà nội
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Box height={'auto'} width={'100%'} component={Paper} p={1}>
                <Box  m={1} p={1}>
                    <Typography variant="h4">
                        Danh sách đề thi Yêu thích
                    </Typography>
                </Box>
                <Box>
                    <FavoriteExam />
                </Box>
            </Box>
            <Box width={'100%'}  component={Paper} p={1}>
                <Box p={1} m={1}>
                    <Typography variant="h4">
                        Lịch sử bài thi
                    </Typography>
                </Box>
                <Box>
                    <HistoryExamWithUser />
                </Box>
            </Box>
            <ModifiedInfo open={openModified} handleClose={handleCloseModified} />
            <InfoDetails open={openDetail} handleClose={handleCloseDetails} />
        </Box>
    )
}