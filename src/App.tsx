import React from 'react'
import Login from './auth/login_register/Login'
import Register from './auth/login_register/Register'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './auth/login_register/AuthLayout'
import './App.css'
import ProtectedRoute from './layout/route/ProtectedRoute'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/publicPage/HomePage'
import NotFoundPage from './auth/NotFoundPage'
import About from './pages/publicPage/About'
import Feature from './pages/publicPage/Feature'
import News from './pages/publicPage/News'
import Tutorials from './pages/publicPage/Tutorials'
import Contact from './pages/publicPage/Contact'
import TestFree from './pages/publicPage/Homepage/TestFree'
import TestPage from './pages/protectedPage/subjectExam/TestPage'
import Exam from './pages/protectedPage/subjectExam/Exam'
import TestResult from './pages/protectedPage/subjectExam/TestResult'
// import ExamMsSql from './pages/protectedPage/subjectExam/ExamMsSql'
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />}>
        </Route>
        <Route path='/freetest' element={<TestFree openTest />} />
        <Route path='/about' element={<About />} />
        <Route path='/feature' element={<Feature />} />
        <Route path='/news' element={<News />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
      {/* public router */}
      <Route element={<AuthLayout />}>
        <Route element={<Login />} />
        <Route index path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      {/* protected router */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/test/:id" element={<TestPage />}>
            
          </Route>
          <Route path='/test/:id/result' element={<TestResult />} />
          <Route path="/subject/:code" element={<Exam />} />

          {/* <Route path="/subject/:code" element={<ExamMsSql />} /> */}
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
