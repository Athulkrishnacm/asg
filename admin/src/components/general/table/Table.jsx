import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

export default function Table({headers, values, hasImage}){

    const width = `${100/headers.length}%`;

    return(
        <div className={styles.container}>
            <div className={styles.headers}>
            {
                headers.map((header) => <div key={header} style={{width}} className={styles.header}>{header}</div>)
            }
            </div>
            {
                values.map((value) => {
                    return (
                        <div key={value?._id} className={styles.row} onClick={value[headers.length] ? value[headers.length] : () => {}}>
                        {
                            value.filter((v, i) => i < headers.length).map((val, j) => <div key={`${value?._id}-${j+val}`} style={{width, backgroundImage: (hasImage && j===0) ? `url('${val}')` : ''}} className={`${styles.value} ${(hasImage && j===0) ? styles.imageValue : ''}`}>{val}</div>)
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}