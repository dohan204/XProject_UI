import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../pages/publicPage/Footer";
import { jwtDecode } from "jwt-decode";
// import { createContext } from "react";
import { AuthProvider, type UserInfo } from "../context/AuthContext";
// const AuthenticationContext = createContext();
export default function MainLayout() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    let userInfo: UserInfo | null = null;
    if (!token) {
        console.log('token not found');
        return;
    }
    try {

        userInfo = jwtDecode<UserInfo>(token);
        console.log('thông tin người dùng từ token trả về', userInfo);
    } catch (err) {
        console.error('Failed to decode token or token is invalid: ', err)
        // neu token bi loi(het han, sai dinh dang), xoa token va dang xuat
        localStorage.removeItem('token')
        navigate('/login');
        return null
    }
    return (
        <AuthProvider userInfo={userInfo}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                width: '98vw'
            }}>
                <NavBar />
                <main style={{ width: '100%', marginTop: '64px' }}>
                    <Outlet />
                </main>
                <footer style={{ padding: 10 }}>
                    <Footer />
                </footer>
            </div>
        </AuthProvider>
    )
}
