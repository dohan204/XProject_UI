import React from 'react'

export default function TestResult() {
    const dataExam = localStorage.getItem('exam');
    console.log('du lieu duoc lay tu localStorage',dataExam)
  return (
    <div>TestResult</div>
  )
}
