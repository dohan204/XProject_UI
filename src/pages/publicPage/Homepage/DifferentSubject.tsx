import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material'
import xstc from '../../../assets/xstc.jpg';
import pldc from '../../../assets/pldc.webp';
import th from '../../../assets/triethoc2.webp';
import tlh from '../../../assets/tlh.png';
interface Subject {
    id: number,
    name: string,
    img: string
}
const subjectDifferent: Subject[] = [
    { id: 1, name: 'Triết học', img: th ,  },
    { id: 2, name: 'Pháp luật đại cương', img: pldc },
    { id: 3, name: 'Tâm lý học', img: tlh },
    { id: 4, name: 'Xác xuất thống kê', img: xstc }
]
export default function DifferentSubject() {
    return (
        <Box width={'98%'} height={'100%'}
            display={'flex'} flexDirection={'row'} justifyContent={'space-around'}
        >
            {subjectDifferent.map((subject) => (
                <Box key={subject.id} width={'24%'} height={'95%'} m={1} p={2}  display={'flex'} justifyContent={'space-between'}>
                    <Card sx={{
                        width: '100%'
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component={'img'}
                                height={'200px'}
                                image={subject.img}
                            />
                            <CardContent
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    // bottom   : 0,
                                    background: 'lightgray',
                                    color: '#fff',
                                    transform: 'translateY(-22.5%)',
                                    height: 'auto',
                                    // slide-up
                                    // transform: 'translateY(50%)',
                                    // transition: '0.4s ease',
                                    transition: '0.4s ease',
                                    // khi hover card thì content trượt lên
                                    '.MuiCard-root:hover &': {
                                        transform: 'translateY(-50%)',
                                        width: 'auto'
                                    },
                                    overflow: 'auto',
                                    overflowY: 'hidden'
                                
                                }}
                            >
                                <Typography>
                                    {subject.name}
                                </Typography>
                                <Typography>
                                    Ranging across all continents except Antarctica
                                </Typography>
                                <Typography>
                                    Ranging across all continents except Antarctica
                                </Typography>
                                <Typography>
                                    Ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            ))}
        </Box>
    )
}
