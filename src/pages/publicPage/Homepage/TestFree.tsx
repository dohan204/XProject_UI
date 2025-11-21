import { Alert, Box, Button, ButtonGroup, Card, CardContent, CardHeader, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { type Question, type ExamDetails } from '../../../model/apiResponse/ExamDetails';
import axios from 'axios';
import type { Props } from '../../../model/props/Home';

export default function TestFree({ openTest }: Props) {
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [exam, setExam] = useState<ExamDetails | null>(null)
  const [questions, setQuestions] = useState<Question[]>([]) // Đổi tên biến cho rõ ràng hơn
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // State mới: Theo dõi chỉ mục câu hỏi hiện tại

  const fetchData = useCallback(() => {
    const getRandomExamDetails = async () => {
      setLoading(true)
      try {
        const res = await axios.get<ExamDetails>('http://localhost:8089/api/Exam/randomExam');
        const result = res.data;
        console.log('đề thi: ', result)
        setExam(result)
        setQuestions(result ? result.question : [])
        setNumberOfQuestion(result.numberOfQuestions);
        setCurrentQuestionIndex(0); // Reset về câu hỏi đầu tiên khi tải đề thi mới
      } catch (err) {
        console.error('tải dữ liệu không thành công.');
      } finally {
        setLoading(false);
      }
    }
    getRandomExamDetails()
  }, [])

  useEffect(() => {
    fetchData()
  }, [openTest])

  // Hàm xử lý khi bấm nút "Next"
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Hàm xử lý khi bấm nút "Prev"
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Lấy câu hỏi hiện tại dựa trên index
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {loading ? <Alert>Đang tải dữ liệu</Alert> : (
        // Chỉ render giao diện nếu có câu hỏi
        currentQuestion ? ( 
          <Box display={'flex'} flexDirection={'column'} mb={4}>
            {/* --- Header: Thời gian làm bài --- */}
            <Box display={'flex'} width={'99vw'} height={'20vh'} justifyContent={'flex-end'} p={2}>
              <Box display={'flex'} width={'64%'} justifyContent={'space-around' }>
                <Box width={'32%'} height={'100%'} bgcolor={'lightblue'}
                  component={Paper}
                   display={'flex'} justifyContent={'center'} alignItems={'center'}
                >
                  <Typography component={'h5'} variant='h5'>
                    Môn: {exam?.name}
                  </Typography>
                </Box>
                <Box width={'32%'} height={'100%'} bgcolor={'lightblue'}
                  component={Paper}
                   display={'flex'} justifyContent={'center'} alignItems={'center'}
                >
                  <Typography component={'h5'} variant='h5'>
                    Ngày thi: {new Date().getMonth().toLocaleString()}
                  </Typography>
                </Box>
                <Box width={'32%'} height={'100%'} bgcolor={'lightblue'}
                  component={Paper}
                  display={'flex'} justifyContent={'center'} alignItems={'center'}
                >
                  <Typography component={'h5'} variant='h5'>
                    Số câu hỏi: {numberOfQuestion}
                  </Typography>
                </Box>
              </Box>
              <Box width={'34%'} height={'100%'} alignContent={'center'} justifyItems={'center'} component={Paper}>
                <Typography component={'h4'} variant='h4'>
                  Thời Gian làm bài: {exam?.timeTest}
                </Typography>
              </Box>
            </Box>

            {/* --- Khu vực chính: Câu hỏi và Hướng dẫn --- */}
            <Box width={'99vw'} height={'60vh'} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
              
              {/* --- Vùng hiển thị câu hỏi (Bên trái) --- */}
              <Box width={'62%'} height={'100%'} component={Paper}>
                {/* Thay vì dùng map, ta hiển thị đối tượng currentQuestion */}
                <Box key={currentQuestion.id} width={'100%'} height={'100%'}>
                  <Box pl={10} height={'25%'} width={'100%'} bgcolor={'lightblue'}
                    component={Paper}
                    display={'flex'} justifyContent={'center'} alignItems={'center'}
                  >
                    <Typography sx={{mr: 35}}>
                      Câu {currentQuestionIndex + 1}: {currentQuestion.content}
                    </Typography>
                  </Box>

                  <Box height={'75%'} width={'100%'} display={'flex'} flexDirection={'row'} >
                    <Box width={'20%'}></Box>
                    
                    <Box width={'80%'} display={'flex'} p={2} flexDirection={'column'}>
                      <FormControl>
                        {/* Thêm name cho RadioGroup để tránh warning */}
                        <RadioGroup name={`question-${currentQuestion.id}`}> 
                          <FormControlLabel value={currentQuestion.optionA} control={<Radio />} label={currentQuestion.optionA} />
                          <FormControlLabel value={currentQuestion.optionB} control={<Radio />} label={currentQuestion.optionB} />
                          <FormControlLabel value={currentQuestion.optionC} control={<Radio />} label={currentQuestion.optionC} />
                          <FormControlLabel value={currentQuestion.optionD} control={<Radio />} label={currentQuestion.optionD} />
                        </RadioGroup>
                      </FormControl>
                      
                      {/* --- Nút điều hướng (Prev/Next) --- */}
                      <Box p={4} display={'flex'} justifyContent={'flex-end'} >
                        <Box display={'flex'}>
                          <Button 
                            variant="contained" 
                            onClick={handlePrev} 
                            disabled={currentQuestionIndex === 0} // Vô hiệu hóa nút Prev ở câu đầu tiên
                          >
                            Prev
                          </Button>
                          <Typography sx={{mx: 2}}>
                            {/* Hiển thị số câu hiện tại / tổng số câu */}
                            {currentQuestionIndex + 1} / {questions.length}
                          </Typography>
                          <Button 
                            variant="contained" 
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1} // Vô hiệu hóa nút Next ở câu cuối
                          >
                            Next
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* --- Vùng hướng dẫn (Bên phải) --- */}
              <Box width={'32%'} height={'100%'}>
                <Card sx={{ width: '100%', height: '100%' }}>
                  <CardHeader sx={{mt: 1}} title="Hướng dẫn làm bài: ">
                  </CardHeader>
                  <CardContent sx={{p: 5}}>
                    <Typography sx={{mb: 2}}>
                      Trong quá trình làm bài thì không được reload lại trang nhé, vì đây là bài làm thử nên nó sẽ reset lại.
                    </Typography>
                    <Typography>
                      1. Chọn đáp án
                    </Typography>
                    <Typography>
                      2. Chuyển câu khác thì click Next
                    </Typography>
                    <Typography>
                      3. Quay lại bấm Prev
                    </Typography>
                    <Typography>
                      4. Sau khi hoàn thành bài thi hãy bấm nộp bài.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        ) : (
          // Hiển thị thông báo nếu không có câu hỏi nào được tải (sau khi loading xong)
          !loading && <Alert severity="info">Không tìm thấy câu hỏi nào cho đề thi này.</Alert>
        )
      )}
    </>
  )
}