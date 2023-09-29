import { useNavigate } from 'react-router-dom';
import styles from './CategoryCard.module.css';

function CategoryCard({title, imageSrc}){

    const navigate = useNavigate()
    return (
        <div className={styles.container} onClick={() => navigate(`/products?filter=${title}`)}>
            <div className={styles.image} style={{backgroundImage: imageSrc ? `url(${imageSrc})` : '#'}}></div>
            <div className={styles.title}>
                {title?.toUpperCase()}
            </div>
        </div>
    )
}

export default CategoryCard;