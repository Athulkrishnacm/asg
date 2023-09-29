import { useContext, useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../../context/adminContext';
import Nav from '../../general/nav/nav';
import axiosInstance from '../../../axios/axiosInstance';

export default function Header({activePage}){

    const navigate = useNavigate();
    const { setAdminData } = useContext(AdminContext)
    const [ isShowingNavbar, setIsShowingNavbar ] = useState("none")

    const navBar = [
        ["users"],
        ["products", "products-details"],
        ["orders", "orders-details"],
    ]

    const handleNavClick = (nav) => {
        setIsShowingNavbar(prev => prev === "show" ? "hide" : "none")
        navigate(`/${nav[0]}`)
    }

    const handleLogout = () => {
        axiosInstance.post(`${import.meta.env.VITE_API}/admin/logout`).finally(() => {
            setAdminData(null)
            navigate('/login')
            localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
        })
    }

    return (
        <div className={styles.container} >
            <div className={styles.logo}>
                <div className={styles['as-text']}>
                    AS
                </div>
                <div className={styles['garage-text']}>
                    GARAGE
                </div>
            </div>
            <div className={styles["nav-bar"]} style={isShowingNavbar === "show" ? {right: '0'} : isShowingNavbar === 'hide' ? {right: '-100%'} : {}}>
                {
                    activePage ?
                    <>
                        <div className={styles["navbar-before"]} onClick={() => setIsShowingNavbar("show")} />
                        <div className={styles["navbar-after"]} onClick={() => setIsShowingNavbar("hide")} >x</div>
                    </>
                    : null
                }
                {
                    navBar.map((nav) => {
                        return (
                            <Nav active={nav.includes(activePage)} key={nav[0]} onClick={() => handleNavClick(nav)} >
                                { nav[0].toUpperCase() }
                            </Nav>
                        )
                    })
                }
                <Nav onClick={handleLogout}>
                    LOGOUT
                </Nav>
            </div>
        </div>
    );
}