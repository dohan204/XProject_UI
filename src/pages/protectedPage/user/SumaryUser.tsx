import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useFetchData } from "../../../customHook/useFetchData"
import { useAuth } from "../../../context/AuthContext"

interface Sumary {
  id: string
  maxScore: number
  countFavoriteExam: number
  countExamTest: number
}

export default function SumaryUser() {
  const { user } = useAuth()

  const {
    data: sumary,
    loading,
    error
  } = useFetchData<Sumary>(
    user?.nameid
      ? `https://api.testx.space/api/Exam/max-score?userID=${user.nameid}`
      : null
  )

  const sumaryUser = sumary
    ? [
        { title: 'Điểm thi cao nhất', value: sumary.maxScore },
        { title: 'Số đề yêu thích', value: sumary.countFavoriteExam },
        { title: 'Lịch sử số lần làm bài', value: sumary.countExamTest }
      ]
    : []

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    )
  }

  return (
    <Box display="flex" justifyContent="space-around" width={'100%'} m={1} >
      {sumaryUser.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: 250,
            height: 100,
            borderRadius: 2,
            boxShadow: '5px 5px 12px lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography fontWeight={600}>
            {item.title}
          </Typography>
          <Typography color="primary" variant="h6">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
