import { useState } from 'react'
import AdminContext from './adminContext';

export default function AdminProvider({children}) {
    const [ adminData, setAdminData ] = useState();

    return <AdminContext.Provider value={{adminData, setAdminData}}>
        {children}
    </AdminContext.Provider>
}