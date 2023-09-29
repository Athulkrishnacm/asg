import ButtonOne from '../../components/general/button_one/ButtonOne';
import styles from './DownloadAppPage.module.css';

export default function DownloadAppPage(){

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <span>Are you a mobile user ? </span><br />
                Download the app now.
            </div>
            <div className={styles["buttons-wrapper"]}>
                <ButtonOne type={'option'}>
                    Install from App store
                </ButtonOne>
                <ButtonOne type={'option'}>
                    Install from Play store
                </ButtonOne>
            </div>
        </div>
    )
}