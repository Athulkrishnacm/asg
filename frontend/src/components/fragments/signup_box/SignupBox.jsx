import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonOne from '../../general/button_one/ButtonOne';
import InputOne from '../../general/input_one/InputOne';
import Line from '../../general/line/line';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/user_context/UserContext';
import axiosInstance from '../../../axios/axiosInstance';

function SignupBox(){

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ firstNameError, setFirstNameError ] = useState('');
    const [ lastNameError, setLastNameError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('')
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('')
    const [ submitLoading, setSubmitLoading ] = useState(false)

    const { setUserData } = useContext(UserContext)

    const navigate = useNavigate();

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        setFirstNameError('')
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
        setLastNameError('')
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailError('')
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setPasswordError('')
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        setConfirmPasswordError('')
    }

    const handleSubmit = () => {
        setSubmitLoading(true)
        const isValidated = validateInputs();
        if(isValidated){
            axiosInstance.post(`${import.meta.env.VITE_API}/account/signup`, {
                firstName,
                lastName,
                email,
                password
            }).then((response) => {
                setUserData(response.data.data);
            }).catch((error) => {
                toast.error("Invalid inputs")
                const errors = error.response.data.error;
                if(Array.isArray(errors)){
                    handleErrors(errors)
                }
            }).finally(() => {
                setSubmitLoading(false)
            })
        } else {
            toast.error("Invalid inputs")
            setSubmitLoading(false)
        }
    }

    const validateInputs = () => {
        let isOkay = true;
        if(firstName === ''){
            isOkay = false;
            setFirstNameError('first name is required')
        }
        if(email === ''){
            isOkay = false;
            setEmailError('email is required')
        }
        if(password === ''){
            isOkay = false;
            setPasswordError('password is required')
        }
        if(confirmPassword !== password){
            isOkay = false;
            setConfirmPasswordError("password doesn't match")
        }
        return isOkay;
    }

    const handleErrors = (errors) => {
        errors.forEach(([field, error]) => {
            switch(field){
                case 'firstName': setFirstNameError(error)
                case 'lastName': setLastNameError(error);
                case 'email': setEmailError(error);
                case 'password': setPasswordError(error);
            }
        })
    }

    return (
        <>
            <InputOne error={firstNameError} value={firstName} onChange={handleFirstName} placeholder={'First Name'} />
            <InputOne error={lastNameError} value={lastName} onChange={handleLastName} placeholder={'Last Name'} />
            <InputOne error={emailError} value={email} onChange={handleEmail} placeholder={'Email'} />
            <InputOne error={passwordError} value={password} onChange={handlePassword} placeholder={'Password'} type={'password'} />
            <InputOne error={confirmPasswordError} value={confirmPassword} onChange={handleConfirmPassword} placeholder={'Confirm Password'} type={'password'} />
            <ButtonOne loading={submitLoading} type={'submit'} onClick={handleSubmit} >
                SUBMIT
            </ButtonOne>
            <Line />
            <ButtonOne type={'option'} >
                Continue with Google
            </ButtonOne>
            <ButtonOne type={'option'} onClick={() => navigate('/login')} >
                Already have an account
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

export default SignupBox;