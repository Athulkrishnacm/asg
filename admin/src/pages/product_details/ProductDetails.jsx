import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useSearchParams } from 'react-router-dom';
import useApi from '../../custom_hooks/api';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import DisplayError from '../../components/general/error/DisplayError';
import ButtonOne from '../../../../frontend/src/components/general/button_one/ButtonOne';
import axiosInstance from '../../axios/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {

    const [ params ] = useSearchParams();
    const productId = params.get("id");
    const [ acceptLoading, setAcceptLoading ] = useState(false)
    const [ rejectLoading, setRejectLoading ] = useState(false)
    const [ data, dataError, dataLoading ] = useApi(`${import.meta.env.VITE_API}/admin/product-details?productId=${productId}`, [acceptLoading, rejectLoading]);
    const [ mainImage, setMainImage ] = useState(0);
    const [ showImage, setShowImage ] = useState(false);

    const handleAccept = () => {
        setAcceptLoading(true)
        axiosInstance.put(`${import.meta.env.VITE_API}/admin/accept-product?productId=${productId}`).then((res) => {
            toast.success("Product Accepted successfully")
        }).catch((error) => {
            toast.error("Something went wrong")
        }).finally(() => {
            setAcceptLoading(false)
        })
    }

    const handleReject = () => {
        setRejectLoading(true)
        axiosInstance.put(`${import.meta.env.VITE_API}/admin/reject-product?productId=${productId}`).then((res) => {
            toast.success("Product Rejected successfully")
        }).catch((error) => {
            toast.error("Something went wrong")
        }).finally(() => {
            setRejectLoading(false)
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
                        {
                            data?.adminStatus === 'pending' ?
                            <div className={styles["buttons-wrapper"]}>
                                <ButtonOne loading={rejectLoading} onClick={handleReject} type={'cancel'}>
                                    Reject
                                </ButtonOne>
                                <ButtonOne loading={acceptLoading} onClick={handleAccept}>
                                    Accept
                                </ButtonOne>
                            </div> :
                            data?.adminStatus === 'accepted' ?
                            <div className={styles["buttons-wrapper"]}>
                                <ButtonOne type={'option'}>
                                    accepted
                                </ButtonOne>
                            </div> :
                            data?.adminStatus === 'rejected' ?
                            <div className={styles["buttons-wrapper"]}>
                                <ButtonOne type={'option'}>
                                    Rejected
                                </ButtonOne>
                            </div> : null

                        }
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