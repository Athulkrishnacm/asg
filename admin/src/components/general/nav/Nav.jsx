import styles from './nav.module.css';

function Nav({children, active, onClick}){
    return (
        <div className={`${styles.container} ${active ? styles.active : ''}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Nav;