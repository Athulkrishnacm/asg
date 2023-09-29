import styles from './InputOne.module.css';

function InputOne({error,...props}){

    return (
        <div className={styles.container}>
            <input className={styles.input} {...props} style={error ? {outline: '1px solid red'} : {}} />
            {
                error ?
                    <div className={styles.error}>
                        {error}
                    </div>
                : null
            }
        </div>
    )
}

export default InputOne;