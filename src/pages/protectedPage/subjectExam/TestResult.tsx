import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { PieChart } from '@mui/x-charts'
import { da } from 'date-fns/locale';
export const valueFormatter = (item: { value: number }) => `${item.value}%`;
interface DisplayCorrect {
  isCorrectAnswer: number | undefined,
  score: number | undefined
}
interface DisplayWrong {
  isWrong: number | undefined,
  score: number | undefined
}
export default function TestResult() {
  // const data = localStorage.getItem('resultExam')
  // const result = JSON.stringify(data)
  const result2 = JSON.parse(localStorage.getItem('resultExam') ?? '{}');
  const resultCorrect: DisplayCorrect = {
    isCorrectAnswer: result2?.correctAnswers,
    score: result2?.score
  }
  const resultWrong: DisplayWrong = {
    isWrong: result2?.wrongAnswers,
    score: result2?.score
  }
  const dataDisplay = [
    {
      id: 0,
      value: result2?.correctAnswers,
      label: 'Đúng',
      color: '#36d236ff'
    },
    {
      id: 1,
      value: result2?.wrongAnswers,
      label: 'Sai',
      color: '#ed6e6eff'
    }
  ];

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'row'} >
      <Box width={'100px'} height={'170px'} p={1}>
        <Button color='primary' size='small' variant='contained' sx={{
          alignContent: 'center',
        }}>
          Xem Lại bài thi
        </Button>
      </Box>
      <Box height={'auto'} width={'90%'} p={1} display={'flex'} justifyContent={'center'}>
        <Box width={'400px'} height={'auto'} display={'flex'} alignItems={'center'}
          justifyContent={'center'} flexDirection={'column'}>
          <Typography sx={{ fontSize: '39px' }}>Tổng số câu hỏi: {result2.totalQuestions}</Typography>
          <Typography sx={{fontSize: '30px'}}>Số điểm bạn đạt được: {result2.score}</Typography>
          <Typography fontSize={'25px'} color='success'>Số câu đúng: {result2.correctAnswers}
          </Typography>
          <Typography fontSize={'25px'} color='error'>
            Số câu sai:  {result2.wrongAnswers}
          </Typography>
          <PieChart
            series={[
              {
                data: dataDisplay,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                valueFormatter,
              },
            ]}
            height={200}
            width={200}
          />
          <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Button variant='contained' color='info'>Thi lại</Button>
            <Button variant='contained' color='success'>Quay về trang chủ</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
