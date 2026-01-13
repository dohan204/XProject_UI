import type { props } from '../../model/props/Practice'
import {  Box, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function DialogOut({open, handleClose} : props) {
    const navigate = useNavigate()
        const handleNextLogin = () => {
            navigate('/login', { replace: false })
        }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography component={'h3'} variant='h3' color='lightseagreen'>
                    Bạn cần đăng nhập để tiếp tục
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box width={'auto'}>
                    <Typography>
                        Để thực hiện thao tác này trước tiên bạn phải đăng nhập
                    </Typography>
                    <Typography>
                        Hãy đăng nhập để thực hành được nhiều để bài, những đề thi hay nhất thế giới =))
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button size='large' variant='contained'
                    sx={{
                        outline: 'none',
                        borderColor: 'none',
                        '&:focus': {
                            outline: 'none',
                        }
                    }}
                    color={'secondary'}
                    onClick={handleNextLogin}>
                    <Typography>
                        Đăng nhập ngay
                    </Typography>
                </Button>
                <Button onClick={handleClose}
                    color='error'
                    variant='contained'
                    sx={{
                        outline: 'none',
                        borderColor: 'none',
                        '&:focus': {
                            outline: 'none'
                        }
                    }}
                >
                    <Typography>
                        Thoát.
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}
