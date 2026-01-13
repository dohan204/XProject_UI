// import {email, z} from 'zod'
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
// const RegisterSchema = z.object({
//     userName: z.string().min(6, 'Tài Khoản ít nhất phải 6 ký tự')
//     .max(50, 'Tài khoản không được dài quá 50 ký tự.'),
//     fullName: z.string(),
//     password: z.string().min(8, 'Mật khẩu phải ít nhất 8 ký tự.').max(50, 'Mật khẩu không được vượt quá 50 ký tự.'),
//     email: z.string().min(1, 'Email không để trống').email('email Không hợp lệ.'),
//     phoneNumber: z.string(),
//     dateOfBirth: z.date(),
//     provinceId: z.number(),
//     w
// })