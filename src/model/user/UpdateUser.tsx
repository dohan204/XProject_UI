export interface UpdateUser {
    userName: string,
    fullName: string,
    email: string,
    gender: Gender
    phoneNumber: string,
    dateOfBirth: Date | null,
    provinceId: number,
    wardId: number
}
export type Gender = 'Male' | 'Female' | 'Other'