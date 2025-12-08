import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material'
import xstc from '../../../assets/xstc.jpg';
import thdc from '../../../assets/subjectOther/thdc.jpg';
import english from '../../../assets/subjectOther/english.jpg';
import pldc from '../../../assets/subjectOther/pldc.jpg'
import StartPractice from "../Homepage/StartPractice";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Subject {
    id: number,
    name: string,
    code: string,
    img: string
}
interface Props {
    handleGetCode?: () => void
}
const ListImage = [pldc, xstc, thdc, english];
export default function DifferentSubject({ handleGetCode }: Props) {
    const [otherSubject, setOtherSubject] = useState<Subject[]>([])
    const [loading, setLoading] = useState(false)
    const [openStartPractice, setOpenStartPractice] = useState<boolean>(false);
    const [openTest, setOpenTest] = useState<boolean>(false);
    const [codeSubject, setCodeSubject] = useState<string>('');
    const navigate = useNavigate();
    const otherSubjectId = 2;
      const handleCloseTest = () => setOpenTest(false)
    const getSubject = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get<Subject[]>(`http://localhost:8089/api/Subject/GetByModule?moduleId=${otherSubjectId}`)
            const payload = res.data.map((e, index) => ({
                ...e,
                img: ListImage[index]
            }))
            setOtherSubject(payload);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        getSubject();
    }, [])

    // viết riêng hàm khác 
    const handleClickSubject = (code: string) => {
        setCodeSubject(code)
        if (!localStorage.getItem('tokenUser')) {
            setOpenStartPractice(true);
        } else {
            navigate(`subject/${code}`)
        }
    }
    return (
        <Box width={'98%'} height={'100%'}
            display={'flex'} flexDirection={'row'}
            justifyContent={'space-around'}
        >
            {otherSubject.map((subject) => (
                <Box key={subject.id} width={'24%'} height={'95%'} m={1} p={2} display={'flex'} justifyContent={'space-between'}>
                    <Card sx={{
                        width: '100%'
                    }} component={'div'} >
                        <CardActionArea component='div'
                            onClick={() => handleClickSubject(subject.code)}
                        >
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
            <StartPractice open={openTest} handleClose={handleCloseTest} />
        </Box>
    )
}
