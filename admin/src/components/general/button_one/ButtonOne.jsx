import styles from './ButtonOne.module.css';

function ButtonOne({children, type, loading, onClick, ...props}){
    return (
        <div className={`${styles.button} ${styles[type]}`} {...props} onClick={loading ? () => {} : onClick} >
            {children}
            {
                loading ?
                <div className={styles.loading}>
                    <div className={styles.loader}></div>
                </div> : null
            }
        </div>
    )
}

export default ButtonOne;