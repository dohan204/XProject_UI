import { Box,  Typography } from "@mui/material";
// import background2 from '../../assets/dongLucp1.jpg'
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import DialogStart from "./Homepage/DialogStart";
import StartPractice from "./Homepage/StartPractice";
// import html_css from '../../assets/html-css.png'

// import { type Subject } from "../../model/apiResponse/Subject";
// import axios from "axios";
// import ViewExamSubject from "../generic/ViewExamSubject";
// import DifferentSubject from "./Homepage/DifferentSubject";
import { useAuth } from "../../context/AuthContext";
// import { subjectImage } from "../../image/SubjectImage";
import HomeTopPage from "./Homepage/HomeTopPage";
import HomepageMiddleTop from "./Homepage/HomepageMiddleTop";
import HomepageAbout from "./Homepage/HomepageAbout";
import background from '../../assets/Background_it.png'
import { useLocation } from "react-router-dom";
import outlineSubject from '../../assets/SubjectOutline2.jpg'
export default function HomePage() {
  const { user } = useAuth();

  // const [subjects, setSubject] = useState<Subject[]>([])
  // const [loading, setLoading] = useState<boolean>(false);
  const [openStartFree, setOpenStartFree] = useState<boolean>(false)
  // const [openStartPractice, setOpenStartPractice] = useState<boolean>(false);
  const [openTest, setOpenTest] = useState<boolean>(false);
  const handleCloseTest = () => setOpenTest(false)
  const handleOpenStart = () => setOpenStartFree(true)
  const handleCloseStart = () => setOpenStartFree(false)
  // const handleClosePractice = () => setOpenStartPractice(false);
  const token = user?.nameid;
  console.log(token)
  const handleStartLogon = () => {
    setOpenTest(true)
  }
  const location = useLocation();
  const checkRoute = location.pathname;
  if(checkRoute !== '/freetest') {
    localStorage.removeItem('examTestFree')
    localStorage.removeItem('examResponse')
    sessionStorage.removeItem('examSave')
  }
  return <Box
    display={'flex'}
    // position={'relative'}
    flexDirection={'column'}
  >
    <HomeTopPage openInlogin={handleStartLogon} openOutlogin={handleOpenStart} />
    <HomepageMiddleTop />
    <HomepageAbout />
    <Box width={'97vw'} height={'20vh'} mt={2}
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
          Thực hành theo các chủ đề
        </Typography>
        <Typography>
          Lựa chọn các môn phù hợp với bạn ở phía dưới để luyện tập
        </Typography>
      </Box>
    </Box>
    <Typography fontSize={20} p={2}>
      Công nghệ thông tin
    </Typography>
    <Box p={2} display={'flex'} flexDirection={'row'}>
      <Box width={'25%'}>
        <img
          style={{
            borderRadius: 5,
          }}
          src={background}
        />
      </Box>
      <Box width={'75%'} display={'flex'} justifyContent={'center'}>

        <Typography >
          Công nghệ thông tin – Chủ đề trắc nghiệm tổng hợp về công nghệ thông tin,
          bao gồm hệ thống câu hỏi đa dạng xoay quanh các kiến thức nền tảng như phần mềm,
          phần cứng, mạng máy tính, hệ điều hành và hệ thống thông tin. Thông qua việc làm bài trắc nghiệm,
          người học có thể ôn tập kiến thức một cách có hệ thống, kiểm tra mức độ hiểu bài, rèn luyện kỹ năng tư duy logic và chuẩn bị hiệu quả cho các kỳ kiểm tra,
          thi cử cũng như quá trình học tập và làm việc trong lĩnh vực công nghệ thông tin.
        </Typography>
      </Box>
    </Box>
    <Typography fontSize={20} p={2}>
      Các môn đại cương
    </Typography>
    <Box p={2} display={'flex'} flexDirection={'row'}>
      <Box width={'25%'}>
        <img
          style={{
            borderRadius: 5,
          }}
          width={'296px'}
          height={'170px'}
          src={outlineSubject}
        />
      </Box>
      <Box width={'75%'} display={'flex'} justifyContent={'center'}>
        <Typography >
          Các môn đại cương – Nhóm chủ đề trắc nghiệm tổng hợp các kiến thức nền tảng phục vụ 
          quá trình học tập ở bậc cao đẳng, đại học. Hệ thống câu hỏi được xây dựng đa dạng, 
          bao phủ nhiều lĩnh vực học cơ bản, giúp người học ôn tập kiến thức một cách có hệ thống, 
          kiểm tra mức độ hiểu bài, rèn luyện tư duy và chuẩn bị hiệu quả cho các kỳ kiểm tra, 
          thi cử cũng như quá trình học tập lâu dài
        </Typography>
      </Box>
    </Box>
    <Box width={'97vw'} height={'40vh'} display={'flex'} flexDirection={'row'}
      justifyContent={'space-between'}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(to right,#ccccff, #fff)',
          p: 4, m: 1,
          borderRadius: '2px',
          alignItems: 'center',
        }}>
        <Box>
          <Typography component={'h5'} variant="h5">
            Cải thiện kiến thức của bạn
          </Typography>
          <Typography>
            Kiến thức không tự chui vào đầu bạn, nhưng chúng tôi có thể giúp nó “trượt” vào dễ hơn bao giờ hết.</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // backgroundColor: '#1c1cb1ff',
          background: 'linear-gradient(to right,#FFFFFF,#CCFFFF)',
          p: 4, m: 1,
          borderRadius: '2px',
          alignItems: 'center',
        }}>
        <Box>
          <Typography component={'h5'} variant="h5">
            Học hôm nay, khác biệt ngày mai.
          </Typography>
          <Typography>
            Kiến thức mở ra cánh cửa mà nỗ lực của bạn mới có thể bước qua.</Typography>
        </Box>
      </Box>
    </Box>
    <DialogStart open={openStartFree} handleClose={handleCloseStart} />
    <StartPractice open={openTest} handleClose={handleCloseTest} />
    {/* <ViewExamSubject open={openStartPractice} handleClose={handleClosePractice} code={codeSubject} /> */}
  </Box>
}