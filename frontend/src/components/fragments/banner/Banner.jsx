import styles from './Banner.module.css'
import ButtonOne from '../../general/button_one/ButtonOne'

function Banner({heading, subHeading, buttonText, imageSrc, onButtonClick}) {

  return (
    <div className={styles.container} style={{backgroundImage: imageSrc ? `url(${imageSrc})` : '#'}}>
        <div className={styles["text-wrapper"]}>
            <div className={styles.heading}>
                {heading}
            </div>
            <div className={styles['sub-heading']}>
                {subHeading}
            </div>
            <ButtonOne onClick={onButtonClick ?? (() => {})} style={{width: '200px'}}>
                {buttonText}
            </ButtonOne>
        </div>
    </div>
  )
}

export default Banner