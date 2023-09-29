import { useEffect, useState } from 'react';
import ButtonDropdown from '../../general/button-dropdown/ButtonDropdown';
import Search from '../../general/search/Search';
import styles from './SubHeader.module.css';

export default function SubHeader({onSortChange, onFilterChange, onSearchChange}) {

    const sorts = [
        'price-low',
        'price-high',
        'rating',
        'recent'
    ]

    const filters = [
        'bikes',
        'parts',
        'accessories'
    ]

    const [ sort, setSort ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        onSortChange?.(sort)
    }, [sort])

    useEffect(() => {
        onFilterChange?.(filter)
    }, [filter])

    return (
        <div className={styles.container}>
            {/* <ButtonDropdown dropdownPosition={'left'} defaultValue={'Sort'} setState={setSort} dropdowns={sorts} />
            <ButtonDropdown defaultValue={'Filter'} setState={setFilter} dropdowns={filters} /> */}
            <Search onChange={(e) => {onSearchChange?.(e.target.value)}} />
        </div>
    )
}