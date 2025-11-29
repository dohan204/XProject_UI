import { createContext, useContext, type ReactNode } from "react";
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
}

// tao context 
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// custom hok de su dung context an taon 
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined)
        throw new Error('useAuth must be within an AuthProvider')
    return context
}

// provider component se duoc dung trong MainLayout
// authProvider nay chi nhan gia tri user tu MainLayout truyen vao

interface AuthProviderProps {
    children: ReactNode
    userInfo: UserInfo | null,
}

export const AuthProvider = ({children, userInfo}: AuthProviderProps) => {
    const value = {user: userInfo};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}