import styles from './InputFile.module.css';

export default function InputFile({onChange, imageSrc, id, error}) {
    return (
        <>
            <label htmlFor={id} className={styles.label} style={{backgroundImage: `url(${imageSrc ?? '#'})`, fontSize: imageSrc ? 0 : "", outline: error ? '1px solid red' : ''}}>
                {
                    error ? <span style={{fontSize: '12px', color: 'red'}}>{error}</span> : '+'
                }
            </label>
            <input onChange={onChange} type='file' id={id} className={styles.input} />
        </>
    )
}