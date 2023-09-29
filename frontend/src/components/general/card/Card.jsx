import styles from './Card.module.css';

export default function Card({data, onClick}) {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.image} style={{backgroundImage: `url('${data.images[0]}')`}}></div>
            <div className={styles.name}>
                {data.name}
            </div>
            <div className={styles.description}>
                {data.description}
            </div>
            <div className={styles["price-wrapper"]}>
                <div className={styles['selling-price']}>
                    {data.sellingPrice}
                </div>
                <div className={styles['actual-price']}>
                    {data.actualPrice}
                </div>
            </div>
        </div>
    )
}