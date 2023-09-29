import { useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import ButtonOne from '../../components/general/button_one/ButtonOne';
import styles from './ContactUs.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs(){

    const [ message, setMessage ] = useState('')
    const [ sendLoading, setSendLoading ] = useState(false)

    const handleSend = () => {
        if(message.trim() === ''){
            return toast.error("message is required")
        }
        setSendLoading(true)
        axiosInstance.post(`${import.meta.env.VITE_API}/user/contact-us`, {
            message: message.trim()
        }).then(() => {
            toast.success("Message send successfully")
        }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setSendLoading(false)
        })
    }

    return (
        <div className={styles.container}>
            <textarea placeholder='Type here..' className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} />
            <ButtonOne loading={sendLoading} onClick={handleSend} >
                Send
            </ButtonOne>
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