import styles from './Line.module.css';

function Line(props){
    return (
        <div {...props} className={styles.line} />
    )
}

export default Line;