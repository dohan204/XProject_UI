// import { type RegisterDto } from "../../model/auth/RegisterDto";
// import type { UserView } from "../../../model/user/UserView";
import { type Profile } from "../../../model/props/ProfileProps";
import { Box, Paper, Typography } from "@mui/material";
import FavoriteExam from "./FavoriteExam";

import HistoryExamWithUser from "./HistoryExamWithUser";
import SumaryUser from "./SumaryUser";


export default function Profile() {
    return (
        <Box
            width="100%"
            maxWidth="1400px"
            mx="auto"
            display="flex"
            flexDirection="column"
            gap={3}
            p={2}
        >
            {/* Summary */}
            <Paper elevation={2}>
                <Typography p={1} m={1} fontSize={'30px'} fontWeight={'bold'}>Thông tin Tổng quan</Typography>

                <Box
                    height="20vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <SumaryUser />
                </Box>
            </Paper>

            {/* Favorite Exam */}
            <Paper elevation={2}>
                <Box p={2}>
                    <Typography variant="h4" mb={2}>
                        Danh sách đề thi Yêu thích
                    </Typography>
                    <FavoriteExam />
                </Box>
            </Paper>

            {/* History */}
            <Paper elevation={2}>
                <Box p={2}>
                    <Typography variant="h4" mb={2}>
                        Lịch sử bài thi
                    </Typography>
                    <HistoryExamWithUser />
                </Box>
            </Paper>
        </Box>
    );
}

