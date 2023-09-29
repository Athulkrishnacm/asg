import { useNavigate } from 'react-router-dom';
import DisplayError from '../../components/general/error/DisplayError';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import Table from '../../components/general/table/Table';
import useApi from '../../custom_hooks/api';
import styles from './SellingHistory.module.css';
import { useMemo } from 'react';
import Heading from '../../components/general/heading/heading';

export default function SellingHistory(){

    const navigate = useNavigate()

    const [ sellings, sellingsError, sellingsLoading ] = useApi(`${import.meta.env.VITE_API}/product/added-products`)

    const values = useMemo(() => {
        return sellings?.map((purchase) => [purchase.images?.[0], purchase.name, purchase.adminStatus, () => navigate(`/selling-details?id=${purchase._id}`)])
    },[sellings])

    return (
        <div className={styles.container}>
            <Heading heading={"Selling History"} />
            {
                sellingsLoading ? <LoadingOne style={{maxWidth: '50px', margin: 'auto'}} /> :
                sellingsError ? <DisplayError error={"Something went wrong, try again"} /> :
                sellings.length !== 0 ? <Table hasImage={true} headers={['image', 'name', 'status']} values={values} /> :
                "No selling history"
            }
        </div>
    )
}