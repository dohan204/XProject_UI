import React from 'react'
interface PropsDialog {
    openOutlogin?: () => void,
    openInlogin?: () => void,
}
import bg2 from '../../../assets/backgroud2.jpg'
import { CardActions, Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, Grid, IconButton, Typography } from "@mui/material";
import { motion } from 'framer-motion';
export default function HomeTopPage({openOutlogin, openInlogin}: PropsDialog) {
    return (
        <Box
            sx={{
                width: '99vw',
                height: '90vh',
                position: 'relative',
                backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,150,118,0.7))',
                backgroundAttachment: 'fixed',
                // backgroundColor: ,
            }}
        >
            <Grid container spacing={3}
                display={'flex'} flexDirection={'row'}
                justifyContent={'space-around'}
                width={'100%'}height={'100%'}>
                <Grid width={'36%'} bgcolor={'transparent'}>
                    <Grid width={'100%'} height={'32%'} bgcolor={'transparent'}>
                    </Grid>
                    <Grid height={'68%'} bgcolor={'transparent'}>
                        <motion.div
                            initial={{ y: -60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: 'easeIn' }}
                        >
                            <Box sx={{ pl: 7 }}>
                                <Typography component={'h3'} variant="h3"
                                    fontWeight={'bold'}
                                >
                                    Thi thử các đề thi khác nhau
                                </Typography>
                                <Typography component={'h5'} variant="h5">
                                    Tham gia cùng chúng tôi - vượi qua các bài kiểm tra theo từng cấp độ
                                </Typography>
                                <Box>
                                    <Button size="large"
                                        color="secondary"
                                        variant="contained"
                                        sx={{
                                            outline: 'none',
                                            '&:focus': {
                                                outline: 'none'
                                            }
                                        }}
                                        onClick={openOutlogin}>
                                        Bắt đầu làm thử ngay
                                    </Button>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
                <Grid width={'25%'} bgcolor={'transparent'}>
                </Grid>
                <Grid width={'32%'}>
                    <Grid width={'100%'} height={'70%'}>
                        <Grid width={'100%'} height={'30%'}>
                        </Grid>
                        <Grid width={'90%'} height={'70%'}>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1, ease: 'easeOut'
                                }}
                            >
                                <Card sx={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                    <CardContent>
                                        <Typography component={'h2'} variant="h2">
                                            Luyện tập
                                        </Typography>
                                        <Typography component={'h6'} variant="h6">
                                            Chúng tôi giúp bạn trở nên vip hơn.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="large" variant="contained" color="success"
                                            sx={{
                                                outline: 'none',
                                                '&:focus': {
                                                    outline: 'none'
                                                }
                                            }}
                                            onClick={openInlogin}
                                        >
                                            Tham gia tại đây
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
