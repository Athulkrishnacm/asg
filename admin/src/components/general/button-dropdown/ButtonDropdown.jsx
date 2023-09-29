import { useEffect, useState } from 'react';
import styles from './ButtonDropdown.module.css';

export default function ButtonDropdown({defaultValue, dropdowns, setState, error, dropdownPosition}) {

    const [ value, setValue ] = useState(defaultValue);
    const [ isDropdownVisible, setIsDropdownVisible ] = useState(false)
    const [ errorValue, setErrorValue ] = useState(error)

    const handleChange = (dropdown) => {
        setState(dropdown);
        setValue(dropdown);
        setErrorValue('')
    }

    useEffect(() => {
        setErrorValue(error)
    },[error])

    return (
        <div className={styles.container} style={errorValue ? {outline: '1px solid red'} : {}} onClick={() => setIsDropdownVisible(prev => !prev)}>
            <div className={styles.content} style={errorValue ? {color: 'red', fontWeight: 'lighter'} : {}}>
                {
                    errorValue ? errorValue : value
                }
            </div>
            <div className={styles.arrow}>
            </div>
            {
                isDropdownVisible ?
                <div className={styles["dropdowns-wrapper"]} style={dropdownPosition === 'left' ? {left: 0} : {right:0}}>
                {
                    dropdowns.map((dropdown) => <div key={dropdown} className={styles.dropdown} onClick={() => handleChange(dropdown)} >{dropdown}</div>)
                }
                <div className={styles.close}>
                    x
                </div>
                </div> : null
            }
        </div>
    )
}