import { useEffect, useState } from "react";
import { type UserInfo } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from "../context/AuthContext";
import NavBar from "./NavBar";
import Footer from "../pages/publicPage/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);  // ⭐ Thêm loading

    useEffect(() => {
        const handleAuth = async () => {
            try {
                let token: string | null = null;
                // 1. Kiểm tra cookie trước (external login)
                if (typeof cookieStore !== 'undefined') {
                    const cookie = await cookieStore.get('display_token');
                    token = cookie?.value || null;

                } else {
                    // Fallback cho browser cũ
                    const name = 'display_token';
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) {
                        token = parts.pop()?.split(';').shift() || null;
                    }
                }

                // 2. Nếu không có cookie, check localStorage (normal login)
                if (!token) {
                    token = localStorage.getItem('token');
                }

                // 3. Decode token nếu có
                if (token) {
                    const decoded = jwtDecode<UserInfo>(token);
                    setUserInfo(decoded);
                    localStorage.setItem('token', token)
                    console.log('User info:', decoded);
                } else {
                    setUserInfo(null);
                }

            } catch (error) {
                console.error('Auth error:', error);
                setUserInfo(null);
            } finally {
                setLoading(false);  // ⭐ Tắt loading
            }
        };

        handleAuth();
    }, []);

    // ⭐ Show loading khi đang check auth
    if (loading) {
        return <div>Loading...</div>;  // Hoặc component Spinner đẹp hơn
    }

    return (
        <AuthProvider userInfo={userInfo}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '97vw' }}>
                <NavBar />
                <main style={{
                    marginTop: '80px', display: "flex",
                    flexDirection: "column",
                    minHeight: "70vh",
                }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}