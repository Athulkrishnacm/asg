import { Navigate, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import './App.css'
import LoginBox from './components/fragments/login_box/LoginBox'
import LoginSignupWrapper from './pages/login_signup_wrapper/LoginSignupWrapper'
import SignupBox from './components/fragments/signup_box/SignupBox'
import LandingLoading from './components/fragments/landing_loading/LandingLoading'
import { useContext, useEffect, useState } from 'react'
import Header from './components/fragments/header/header'
import Home from './pages/home/home'
import ProductDetails from './pages/product_details/ProductDetails'
import Products from './pages/Products/Products'
import Sell from './pages/sell/Sell'
import DownloadAppPage from './pages/download_app/DownloadAppPage'
import axios from 'axios'
import useApi from './custom_hooks/api'
import UserContext from './context/user_context/UserContext'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/edit_profile/EditProfile'
import SellingHistory from './pages/selling_history/SellingHistory'
import ContactUs from './pages/contact_us/ContactUs'
import Settings from './pages/settings/Settings'
import LoadingOne from './components/general/loading_one/LoadingOne'
import DisplayError from './components/general/error/DisplayError'
import Orders from './pages/orders/Orders'

function App() {

  // const [ isLoading, setIsLoading ] = useState(true)

  // // useEffect(() => {
  // //   const timeout = setTimeout(() => {
  // //     setIsLoading(false)
  // //   }, 4000)

  // //   return () => {
  // //     clearTimeout(timeout)
  // //   }
  // // },[])

  const [ activePage, setActivePage ] = useState()
  const [ isloading, setIsLoading ] = useState(true)
  const location = useLocation()
  const { userData, setUserData } = useContext(UserContext)
  const [ vUserData, vUserDataError, vUserDataLoading ] = useApi(`${import.meta.env.VITE_API}/account/verify-user`)
  
  useEffect(() => {
    setActivePage(location.pathname.split('/')[1])
  },[location.pathname])

  useEffect(() => {
    setUserData(vUserData)
    if(!vUserDataLoading){
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  },[vUserDataLoading])

  useEffect(() => {
    const theme = localStorage.getItem("asgarage-theme")
    const root = document.querySelector(":root")
    if(theme === 'light'){
      root.style.setProperty('--background-color', '256, 256, 256');
      root.style.setProperty('--foreground-color', '0, 0, 0');
    }
  },[])

  return (
      isloading ? <LandingLoading /> :
      <>
        <Header activePage={activePage} />
        <Routes>
          <Route path='/login' element={ userData ? <Navigate to={'/home'} /> : <LoginSignupWrapper Component={<LoginBox />} active={'login'} />} />
          <Route path='/signup' element={ userData ? <Navigate to={'/home'} /> : <LoginSignupWrapper Component={<SignupBox />} active={'signup'} />} />
          <Route path='/products' element={ <Products /> } />
          <Route path='/product' element={ <ProductDetails />} />
          <Route path='/sell' element={ userData ? <Sell /> : <Navigate to={'/login'} /> } />
          <Route path='/app' element={ <DownloadAppPage />} />
          <Route path='/home' element={ <Home /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/edit-profile' element={ userData ? <EditProfile /> : <Navigate to={'/login'} />} />
          <Route path='/orders' element={userData ?<Orders /> : <Navigate to={'/login'} />} />
          <Route path='/selling-history' element={ userData ? <SellingHistory /> : <Navigate to={'/login'} />} />
          <Route path='/settings' element={ userData ? <Settings /> : <Navigate to={'/login'} />} />
          <Route path='/contact-us' element={ userData ? <ContactUs /> : <Navigate to={'/login'} />} />
          <Route path='*' element={<Navigate to={'/home'} />} />
        </Routes>
      </>
  )
}

export default App
