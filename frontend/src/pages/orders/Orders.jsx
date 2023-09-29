import { useNavigate } from 'react-router-dom';
import DisplayError from '../../components/general/error/DisplayError';
import LoadingOne from '../../components/general/loading_one/LoadingOne';
import Table from '../../components/general/table/Table';
import useApi from '../../custom_hooks/api';
import styles from './Orders.module.css';
import { useMemo } from 'react';
import Heading from '../../components/general/heading/heading';

export default function Orders(){

    const navigate = useNavigate()

    const [ orders, ordersError, ordersLoading ] = useApi(`${import.meta.env.VITE_API}/order/orders`)

    const values = useMemo(() => {
        return orders?.map((order) => [order.images?.[0], order.name, order.orderStatus, () => navigate(`/order-details?id=${order._id}`)])
    },[orders])


    return (
        <div className={styles.container}>
            <Heading heading={"Orders"} />
            {
                ordersLoading ? <LoadingOne style={{maxWidth: '50px', margin: 'auto'}} /> :
                ordersError ? <DisplayError error={"Something went wrong, try again"} /> :
                orders.length !== 0 ? <Table hasImage={true} headers={['image', 'name', 'status']} values={values} />
                : 'No orders yet'
            }
        </div>
    )
}