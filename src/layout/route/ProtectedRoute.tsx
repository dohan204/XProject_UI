import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute(){
    const { user } = useAuth();
    // const token = localStorage.getItem('token');
    console.log('user external: ',user)
    // ⭐ Chưa login → redirect về login
    if(!user) {
        return;
    }
    
    // ⭐ Đã login → render component
    return <Outlet />;
}