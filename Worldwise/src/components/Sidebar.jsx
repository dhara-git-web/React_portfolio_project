import styles from"./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function Sidebar() {
    return (
        <div className={styles.Sidebar}>
<Logo />
<AppNav />
<Outlet></Outlet>
<footer className={styles.footer}>
     <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} By WorldWise Inc.
     </p></footer>
            
        </div>
    );
}

export default Sidebar;
