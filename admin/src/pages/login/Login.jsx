import styles from './Login.module.css';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../axios/axiosInstance';
import AdminContext from '../../context/adminContext';
import ButtonOne from '../../../../frontend/src/components/general/button_one/ButtonOne';
import InputOne from '../../../../frontend/src/components/general/input_one/InputOne';

function Login(){

    const [ emailOrMobile, setEmailOrMobile ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailOrMobileError, setEmailOrMobileError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('')
    const [ submitLoading, setSubmitLoading ] = useState(false)
    const { setAdminData } = useContext(AdminContext)

    const handleSubmit = () => {
        setSubmitLoading(true)
        const isValidated = validateInpus();
        if(isValidated){
            axiosInstance.post(`${import.meta.env.VITE_API}/admin/login`,{
                emailOrMobile,
                password
            }).then((res) => {
                setAdminData(res.data.data)
            }).catch((error) => {
                toast.error("Invalid credentials")
                const errors = error.response.data.error;
                if(Array.isArray(errors)){
                    handleErrors(errors)
                }
            }).finally(() => {
                setSubmitLoading(false)
            })
        } else {
            setSubmitLoading(false)
        }
    }

    const handleEmailOrMobile = (e) => {
        setEmailOrMobile(e.target.value);
        setEmailOrMobileError('')
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError('')
    }

    const validateInpus = () => {
        let isOkay = true;
        if(emailOrMobile === ''){
            setEmailOrMobileError('email or mobile is required')
            isOkay = false
        }
        if(password === ''){
            setPasswordError('password is required')
            isOkay = false
        }
        return isOkay;
    }

    const handleErrors = (errors) => {
        errors.forEach(([field, error]) => {
            if(field === 'emailOrMobile') setEmailOrMobileError(`email or mobile ${error}`)
            if(field === 'password') setPasswordError(`password ${error}`)
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles['component-wrapper']}>
                <div className={styles["admin-login-text"]}>
                    ADMIN LOGIN
                </div>
            <InputOne error={emailOrMobileError} value={emailOrMobile} onChange={handleEmailOrMobile} placeholder={'Email or Mobile'} />
            <InputOne error={passwordError} value={password} onChange={handlePassword} placeholder={'Password'} type={'password'} />
            <ButtonOne loading={submitLoading} type={'submit'} onClick={handleSubmit} >
                SUBMIT
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
        </div>
    )
}

export default Login;