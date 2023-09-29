import ButtonOne from '../../general/button_one/ButtonOne';
import InputOne from '../../general/input_one/InputOne';
import styles from './LoginBox.module.css';
import Line from '../../general/line/line';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../../context/user_context/UserContext';
import axiosInstance from '../../../axios/axiosInstance';

function LoginBox(){

    const [ emailOrMobile, setEmailOrMobile ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailOrMobileError, setEmailOrMobileError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('')
    const [ submitLoading, setSubmitLoading ] = useState(false)
    const { setUserData } = useContext(UserContext)

    const handleSubmit = () => {
        setSubmitLoading(true)
        const isValidated = validateInpus();
        if(isValidated){
            axiosInstance.post(`${import.meta.env.VITE_API}/account/login`,{
                emailOrMobile,
                password
            }).then((res) => {
                setUserData(res.data.data)
            }).catch((error) => {
                toast.error("Invalid credentials")
                const errors = error.response.data.error;
                if(Array.isArray(errors)){
                    console.log(errors)
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

    const handleErrors = ([field, error]) => {
        if(field === 'emailOrMobile') return setEmailOrMobileError(error)
        if(field === 'password') return setPasswordError(`password ${error}`)
    }

    return (
        <>
            <InputOne error={emailOrMobileError} value={emailOrMobile} onChange={handleEmailOrMobile} placeholder={'Email or Mobile'} />
            <InputOne error={passwordError} value={password} onChange={handlePassword} placeholder={'Password'} type={'password'} />
            <ButtonOne loading={submitLoading} type={'submit'} onClick={handleSubmit} >
                SUBMIT
            </ButtonOne>
            <div className={styles["forgot-password-text"]} >
                Forgot password ?
            </div>
            <Line />
            <ButtonOne type={'option'} >
                Login with OTP
            </ButtonOne>
            <ButtonOne type={'option'} >
                Continue with Google
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
        </>
    )
}

export default LoginBox;