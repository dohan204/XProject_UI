import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Question, ExamDetails } from '../../../model/apiResponse/ExamDetails'
import axios from 'axios'
import type { Props } from '../../../model/props/Home'
import TimeDown from '../../protectedPage/subjectExam/TimeDown'
import { useNavigate } from 'react-router-dom'
import DialogConfirm from './DialogConfirm'

type ChoiceValue = Record<number, string>

export default function TestFree({ openTest }: Props) {
  const getInitialState = (key: string, defaultValue: any) => {
    const value = sessionStorage.getItem(key)
    if (!value) return defaultValue
    try {
      return JSON.parse(value)
    } catch {
      return defaultValue
    }
  }

  const navigate = useNavigate()
  const inputRef = useRef<HTMLButtonElement>(null)

  const [exam, setExam] = useState<ExamDetails | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    getInitialState('index', 0)
  )
  const [selectedValue, setSelectedValue] = useState<ChoiceValue>(
    getInitialState('answer', {})
  )
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0)
  const [timeTests, setTimeTests] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get<ExamDetails>(
        'https://api.testx.space/api/Exam/randomExam'
      )
      const result = res.data

      setExam(result)
      setQuestions(result.question || [])
      setNumberOfQuestion(result.numberOfQuestions)
      setTimeTests(result.timeTest)
      setId(result.id)

      sessionStorage.setItem('saveExam', JSON.stringify(result))
      sessionStorage.setItem('timeTest', JSON.stringify(result.timeTest))
      setCurrentQuestionIndex(0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const savedExam = sessionStorage.getItem('saveExam')
    if (savedExam) {
      const exam = JSON.parse(savedExam)
      setExam(exam)
      setQuestions(exam.question || [])
      setNumberOfQuestion(exam.numberOfQuestions)
      setTimeTests(Number(sessionStorage.getItem('timeTest')))
      setId(exam.id)

      const savedIndex = sessionStorage.getItem('index')
      const savedAnswer = sessionStorage.getItem('answer')

      if (savedIndex) setCurrentQuestionIndex(+savedIndex)
      if (savedAnswer) setSelectedValue(JSON.parse(savedAnswer))
      return
    }

    fetchData()
  }, [openTest, fetchData])

  useEffect(() => {
    sessionStorage.setItem('index', currentQuestionIndex.toString())
    sessionStorage.setItem('answer', JSON.stringify(selectedValue))
  }, [currentQuestionIndex, selectedValue])

  const currentQuestion = questions[currentQuestionIndex]

  const handleSelect = (id: number, value: string) => {
    setSelectedValue(prev => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(i => i - 1)
    }
  }

  const handleSubmit = () => {
    localStorage.setItem('examTestFree', JSON.stringify(selectedValue))
    setOpenDialog(true)
  }

  if (loading) return <Alert>Đang tải dữ liệu...</Alert>
  if (!currentQuestion) return <Alert severity="info">Không có câu hỏi</Alert>

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* ===== HEADER ===== */}
      <Box
        component={Paper}
        elevation={2}
        px={3}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Quay lại
          </Button>

          <Typography variant="h6">
            {exam?.name}
          </Typography>

          <Typography color="text.secondary">
            Số câu: {numberOfQuestion}
          </Typography>
        </Box>

        <Typography variant="h5" color="error">
          <TimeDown time={timeTests} />
        </Typography>
      </Box>

      {/* ===== CONTENT ===== */}
      <Box flex={1} display="flex" gap={2} p={2}>
        {/* ==== QUESTION ==== */}
        <Box flex={3} component={Paper} p={3}>
          <Typography variant="h6" gutterBottom>
            Câu {currentQuestionIndex + 1}
          </Typography>

          <Typography mb={3}>
            {currentQuestion.content}
          </Typography>

          <FormControl>
            <RadioGroup>
              {(['A', 'B', 'C', 'D'] as const).map(k => {
                const value = currentQuestion[`option${k}`]
                return (
                  <FormControlLabel
                    key={k}
                    value={value}
                    control={<Radio />}
                    label={value}
                    checked={selectedValue[currentQuestion.id] === value}
                    onChange={() =>
                      handleSelect(currentQuestion.id, value)
                    }
                  />
                )
              })}
            </RadioGroup>
          </FormControl>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              disabled={currentQuestionIndex === 0}
              onClick={handlePrev}
            >
              Câu trước
            </Button>

            <Box>
              <Button
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Câu sau
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                ref={inputRef}
              >
                Nộp bài
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ==== GUIDE ==== */}
        <Box flex={1}>
          <Card>
            <CardHeader title="Hướng dẫn làm bài" />
            <CardContent>
              <Typography>1. Chọn đáp án</Typography>
              <Typography>2. Dùng Next / Prev</Typography>
              <Typography>3. Không reload trang</Typography>
              <Typography>4. Bấm Nộp bài khi xong</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <DialogConfirm
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        id={id}
      />
    </Box>
  )
}
