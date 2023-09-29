import styles from './Search.module.css';

export default function Search({value, onChange, placeholder}){
    return (
        <input placeholder={placeholder ?? 'Search..'} className={styles.input} value={value} onChange={onChange} />
    )
}