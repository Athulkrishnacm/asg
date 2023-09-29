import { useContext, useState } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import ButtonOne from '../../components/general/button_one/ButtonOne';
import styles from './Profile.module.css';
import UserContext from '../../context/user_context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile(){

    const { setUserData } = useContext(UserContext);
    const [ logoutLoading, setLogoutLoading ] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogoutLoading(true)
        axiosInstance.post(`${import.meta.env.VITE_API}/account/logout`).finally(() => {
            setUserData(null)
            setLogoutLoading(false);
            navigate('/login')
            localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
        })
    }

    return (
        <div className={styles.container}>
            <ButtonOne style={{maxWidth: '300px'}} type={'option'} onClick={() => navigate('/edit-profile')} >
                Edit Profile
            </ButtonOne>
            <ButtonOne style={{maxWidth: '300px'}} type={'option'} onClick={() => navigate('/orders')} >
                View Orders
            </ButtonOne>
            <ButtonOne style={{maxWidth: '300px'}} type={'option'} onClick={() => navigate('/selling-history')} >
                View Selling History
            </ButtonOne>
            <ButtonOne style={{maxWidth: '300px'}} type={'option'} onClick={() => navigate('/settings')} >
                Settings
            </ButtonOne>
            <ButtonOne style={{maxWidth: '300px'}} type={'option'} onClick={() => navigate('/contact-us')} >
                Contact us
            </ButtonOne>
            <ButtonOne loading={logoutLoading} style={{maxWidth: '300px'}} onClick={handleLogout} >
                Logout
            </ButtonOne>
        </div>
    )
}