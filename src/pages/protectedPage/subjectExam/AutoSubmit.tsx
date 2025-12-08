import { Dialog, DialogActions, Backdrop, DialogContent, DialogTitle, Typography, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface propsWarning {
    openAuto: boolean,
    autoSubmit?: () => void
}
const AutoSubmitWarning: React.FC<propsWarning> = ({ openAuto, autoSubmit }) => {
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true)
        try {
            setTimeout(() => {
                autoSubmit && autoSubmit()
            }, 1500)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [openAuto])
    return (
        <Dialog open={openAuto}>
            <DialogTitle>
                <Typography>
                    Thông báo
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Hệ thống sẽ nộp bài thi giúp bạn, bạn không phải cảm ơn nhé hehe!!
                    {loading ? <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={openAuto}
                    //   onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop> : '...'}
                </Typography>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>

    )
}
export default AutoSubmitWarning
