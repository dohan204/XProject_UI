import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import background from '../../assets/backgroud2.jpg'
import background2 from '../../assets/dongLucp1.jpg'
import AndroidIcon from '@mui/icons-material/Android';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useEffect, useState } from "react";
// import TestFree from "./Homepage/TestFree";
import DialogStart from "./Homepage/DialogStart";
import StartPractice from "./Homepage/StartPractice";
// import { Outlet } from "react-router-dom";
import html_css from '../../assets/html-css.png'
// import cSharp from '../../assets/c#.png'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { type Subject } from "../../model/apiResponse/Subject";
import axios from "axios";
import ViewExamSubject from "../generic/ViewExamSubject";
export default function HomePage() {
  const navigate = useNavigate()
  const [account, setAccount] = useState<number>(0);
  const [question, setQuestion] = useState<number>(0);
  const [exam, setExam] = useState<number>(0);
  const [codeSubject, setCodeSubject] = useState<string>('');
  const [subjects, setSubject] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [openStart, setOpenStart] = useState<boolean>(false)
  const [openStartPractice, setOpenStartPractice] = useState<boolean>(false);
  const handleOpenStart = () => setOpenStart(true)
  const handleCloseStart = () => setOpenStart(false)

  const handleClosePractice = () => setOpenStartPractice(false);


  // const tokenUser = localStorage.getItem('tokenUser')
  const handleStartLogon = () => {
    setOpenStartPractice(true)
    // if(!tokenUser){
    //   return <StartPractice open={openStartPractice} handleClose={handleClosePractice} />
    // } 
    // return <Excersice />
  }
  const handleClickSubject = (code: string) => {
    setCodeSubject(code)
    if (!localStorage.getItem('tokenUser')) {
      setOpenStartPractice(true);
    } else {
      navigate(`subject/${code}`)
    }
  }
  const getAllDataFromApi = async () => {
    setLoading(true);
    try {
      const [account, question, exam, subjects] =
        await Promise.all(
          [axios.get('http://localhost:8089/api/Account/count'),
          axios.get('http://localhost:8089/api/Exam/countExam'),
          axios.get('http://localhost:8089/api/Question/countQuestion'),
          axios.get('http://localhost:8089/api/Subject/subjects')
          ])
      console.log('lấy dữ liệu thành công.')
      setAccount(account.data);
      setQuestion(question.data);
      setExam(exam.data);
      setSubject(subjects.data);
    } catch (err) {
      console.error('lỗi,', err)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllDataFromApi()
  }, [])

  return <Box
    display={'flex'}
    pl={1}
    width={'98vw'}
    position={'relative'}
    flexDirection={'column'}
  >
    <Box
      sx={{
        width: '99vw',
        height: '90vh',
        backgroundImage: `url(${background})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Grid container spacing={3}
        display={'flex'} flexDirection={'row'}
        justifyContent={'space-around'}
        width={'100%'} bgcolor={'lightblue'} height={'100%'}>
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
                <Typography component={'h3'} variant="h3">
                  Test preparation that makes a difference
                </Typography>
                <Typography component={'h5'} variant="h5">
                  Prepare with us – Pass your test – Get the job
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
                    onClick={handleOpenStart}>
                    Start Free Test
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
            <Grid width={'100%'} height={'70%'}>
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
                      onClick={handleStartLogon}
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
    <Box width={'99vw'} height={'30vh'} bgcolor={'lightseagreen'}
      display={'flex'}
      justifyContent={'space-around'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          outline: 'none',
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: 'lightgray',
            transition: '0.2s linear',
            transform: 'scale(1.2,1.2)',
            borderColor: 'none',
            outline: 'none'
          },
          '&:not(:hover)': {
            transition: '0.5s'
          }

        }}
      >
        <AndroidIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          outline: 'none',
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: 'lightgray',
            transition: '0.2s linear',
            transform: 'scale(1.2,1.2)',
            borderColor: 'none',
            outline: 'none'
          },
          '&:not(:hover)': {
            transition: '0.5s'
          }
        }}
      >
        <ContactSupportIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          outline: 'none',
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: 'lightgray',
            transition: '0.2s linear',
            transform: 'scale(1.2,1.2)',
            borderColor: 'none',
            outline: 'none'
          },
          '&:not(:hover)': {
            transition: '0.5s'
          }
        }}
      >
        <AttractionsIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          outline: 'none',
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: 'lightgray',
            transition: '0.2s linear',
            transform: 'scale(1.2,1.2)',
            borderColor: 'none',
            outline: 'none'
          },
          '&:not(:hover)': {
            transition: '0.5s'
          }
        }}
      >
        <BorderColorIcon sx={{ fontSize: 100 }} />
      </Box>
      <Box width={'15%'} display={'flex'} alignItems={'center'} justifyContent={'center'}
        component={'button'} onClick={() => alert('như cặc')}
        sx={{
          outline: 'none',
          '&:focus': {
            outline: 'none'
          },
          '&:hover': {
            backgroundColor: 'lightgray',
            transition: '0.2s linear',
            transform: 'scale(1.2,1.2)',
            borderColor: 'none',
            outline: 'none'
          },
          '&:not(:hover)': {
            transition: '0.5s'
          }
        }}
      >
        <MiscellaneousServicesIcon sx={{ fontSize: 100 }} />
      </Box>
    </Box>
    <Box width={'99vw'} height={'85vh'}>
      <Grid container width={'100%'} height={'100%'}
        display={'flex'}
        flexDirection={'row'}
      >
        <Grid size={3}>
        </Grid>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'}
            display={'flex'} justifyContent={'center'} flexDirection={'column'}
            alignItems={'center'}
          >
            <Box>
              <Typography component={'h3'} variant="h3" pl={5}>
                Chuẩn bị cho bài kiểm tra năng khiếu
              </Typography>
            </Box>
            <Box p={5}>
              <Typography>
                Giải phóng tiềm năng của bạn: Vượt qua bài kiểm tra năng khiếu nhân viên hoặc kỳ thi tuyển sinh vào trường một cách dễ dàng với các bài kiểm tra thực hành trực tuyến được thiết kế riêng của chúng tôi.
              </Typography>
              <Typography>
                Hãy luyện tập với một trong các bài kiểm tra năng khiếu miễn phí của chúng tôi, hoặc nâng cao trình độ của bạn với các gói luyện thi toàn diện. Đăng ký ngay và bắt đầu chuẩn bị ngay hôm nay.
              </Typography>
            </Box>
            <Typography sx={{ pb: 2 }}>
              Want to try a free aptitude test? Try our free Cognitive Ability Test.
            </Typography>
            <Box>
              <Button color="success" variant="contained">
                Free Cognitive Ability Test
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={3}>
        </Grid>
      </Grid>
    </Box>
    <motion.div
    >
      <Box width={'99vw'} height={'40vh'} mt={1}>
        <Grid container spacing={3}
          width={'100%'} display={'flex'} flexDirection={'row'}
          height={'100%'}
          columns={24}>
          <Grid size={2}></Grid>
          <Grid size={5} bgcolor={'lightgreen'}>
            <Card sx={{ width: '100%', height: '100%', backgroundColor: 'lightpink' }}  >
              <CardHeader
                avatar={
                  <Avatar>
                    <SupportAgentIcon />
                  </Avatar>
                }
              />
              <CardContent>
                <Typography>
                  Hỗ trợ online 24/7
                </Typography>
                <Typography>

                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightcyan'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
                title='Người dùng'
                subheader
              >
              </CardHeader>
              <CardContent>
                <Typography>
                  Số người dùng hiện tại
                </Typography>
                <Typography variant="h4" component={'h4'}>
                  {account}+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightgoldenrodyellow'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <AssuredWorkloadIcon />
                  </Avatar>
                }
                title='Ngân hàng câu hỏi'
              />
              <CardContent>
                <Typography>
                  Câu hỏi đươc cập nhật mới theo ngày
                </Typography>
                <Typography component={'h4'} variant="h4">
                  {question}+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={5} bgcolor={'lightpink'}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <SubjectIcon />
                  </Avatar>
                }
                title='Số lượng đề thi'
              />
              <CardContent>
                <Typography>
                  Số lượng đề thi
                </Typography>
                <Typography component={'h4'} variant="h4">
                  {exam}+
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={2}></Grid>
        </Grid>
      </Box>
    </motion.div>
    <Box width={'99vw'} height={'20vh'} mt={2}>
      <Grid container width={'100%'} height={'100%'}>
        <Grid size={3}></Grid>
        <Grid size={6}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
            width={'100%'}
          >
            <Typography component={'h4'} variant="h4">
              Thực hành theo môn
            </Typography>
            <Typography>
              Tìm môn thi phù hợp với nhu cầu của bạn, chọn môn thi ở phía dưới.
            </Typography>
          </Box>
        </Grid>
        <Grid size={3}></Grid>
      </Grid>
    </Box>
    <Box width={'99vw'} height='auto' p={5}
      display={'flex'} flexDirection={'column'} gap={3}
    >
      <Grid width={'100%'} height={'50%'} container columns={20}
        display={'flex'} flexDirection={'row'} spacing={3} mb={4}
      >
        {/* <Grid size={2}></Grid> */}
        {loading ? (<Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>) : subjects.map((sub) => (
          <Grid size={5}
            key={sub.id}
            sx={{
              transition: '0.5s',
              '&:hover': {
                transition: '0.5s ease',
                transform: 'translateY(-10px)',
                boxShadow: '4px 4px 6px lightgray'
              }
            }}
          >
            <CardActionArea sx={{
              width: '100%', height: '100%', outline: 'none',
              '&:focus, &:hover': {
                outline: 'none',
                borderColor: 'white'
              }
            }} onDoubleClick={() => alert('thần đằng')} onClick={() => handleClickSubject(sub.code)}>
              <CardHeader title={sub.name} />
              <CardMedia
                component={'img'}
                image={html_css}
              />
              <CardContent>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
        {/* <Grid size={2}></Grid> */}
      </Grid>
    </Box>
    <Box width={'99vw'} height={'50vh'} mt={12} bgcolor={'lightblue'} p={4}>
      <Box width={'100%'} height={'100%'}>
        <Box height={'15%'}>
          <Typography variant="h4">
            Các chủ đề, lĩnh vực khác mà bạn có thể tham khảo
          </Typography>
        </Box>
        <Box height={'85%'} bgcolor={'lightcoral'}>

        </Box>
      </Box>
    </Box>
    <Box width={'99vw'} height={'90vh'}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'} p={10}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ccccff',
              alignItems: 'center', gap: 4
            }}>
            <Box width={'70%'}>
              <Typography component={'h2'} variant="h2">
                Giải phóng tiềm năng của bạn
              </Typography>
              <Typography>
                Nâng cao kỹ năng và vượt trội trong bài kiểm tra năng khiếu trước khi tuyển dụng với nền tảng luyện thi của chúng tôi.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined">Bắt đầu</Button>
              <Button variant="outlined">Kiểm tra miến phí</Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'}
            sx={{
              backgroundImage: `url(${background2})`,
              backgroundRepeat: 'no-repeat',
              backgroundOrigin: 'revert',
              backgroundSize: 'auto'
            }}
          >
            <Typography>
              Okkk....
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <DialogStart open={openStart} handleClose={handleCloseStart} />
    <StartPractice open={openStartPractice} handleClose={handleClosePractice} />
    <ViewExamSubject open={openStartPractice} handleClose={handleClosePractice} code={codeSubject} />
  </Box>
}