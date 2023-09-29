import { useState } from 'react';
import styles from './ProductDetails.module.css';
import { useSearchParams } from 'react-router-dom';
import useApi from '../../custom_hooks/api';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import DisplayError from '../../components/general/error/DisplayError';
import ButtonOne from '../../components/general/button_one/ButtonOne';
import axiosInstance from '../../axios/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WHATSAPP_NUMBERS } from '../../../whatsappNumbers';

export default function ProductDetails() {

    const [ params ] = useSearchParams();
    const productId = params.get("productId");
    const [ data, dataError, dataLoading ] = useApi(`${import.meta.env.VITE_API}/product/${productId}`);
    const [ mainImage, setMainImage ] = useState(0);
    const [ showImage, setShowImage ] = useState(false);
    const [ buyNowLoading, setBuyNowLoading ] = useState(false)

    const whatsappNumber = WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)]

    const handleBuyNow = () => {
        setBuyNowLoading(true);
        axiosInstance.post(`${import.meta.env.VITE_API}/order/add-order`, {
            productId
        }).then((response) => {
            window.open(`https://wa.me/${whatsappNumber}/?text=Hi%0AI%20want%20to%20enquire%20about%20a%20product%0Aname%20-%20${data.name}%0Aid%20-%20${data._id}`);
        }).catch((error) => {
            toast.error("Something went wrong")
        }).finally(() => {
            setBuyNowLoading(false);
        })
    }

    return(
        <div className={styles.container}>
            {
                dataLoading ? <LoadingOne style={{width: '50px', margin: 'auto', marginTop: '20vh'}} /> :
                dataError ? <DisplayError error={'Something went wrong'} /> :
                data ? (
                <div className={styles.card}>
                    <div className={styles["images-wrapper"]}>
                    {
                        data.images.map((image, i) => <div key={i} onClick={() => setMainImage(i)} className={`${styles.image} ${i === mainImage ? styles['active-image'] : ''}`} style={{backgroundImage: `url('${image}')`}} />)
                    }
                    </div>
                    <img className={styles["main-image"]} src={data.images?.[mainImage]} onClick={() => setShowImage(true)} />
                    <div className={styles["contents-wrapper"]}>
                        <div className={styles.name}>
                            {data.name}
                        </div>
                        <div className={styles.description}>
                            {data.description}
                        </div>
                        <div className={styles.contents}>
                        {
                            data.contents.map((content, i) => {
                                return(
                                    <div key={i} className={styles['field-value']}>
                                        <div className={styles.field}>
                                            {content.field}:
                                        </div>
                                        <div className={styles.value}>
                                            {content.value}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className={styles["price-wrapper"]}>
                            <div className={styles["selling-price"]}>
                                {data.sellingPrice}
                            </div>
                            <div className={styles["actual-price"]}>
                                {data.actualPrice}
                            </div>
                        </div>
                        <div className="buttons-wrapper">
                            <ButtonOne loading={buyNowLoading} onClick={handleBuyNow} >
                                BUY NOW
                            </ButtonOne>
                        </div>
                    </div>
                </div>) : 'No such product'
            }
            {
                showImage ?
                <div className={styles["show-image-wrapper"]} onClick={() => setShowImage(false)}>
                    <img className={styles["show-image"]} src={data?.images?.[mainImage]} />
                </div> : null
            }
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
        </div>
    )
}