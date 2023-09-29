import { useContext, useState } from 'react';
import styles from './EditProfile.module.css';
import UserContext from '../../context/user_context/UserContext';
import axiosInstance from '../../axios/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputOne from '../../components/general/input_one/InputOne';
import ButtonOne from '../../components/general/button_one/ButtonOne';
import { useNavigate } from 'react-router-dom';
import { CancelToken } from 'axios';

export default function EditProfile() {

    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate()

    const [ firstName, setFirstName ] = useState(userData.firstName);
    const [ lastName, setLastName ] = useState(userData.lastName);
    const [ mobile, setMobile ] = useState(userData.mobile);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ firstNameError, setFirstNameError ] = useState('');
    const [ lastNameError, setLastNameError ] = useState('');
    const [ mobileError, setMobileError ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('')
    const [ submitLoading, setSubmitLoading ] = useState(false)
    const [ isChangePassword, setIsChangePassword ] = useState(false)
    const cancelTokenSource = CancelToken.source()

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        setFirstNameError('')
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
        setLastNameError('')
    }

    const handleMobile = (e) => {
        setMobile(e.target.value)
        setMobileError('')
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
            axiosInstance.post(`${import.meta.env.VITE_API}/user/edit-profile`, {
                firstName,
                lastName,
                mobile,
                ...(isChangePassword ? { password } : {})
            },{
                cancelToken: cancelTokenSource.token
            }).then((response) => {
                toast.success("Profile updated successfully")
                setUserData(response.data.data);
            }).catch((error) => {
                toast.error("Invalid inputs")
                const errors = error?.response?.data?.error;
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
        if(password === '' && isChangePassword){
            isOkay = false;
            setPasswordError('password is required')
        }
        if(confirmPassword !== password && isChangePassword){
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
                case 'mobile': setMobileError(error);
                case 'password': setPasswordError(error);
            }
        })
    }

    const handleCancel = () => {
        cancelTokenSource.cancel("Request cancelled by user")
        navigate('/profile')
    }

    return (
        <div className={styles.container}>
            <InputOne error={firstNameError} value={firstName} onChange={handleFirstName} placeholder={'First Name'} />
            <InputOne error={lastNameError} value={lastName} onChange={handleLastName} placeholder={'Last Name'} />
            <InputOne error={mobileError} value={mobile} onChange={handleMobile} placeholder={'Mobile'} />
            {
                isChangePassword ? <>
                    <InputOne error={passwordError} value={password} onChange={handlePassword} placeholder={'New Password'} type={'password'} />
                    <InputOne style={isChangePassword ? {} : {display: 'none'}} error={confirmPasswordError} value={confirmPassword} onChange={handleConfirmPassword} placeholder={'Confirm Password'} type={'password'} />
                </> : null
            }
            <ButtonOne type={'option'} onClick={() => setIsChangePassword(prev => !prev)} >
                {isChangePassword ? 'Cancel password change' : 'Change Password'}
            </ButtonOne>
            <div className={styles["buttons-container"]}>
                <ButtonOne type={'cancel'} onClick={handleCancel}>
                    Cancel
                </ButtonOne>
                <ButtonOne loading={submitLoading} type={'submit'} onClick={handleSubmit} >
                    Save
                </ButtonOne>
            </div>
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