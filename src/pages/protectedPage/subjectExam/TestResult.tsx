import { Box, Button, Typography } from '@mui/material';
// import React from 'react'
// import { da } from 'date-fns/locale';
// import { PieChart } from '@mui/x-charts'
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
export const valueFormatter = (item: { value: number }) => `${item.value}%`;
export default function TestResult() {
  const navigate = useNavigate();
  const location = useLocation();
  // const {user} = useAuth();
  const currentPage = location.pathname.endsWith('/result');
  
  if(!currentPage){
    sessionStorage.removeItem('resultExam')
    sessionStorage.removeItem('indexQuestion')
    sessionStorage.removeItem('exam')
    sessionStorage.removeItem('timeTest')
  }
  const handlePrevRouter = () => {
    navigate(-1);
    sessionStorage.removeItem('resultExam')
    sessionStorage.removeItem('indexQuestion')
    sessionStorage.removeItem('exam')
    sessionStorage.removeItem('timeTest')
  }
  const handleNextPageHome = () => {
    navigate('/')
    sessionStorage.removeItem('resultExam')
    sessionStorage.removeItem('indexQuestion')
    sessionStorage.removeItem('exam')
    sessionStorage.removeItem('timeTest')
  }
  const result2 = JSON.parse(sessionStorage.getItem('resultExam') ?? '{}');
  // const dataDisplay = [
  //   {
  //     id: 0,
  //     value: result2?.correctAnswers,
  //     label: 'Đúng',
  //     color: '#36d236ff'
  //   },
  //   {
  //     id: 1,
  //     value: result2?.wrongAnswers,
  //     label: 'Sai',
  //     color: '#ed6e6eff'
  //   }
  // ];

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'row'} >
      <Box height={'auto'} width={'90%'} p={1} display={'flex'} justifyContent={'center'} >
        <Box width={'450px'} height={'auto'} display={'flex'} alignItems={'center'}
          justifyContent={'center'} flexDirection={'column'}>
          <Typography sx={{ fontSize: '39px' }}>Tổng số câu hỏi: {result2.totalQuestions}</Typography>
          <Typography sx={{fontSize: '30px'}}>Số điểm bạn đạt được: {(result2.score).toFixed(2)}</Typography>
          <Typography fontSize={'25px'} color='success'>Số câu đúng: {result2.correctAnswers}
          </Typography>
          <Typography fontSize={'25px'} color='error'>
            Số câu sai:  {result2.wrongAnswers}
          </Typography>
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'} m={1} p={1}>
            <Button variant='contained' color='info' onClick={handlePrevRouter}>Thi lại</Button>
            <Button variant='contained' color='success' onClick={handleNextPageHome}>Quay về trang chủ</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
