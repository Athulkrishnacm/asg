import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/login/Login'
import { useContext, useEffect, useState } from 'react'
import AdminContext from './context/adminContext'
import Header from './components/fragments/header/Header'
import SubHeader from './components/fragments/sub_header/SubHeader'
import useApi from './custom_hooks/api'
import LoadingOne from './components/general/loading_one/LoadingOne'
import PageWrapper from './pages/page_wrapper/PageWrapper'
import ProductDetails from './pages/product_details/ProductDetails'

function App() {

  const [ vAdminData, vAdminDataError, vAdminDataLoading] = useApi(`${import.meta.env.VITE_API}/admin/verify-admin`)
  const { adminData, setAdminData } = useContext(AdminContext)
  const [ activePage, setActivePage ] = useState()

  useEffect(() => {
    if(!vAdminDataLoading){
      setAdminData(vAdminData)
    }
  }, [vAdminDataLoading])

  useEffect(() => {
    setActivePage(location.pathname.split('/')[1])
  },[location.pathname])

  return (
      vAdminDataLoading ? <LoadingOne style={{maxWidth: '50px', margin: 'auto', marginTop: '35vh'}} /> :
      <>
    {
      adminData ? <>
      <Header activePage={activePage} />
      </>
      :null
    }
    <Routes>
      <Route path='/login' element={ adminData ? <Navigate to={'/users'} /> : <Login />} />
      <Route path='/users' element={ adminData ? <PageWrapper page={'users'} headers={['id','name', 'status']} hasImage={false} /> : <Navigate to={'/login'} />} />
      <Route path='/products' element={ adminData ? <PageWrapper page={'products'} headers={['image', 'name', 'status']} hasImage={true} /> : <Navigate to={'/login'} />} />
      <Route path='/orders' element={ adminData ? <PageWrapper page={'orders'} headers={['image', 'name', 'status']} hasImage={true} /> : <Navigate to={'/login'} />} />
      <Route path='/products-details' element={ adminData ? <ProductDetails /> : <Navigate to={'/login'} />} />
      <Route path='*' element={ <Navigate to={'/users'} />} />
    </Routes>
  </>
  )
}

export default App
