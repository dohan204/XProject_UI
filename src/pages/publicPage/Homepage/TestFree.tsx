import { Alert, Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { type Question, type ExamDetails } from '../../../model/apiResponse/ExamDetails';
import axios from 'axios';
import type { Props } from '../../../model/props/Home';
import TimeDown from '../../protectedPage/subjectExam/TimeDown';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from './DialogConfirm';

type ChoiceValue = Record<number, string>
export default function TestFree({ openTest }: Props) {
  const getInitialState = (key: string, defaultValue: ChoiceValue | number): any => {
    const selectedValue = sessionStorage.getItem(key);
    if (selectedValue) {
      try {
        return JSON.parse(selectedValue);
      } catch (err) {
        return selectdValue;
      }
    }
    return defaultValue;
  }
  const inputRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [currentExam, setCurrentExam] = useState<boolean>(false);
  const [currentSelect, setCurrentSelect] = useState<number>(0);
  const [timeTests, setTimeTests] = useState<number>(0)
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0)
  const [selectdValue, setSelectedValue] = useState<ChoiceValue>(
    getInitialState( 'answer',{})
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [id, setId] = useState<number>(0);
  const [exam, setExam] = useState<ExamDetails | null>(null)
  const [questions, setQuestions] = useState<Question[]>([]) // Đổi tên biến cho rõ ràng hơn
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getInitialState('index', 0)); // State mới: Theo dõi chỉ mục câu hỏi hiện tại
  console.log(selectdValue)
  const handleOpen = () => {
    // tìm và xóa dữ liệu cũ đi 
    const valueLocal = localStorage.getItem('examTestFree')
    if (valueLocal?.length) {
      console.log('tìm thấy giá trị cũ, xóa nó trước')
      console.log(valueLocal)
      localStorage.removeItem('examTestFree');
    }

    // thêm dữ liệu mới vào 
    const valueSave = JSON.stringify(selectdValue)
    localStorage.setItem('examTestFree', valueSave)

    // mở đi dialog
    setOpenDialog(true)
  }

  const handleClose = () => setOpenDialog(false);
  const fetchData = useCallback(() => {
    const getRandomExamDetails = async () => {
      setLoading(true)
      try {
        const res = await axios.get<ExamDetails>('http://localhost:8089/api/Exam/randomExam');
        const result = res.data;
        console.log('đề thi: ', result)
        setExam(result)
        setId(result.id)
        sessionStorage.setItem('saveExam', JSON.stringify(result))
        sessionStorage.setItem('timeTest', JSON.stringify(result.timeTest));
        console.log('thoi gian thi: ', result.timeTest)
        setCurrentExam(true);
        const timeTest = sessionStorage.getItem('timeTest')
        if (timeTest) {
          setTimeTests(Number(timeTest))
        }
        // console.log('Thoi gian duoc luu voi gia tri: ', Number(timeTest))
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
    // sau moi lan load, kiem tra da co de thi hay chua, neu chua thi thuc hien call api, 
    // con khong thi lay ra de cu tu trong sessionStorage de dung
    const examSave = sessionStorage.getItem('saveExam');
    if (examSave) {
      const exam = JSON.parse(examSave);
      setExam(exam);
      setId(exam.id);
      setCurrentExam(true);
      const timeTest = sessionStorage.getItem('timeTest')
      if (timeTest) {
        setTimeTests(Number(timeTest))
      }
      // console.log('Thoi gian duoc luu voi gia tri: ', Number(timeTest))
      setQuestions(exam ? exam.question : [])
      setNumberOfQuestion(exam.numberOfQuestions);
      // lay ra vi tri cua cau dang lam

      const indexQuestion = sessionStorage.getItem('index')
      console.log(indexQuestion)
      if (indexQuestion) {
        setCurrentQuestionIndex(parseInt(indexQuestion, 10))
      }
      // lay du lieu da luu ra tu sessionStorage 
      const answerSelected = sessionStorage.getItem('answer')
      console.log(answerSelected)
      if (answerSelected) {
        setSelectedValue(JSON.parse(answerSelected))
      }
      return;
    }
    fetchData()
  }, [openTest])
  // window.addEventListener('load', () => {
  //   alert('hello anh em')
  // })
  // xu ly khi luu cac dap an
  // luu lai vi tri cua cau dang lam
  useEffect(() => {
    sessionStorage.setItem('index', currentQuestionIndex.toString())
    sessionStorage.setItem('answer', JSON.stringify(selectdValue))
  }, [selectdValue, currentQuestionIndex])
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
  const handleSelect = (id: number, value: string) => {
    setSelectedValue(prev => ({
      ...prev,
      [id]: value
    }))
  }
  // dau tien luu thoi gian bat dau vao session 
  // console.log('Thoi gian sau khi luu vao bien va duoc lay ra)', timeTests)
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
              <Box display={'flex'} width={'64%'} justifyContent={'space-around'}>
                <Box>
                  <Button onClick={() => navigate(-1)}>
                    Quay lai
                  </Button>
                </Box>
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
                  Thời Gian làm bài: {<TimeDown time={timeTests} />}
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
                    <Typography sx={{ mr: 35 }}>
                      Câu {currentQuestionIndex + 1}: {currentQuestion.content}
                    </Typography>
                  </Box>

                  <Box height={'75%'} width={'100%'} display={'flex'} flexDirection={'row'} >
                    <Box width={'20%'}></Box>

                    <Box width={'80%'} display={'flex'} p={2} flexDirection={'column'}>
                      <FormControl>
                        {/* Thêm name cho RadioGroup để tránh warning */}
                        <RadioGroup name={`question-${currentQuestion.id}`}>
                          <FormControlLabel value={currentQuestion.optionA} control={<Radio
                            checked={selectdValue[currentQuestion.id] === currentQuestion.optionA}
                            onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionA)}
                          />} label={currentQuestion.optionA} />
                          <FormControlLabel value={currentQuestion.optionB} control={<Radio
                            checked={selectdValue[currentQuestion.id] === currentQuestion.optionB}
                            onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionB)}
                          />} label={currentQuestion.optionB} />
                          <FormControlLabel value={currentQuestion.optionC} control={<Radio
                            checked={selectdValue[currentQuestion.id] === currentQuestion.optionC}
                            onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionC)}
                          />} label={currentQuestion.optionC} />
                          <FormControlLabel value={currentQuestion.optionD} control={<Radio
                            checked={selectdValue[currentQuestion.id] === currentQuestion.optionD}
                            onChange={() => handleSelect(currentQuestion.id, currentQuestion.optionD)}
                          />} label={currentQuestion.optionD} />
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
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1} // Vô hiệu hóa nút Next ở câu cuối
                          >
                            Next
                          </Button>
                          <Button onClick={handleOpen}
                            ref={inputRef}
                          >
                            Nộp bài
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
                  <CardHeader sx={{ mt: 1 }} title="Hướng dẫn làm bài: ">
                  </CardHeader>
                  <CardContent sx={{ p: 5 }}>
                    <Typography sx={{ mb: 2 }}>
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
      <DialogConfirm open={openDialog} handleClose={handleClose} id={id} />
    </>
  )
}