export interface RegisterDto {
    userName: string
    fullName: string,
    password: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: Date | null,
    provinceId: number,
    wardsCommuneId: number
}
