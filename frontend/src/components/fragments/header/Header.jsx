import { useContext, useEffect, useState } from 'react';
import Nav from '../../general/nav/nav';
import TyreScratch from '../../icons/tyre_scratch/TyreScratch';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/user_context/UserContext';
import { changeTheme } from '../../../pages/settings/Settings';

function Header({activePage}){

    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [ isShowingNavbar, setIsShowingNavbar ] = useState("none")

    const navBar = [
        ["home"],
        ["products","product"],
        ["sell"],
        ["app"],
        userData ? ["profile", "edit-profile", "orders", "selling-history", "settings", "contact-us"] : ["login","signup"]
    ]

    const navBarPosition = navBar.reduce((acc, curr, i) => curr.includes(activePage) ? i : acc, 0) * 100;
    const navBarPositionSmall = navBar.reduce((acc, curr, i) => curr.includes(activePage) ? i : acc, 0) * 50 + 75;

    const handleNavClick = (nav) => {
        setIsShowingNavbar(prev => prev === "show" ? "hide" : "none")
        navigate(`/${nav[0]}`)
    }

    return (
        <div className={styles.container} >
            <div className={styles.logo} onClick={changeTheme}>
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
                        <div className={`${styles['tyre-scratch-icon']} ${styles['tyre-scratch-icon-big']}`} style={{left: `${navBarPosition}px`}} >
                            <TyreScratch />
                        </div> 
                        <div className={`${styles['tyre-scratch-icon']} ${styles['tyre-scratch-icon-small']}`} style={{top: `${navBarPositionSmall}px`}}>
                            <TyreScratch />
                        </div>
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
            </div>
        </div>
    )
}

export default Header;
