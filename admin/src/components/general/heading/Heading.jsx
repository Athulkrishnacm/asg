import styles from './Heading.module.css';

function Heading({heading}){
    return (
        <div className={styles.container}>
            {heading}
        </div>
    )
}

export default Heading;