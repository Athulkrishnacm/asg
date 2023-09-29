import DisplayError from '../../components/general/error/DisplayError';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import Table from '../../components/general/table/Table';
import useApi from '../../custom_hooks/api';
import styles from './PageWrapper.module.css';
import { useNavigate } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import Heading from '../../components/general/heading/heading';
import Search from '../../components/general/search/Search';
import SubHeader from '../../components/fragments/sub_header/SubHeader';

export default function PageWrapper({page, hasImage, headers}){

    const navigate = useNavigate()

    const [ search, setSearch ] = useState('')

    const [ datas, datasError, datasLoading ] = useApi(`${import.meta.env.VITE_API}/admin/${page}?search=${search}`, [page, search])

    const values = useMemo(() => {
        return datas?.map((data) => [page === 'users' ? data._id : data.images?.[0], page === 'users' ? data.firstName : data.name, page === 'products' ? data.adminStatus : page === 'orders' ? data.orderStatus : data.status, () => navigate(`/${page}-details?id=${data._id}`)])
    },[datas])

    const handleSearch = (search) => {
        setSearch(search)
    }

    return (
        <div className={styles.container}>
            <SubHeader onSearchChange={(search) => handleSearch(search)} />
            <Heading heading={page} />
            {
                datasLoading ? <LoadingOne style={{maxWidth: '50px', margin: 'auto'}} /> :
                datasError ? <DisplayError error={"Something went wrong, try again"} /> :
                datas.length !== 0 ? <Table hasImage={hasImage} headers={headers} values={values} /> :
                "No selling history"
            }
        </div>
    )

}