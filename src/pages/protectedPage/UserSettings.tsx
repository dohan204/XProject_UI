import { Box, Typography } from '@mui/material'
import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
// import ModifiedInfo from './user/ModifiedInfo';
import { Button } from "@mui/material";
// import {Backdrop, CircularProgress} from "@mui/material";
import InfoDetails from "./user/InfoDetails";
import TabModifiedAll from './user/TabModifiedAll';
import DialogChangePassword from './user/TabChangPassword';
export default function UserSettings() {
    const [openModified, setOpenModified] = React.useState<boolean>(false)
    const [openChange, setOpenChange] = React.useState<boolean>(false);
    const handleOpenModified = () => setOpenModified(true)
    const handleCloseModified = () => {
        setOpenModified(false);
    }
    const handleOpenChange = () => {
        setOpenChange(true)
    }
    const handleCloseChange = () => {
        setOpenChange(false);
    }
    return (
        <Box p={2}>
            <Box height={'15%'} p={1} width={'100%'}
                display={'flex'} flexDirection={'row'} justifyContent={"space-around"}
            >
                <Box width={'35%'} alignContent={'center'}>
                    <Typography fontSize={'25px'}>
                        Cập nhật Thay đổi thông tin
                    </Typography>
                </Box>
                <Box height={'100%'} width={'65%'}
                    display={'flex'} justifyContent={'flex-end'} alignItems={'center'}
                >
                    <Button variant="contained"
                        startIcon={
                            <EditNoteIcon />
                        }
                        disabled={true}
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
                    >Cập nhật Thông tin</Button>
                    <Button variant="contained"
                        startIcon={
                            <EditNoteIcon />
                        }
                        color='success'
                        size="large"
                        sx={{
                            m: 1,
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                        onClick={handleOpenChange}
                    >Đổi mật khẩu</Button>
                </Box>
            </Box>
            <Box height={'auto'} display={'flex'} sx={{
                height: 'calc(100vh - 120px)', // Trừ đi chiều cao của Header và Footer dự kiến
                display: 'flex',
                // overflowY: 'auto', // Nếu nội dung dài quá sẽ xuất hiện thanh cuộn bên trong Box này
                paddingBottom: 2   // Tạo khoảng cách với Footer
            }}>
                <Box height={'100%'} width={'60%'}  display={'flex'} alignItems={'center'}>
                    {openModified ? <TabModifiedAll handleCloseModified={handleCloseModified} /> : 'Nếu cần thay đổi thông tin thì hãy vào đây nhé hehe'}
                </Box>
                <Box height={'100%'} width={'40%'}  display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <InfoDetails />
                </Box>
            </Box>
            <DialogChangePassword open={openChange} handleClose={handleCloseChange} />
        </Box>
    )
}
