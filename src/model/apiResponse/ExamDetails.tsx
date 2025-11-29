export interface ExamDetails {
    id: number, 
    name: string, 
    subjectName: string,
    numberOfQuestions: number,
    timeTest: number ,
    question: Question[]
}
export interface Question {
    id: number,
    content: string,
    answer: string,
    optionA: string,
    optionB: string,
    optionC: string, 
    optionD: string
}
export interface Exam {
    id: number,
    examName: string,
    testingTime: number,
    numberOfQuestion: number,
    subjectName: string,
}