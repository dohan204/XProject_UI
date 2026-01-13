import {
    Accordion, AccordionActions, AccordionDetails
    , AccordionSummary, Button, Dialog, DialogActions, Slide,
    DialogContent, DialogTitle, Typography
} from '@mui/material'
import { type TransitionProps } from '@mui/material/transitions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  {
    useCallback, useEffect, type Ref,
    useState, forwardRef, type ReactElement
} from 'react'
import type { Exam, props } from '../../model/props/Practice';
import axios from 'axios';
import Ask from '../protectedPage/Ask';
import { motion } from 'framer-motion';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>
    },
    ref: Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogIn({ open, handleClose }: props) {
    const [examId, setExamId] = useState<number>(0);
    const [ask, setAsk] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [exam, setExam] = useState<Exam[]>([])
    const getAllExam = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get<Exam[]>('https://api.testx.space/api/Exam/exams')
            setExam(res.data);
        } catch (err) {
            console.error('không có dữ liệu đề thi.', err)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        getAllExam()
    }, [open])

    const handleOpenAskUser = (id: number) => {
        setAsk(true);
        setExamId(id);
    }
    const handleCloseAskUser = () => {
        setAsk(false);
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} slots={{ transition: Transition }} keepMounted>
                <DialogTitle>
                    <Typography variant="h4" component="div">  {/* hoặc component="span" */}
                        Danh sách các đề thi hiện tại có thể luyện tập
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {loading ? <Typography component={'h5'} variant='h5' color='success'>
                        Đang tải dữ liệu đề thi ...
                    </Typography> : exam.map((e) => (
                        <motion.div
                            key={e.id}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: 'linear' }}
                        >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={e.title}
                                    sx={{
                                        outline: 'none',
                                        borderColor: 'none',
                                        '&:focus': {
                                            outline: 'none'
                                        }
                                    }}
                                    id={e.title}
                                >{e.subjectName}</AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        tên bài thi {e.title}, số câu hỏi {e.numberOfQuestion}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button variant='contained' color='success'
                                        sx={{
                                            outline: 'none',
                                            borderColor: 'none',
                                            '&:focus': {
                                                outline: 'none'
                                            }
                                        }}
                                        onClick={() => handleOpenAskUser(e.id)}
                                    >
                                        Làm bài
                                    </Button>
                                </AccordionActions>
                            </Accordion>
                        </motion.div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='error'
                        size='large'
                        onClick={handleClose}
                        sx={{
                            outline: 'none',
                            borderColor: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                    > Hủy </Button>
                </DialogActions>

            </Dialog>
            <Ask id={examId} open={ask} handleOpen={handleCloseAskUser} />
        </>
    )
}
