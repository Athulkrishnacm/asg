import styles from './DisplayError.module.css';

export default function DisplayError({error}) {
    return (
        <div className={styles.container}>
            {error}
        </div>
    )
}