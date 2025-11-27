import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../pages/publicPage/Footer";
export default function MainLayout() {
    return <div style={{
        display: 'flex' ,
        flexDirection: 'column',
        overflowX: 'hidden',
        width: '98vw' 
    }}>
        <NavBar />
        <main style={{width: '100%', marginTop: '64px'}}>
            <Outlet />
        </main>
        <footer style={{padding: 10}}>
            <Footer />
        </footer>
    </div>
}
