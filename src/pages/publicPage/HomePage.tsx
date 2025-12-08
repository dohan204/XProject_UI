import {  Box, Button, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, Grid, IconButton, Paper, Typography } from "@mui/material";
import background2 from '../../assets/dongLucp1.jpg'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import DialogStart from "./Homepage/DialogStart";
import StartPractice from "./Homepage/StartPractice";
// import html_css from '../../assets/html-css.png'
import { useNavigate } from "react-router-dom";
import { type Subject } from "../../model/apiResponse/Subject";
import axios from "axios";
import ViewExamSubject from "../generic/ViewExamSubject";
import DifferentSubject from "./Homepage/DifferentSubject";
import { useAuth } from "../../context/AuthContext";
import { subjectImage } from "../../image/SubjectImage";
import HomeTopPage from "./Homepage/HomeTopPage";
import HomepageMiddleTop from "./Homepage/HomepageMiddleTop";
import HomepageAbout from "./Homepage/HomepageAbout";
export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [codeSubject, setCodeSubject] = useState<string>('');
  const [subjects, setSubject] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [openStartFree, setOpenStartFree] = useState<boolean>(false)
  const [openStartPractice, setOpenStartPractice] = useState<boolean>(false);
  const [openTest, setOpenTest] = useState<boolean>(false);
  const handleCloseTest = () => setOpenTest(false)
  const handleOpenStart = () => setOpenStartFree(true)
  const handleCloseStart = () => setOpenStartFree(false)
  const programmingId = 1;
  const handleClosePractice = () => setOpenStartPractice(false);
  const token = user?.nameid;
  console.log(token)
  const handleStartLogon = () => {
    setOpenTest(true)
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
      const [subjects] =
        await Promise.all(
          [
            axios.get<Subject[]>(`http://localhost:8089/api/Subject/GetByModule?moduleId=${programmingId}`),
          ])
      console.log('lấy dữ liệu thành công.')
      const payload = subjects.data.map((e, i) => ({
        ...e,
        img: subjectImage[i]
      }))
      setSubject(payload);
      // setOtherSubject(otherSubject.data)
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
    width={'98vw'}
    // position={'relative'}
    flexDirection={'column'}
  >
    <HomeTopPage openInlogin={handleStartLogon} openOutlogin={handleOpenStart} />
    <HomepageMiddleTop />
    <HomepageAbout />
    <Box width={'99vw'} height={'20vh'} mt={2}
      bgcolor={'rgba(184, 221, 195, 0.6)'}
      display={'flex'} justifyContent={'center'}
      alignItems={'center'}
    >
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
          Lựa chọn các môn phù hợp với bạn ở phía dưới để luyện tập
        </Typography>
      </Box>
    </Box>
    <Box width={'93vw'} height='auto' p={5}
      display={'flex'} flexDirection={'column'}
      bgcolor={'linear-gradient(to right,#9BB8ED, #FCF0CF'}
      sx={{
        background: 'linear-gradient(to right, #9BB8ED, #FCF0CF)'
      }}
    >
      <Grid width={'100%'} height={'50%'} container columns={20}
        display={'flex'} flexDirection={'row'} spacing={3}
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
            component={Paper}
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
              // background: ''
              width: '100%', height: '100%', outline: 'none',
              '&:focus, &:hover': {
                outline: 'none',
                borderColor: 'white'
              }
            }} onClick={() => handleClickSubject(sub.code)}>
              <CardHeader title={sub.name} />
              <CardMedia
                component={'img'}
                height={'160px'}
                image={sub.img}
              />
              <CardContent>
              </CardContent>
            </CardActionArea>
          </Grid>
        ))}
        {/* <Grid size={2}></Grid> */}
      </Grid>
    </Box>
    <Box width={'100%'} height={'auto'} component={Paper} m={1}>
      <Box width={'100%'} height={'100%'}>
        <Box height={'auto'} m={2}>
          <Typography variant="h4">
            Các chủ đề, môn học khác mà bạn có thể tham khảo
          </Typography>
        </Box>
        <Box height={'auto'}>
          <DifferentSubject />
        </Box>
      </Box>
    </Box>
    <Box width={'99vw'} height={'50vh'}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Box width={'100%'} height={'100%'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ccccff',
              alignItems: 'center', gap: 4
            }}>
            <Box width={'70%'}>
              <Typography component={'h2'} variant="h2">
                Cải thiện kiến thức của bạn
              </Typography>
              <Typography>
                Kiến thức không tự chui vào đầu bạn, nhưng chúng tôi có thể giúp nó “trượt” vào dễ hơn bao giờ hết.</Typography>
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
    <DialogStart open={openStartFree} handleClose={handleCloseStart} />
    <StartPractice open={openTest} handleClose={handleCloseTest} />
    <ViewExamSubject open={openStartPractice} handleClose={handleClosePractice} code={codeSubject} />
  </Box>
}