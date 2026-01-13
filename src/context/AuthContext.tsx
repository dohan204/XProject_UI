import { createContext, useContext, type ReactNode } from "react";
// import Logout from "../auth/Logout";
export interface UserInfo {
    aud: string,
    email: string,
    fullName: string
    exp: number,
    given_name: string,
    iat: number,
    iss: string,
    nbf: number,
    nameid: string
}

interface AuthContextType {
    user: UserInfo | null
    logout: () => void
}

// tao context 
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// custom hok de su dung context an taon 
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error('useAuth must be within an AuthProvider')
    return context
}

// provider component se duoc dung trong MainLayout
// authProvider nay chi nhan gia tri user tu MainLayout truyen vao

interface AuthProviderProps {
    children: ReactNode
    userInfo?: UserInfo | null,
}

export const AuthProvider = ({ children, userInfo }: AuthProviderProps) => {
    const logout = async () => {
        try {
            // Gọi API logout
            const response = await fetch('https://api.testx.space/Auth/auth_logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                console.error('Logout API failed');
            }

            // ⭐ Xóa display_token (giống nhau cho cả dev và prod)
            document.cookie = 'display_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None';
            // localStorage.removeItem('token')
            // localStorage.removeItem('tokenUser')
            // Reset user state
            // setUser(null);

            // Redirect về trang login
            window.location.href = '/';
        } catch (err) {
            console.error('Logout failed:', err);

            // Vẫn reset state và redirect dù có lỗi
            // setUser(null);
            window.location.href = '/';
        }
    }
    const value: AuthContextType = { user: userInfo!, logout };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}