import { useNavigate, useSearchParams } from 'react-router-dom';
import SubHeader from '../../components/fragments/sub_header/SubHeader';
import Card from '../../components/general/card/card';
import DisplayError from '../../components/general/error/DisplayError.jsx';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import useApi from '../../custom_hooks/api';
import styles from './Products.module.css';
import { useState } from 'react';

function Products() {

    const [ params ] = useSearchParams()
    const [ sort, setSort ] = useState('');
    const [ filter, setFilter ] = useState(params.get('filter') ?? "");
    const [ search, setSearch ] = useState('');

    const [ products, productsError, productsLoading ] = useApi(`${import.meta.env.VITE_API}/product/products?sort=${sort}&filter=${filter}&search=${search}`, [sort, filter, search]);
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <SubHeader onSortChange={(e) => setSort(e)} onFilterChange={(f) => setFilter(f)} onSearchChange={(s) => setSearch(s)} />
            {
                productsLoading ? <LoadingOne style={{margin: 'auto', marginTop: '20vh', width: '50px'}} /> :
                productsError ? <DisplayError error={'Something went wrong'} /> :
                products?.length ? (
                    <div className={styles['cards-wrapper']}>
                    {
                        products?.map((product) => <Card data={product} key={product._id} onClick={() => navigate(`/product?productId=${product._id}`)} />)
                    }
                    </div>) : 'No data to show'
            }


        </div>
    )
}

export default Products;