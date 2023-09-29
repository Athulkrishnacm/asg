import ButtonOne from '../../components/general/button_one/ButtonOne';
import styles from './Settings.module.css';

export default function Settings(){

    return (
        <div className={styles.container}>
            <ButtonOne onClick={changeTheme} type={'option'}>
                Change theme
            </ButtonOne>
        </div>
    )
}

export const changeTheme = () => {
    const root = document.querySelector(":root");
    const theme = localStorage.getItem("asgarage-theme");
    const white = "256, 256, 256";
    const black = "0, 0 ,0"
    if(!theme || theme === 'dark'){
        root.style.setProperty('--background-color', white);
        root.style.setProperty('--foreground-color', black)
        localStorage.setItem("asgarage-theme", "light")
    } else {
        root.style.setProperty('--background-color', black);
        root.style.setProperty('--foreground-color', white)
        localStorage.setItem("asgarage-theme", "dark")
    }
}