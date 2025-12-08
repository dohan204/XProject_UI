import { Outlet } from "react-router-dom";
import styles from '../../css/authentication.module.css';
export default function AuthLayout(){
    return <div className={styles.mainLayout}>
        <Outlet />
    </div>
}