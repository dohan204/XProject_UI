export interface props {
    id?: number
    open: boolean,
    code?: string,
    handleClose: () => void
}
export interface Exam {
    id: number
    title: string,
    subjectName: string,
    numberOfQuestion: number
}
