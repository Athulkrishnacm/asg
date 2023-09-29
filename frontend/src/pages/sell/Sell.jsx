import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonDropdown from '../../components/general/button-dropdown/ButtonDropdown';
import InputOne from '../../components/general/input_one/InputOne';
import styles from './Sell.module.css';
import InputFile from '../../components/general/input_file/InputFile';
import ButtonOne from '../../components/general/button_one/ButtonOne';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

export default function Sell() {

    const categories = [
        'bike',
        'part',
        'accessory',
        'other'
    ]

    const [ category, setCategory ] = useState('');
    const [ categoryError, setCategoryError ] = useState('')
    const [ description, setDescription ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ name, setName ] = useState('');
    const [ nameError, setNameError ] = useState('')
    const [ actualPrice, setActualPrice ] = useState('');
    const [ actualPriceError, setActualPriceError ] = useState('')
    const [ sellingPrice, setSellingPrice ] = useState('');
    const [ sellingPriceError, setSellingPriceError ] = useState('')
    const [ contents, setContents ] = useState([]);
    const [ images, setImages ] = useState([]);
    const [ imagesError, setImagesError ] = useState([])
    const [ submitLoading, setSubmitLoading ] = useState(false);
    const navigate = useNavigate()

    const handleName = (e) => {
        if(e.target.value.trim().length <= 16){
            setName(e.target.value)
        }
        setNameError('')
    }

    const handleDescription = (e) => {
        if(e.target.value.trim().length <= 100){
            setDescription(e.target.value)
        }
        setDescriptionError('')
    }

    const handleActualPrice = (e) => {
        const actualPrice = e.target.value !== '' ? parseInt(e.target.value) : ''
        if(isNaN(actualPrice) && actualPrice !== ''){
            return setActualPriceError('Must be a number')
        }
        setActualPrice(actualPrice)
        setActualPriceError('')
    }

    const handleSellingPrice = (e) => {
        const sellingPrice = e.target.value !== '' ? parseInt(e.target.value) : ''
        if(isNaN(sellingPrice) && sellingPrice !== ''){
            return setSellingPriceError('Must be a number')
        }
        setSellingPrice(sellingPrice)
        setSellingPriceError('')
    }

    const handleImages = (e, i) => {
        if(e.target.files && e.target.files[0]){
            setImages(prev => {
                prev[i] = e.target.files[0];
                return [...prev]
            })
            setImagesError(prev => {
                prev[i] = ''
                return [...prev]
            })
        }
    }

    const handleNewField = () => {
        let isOkay = true;
        contents.forEach(({field, value}, i) => {
            if(field === ''){
                setContents(prev => {
                    prev[i].fieldError = "field is required";
                    return [...prev]
                })
                isOkay = false;
            }
            if(value === ''){
                setContents(prev => {
                    prev[i].valueError = "value is required";
                    return [...prev]
                })
                isOkay = false;
            }
        })
        if(isOkay){
            setContents((prev) => [...prev, {field: '', value: ''}])
        }
    }

    const handleField = (e, i) => {
        setContents(prev => {
            prev[i].field = e.target.value;
            delete prev[i].fieldError;
            return [...prev]
        })
    }

    const handleValue = (e, i) => {
        setContents(prev => {
            prev[i].value = e.target.value;
            delete prev[i].valueError;
            return [...prev]
        })
    }

    const handleSubmit = () => {
        setSubmitLoading(true)
        const isValidated = validateInputs();
        if(isValidated){
            const formData = new FormData()
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("actualPrice", actualPrice);
            formData.append("sellingPrice", sellingPrice);
            images.forEach((image) => formData.append("images", image))
            formData.append("contents", JSON.stringify(contents))
            axiosInstance.post(`${import.meta.env.VITE_API}/product/add-product`,formData)
            .then((response) => {
                toast.dismiss()
                toast.success("Successfully added")
                clearInputs()
            }).catch((error) => {
                const errors = error.response.data.error;
                if(Array.isArray(errors)){
                    toast.error("Invalid inputs")
                    handleErrors(errors)
                } else {
                    console.log(error)
                    toast.error("Something went wrong")
                }
            }).finally(() => {
                setSubmitLoading(false)
            });
        } else {
            setSubmitLoading(false);
            toast.dismiss()
            toast.error("Invalid inputs")
        }
    }

    const validateInputs = () => {
        let isOkay = true;
        if(category === ''){
            setCategoryError("category is required")
            isOkay = false
        }
        if(name.trim() === ''){
            setNameError("product name is required")
            isOkay = false
        }
        if(description.trim() === ''){
            setDescriptionError("description is required")
            isOkay = false
        }
        if(actualPrice === '' || actualPrice === 0){
            setActualPriceError("actual price is required")
            isOkay = false
        }
        if(sellingPrice === '' || sellingPrice === 0){
            setSellingPriceError("selling price is required")
            isOkay = false
        } else if(sellingPrice > actualPrice){
            setSellingPriceError("must be less than actual price")
            isOkay = false
        }
        for(let i = 0; i < 4; i++){
            if(images[i] === undefined){
                setImagesError(prev => {
                    prev[i] = 'select image'
                    return [...prev]
                })
                isOkay = false;
            }
        }
        contents.forEach(({field, value}, i) => {
            if(field === ''){
                setContents(prev => {
                    prev[i].fieldError = "field is required";
                    return [...prev]
                })
                isOkay = false;
            }
            if(value === ''){
                setContents(prev => {
                    prev[i].valueError = "value is required";
                    return [...prev]
                })
                isOkay = false;
            }
        })
        if(isOkay){
            return true;
        }
        return false;
    }

    
    const handleErrors = (errors) => {
        errors.forEach(error => {
            switch(error[0]){
                case 'name': setNameError(`product name ${error[1]}`);
                case 'description': setDescriptionError(`description ${error[1]}`);
                case 'actualPrice': setActualPriceError(`actual price ${error[1]}`);
                case 'sellingPrice': setSellingPriceError(`selling price ${error[1]}`);
                case 'category': setCategoryError(`category ${error[1]}`)
                case 'contents': {
                    if(Array.isArray(error[1])){
                        error[1].forEach((error) => {
                            setContents(prev => {
                                if(error.field){
                                    prev[error.index].fieldError = error.field
                                }
                                if(error.value){
                                    prev[error.index].valueError = error.value
                                }
                                return [...prev]
                            })
                        })
                    }
                }
                case 'images': {
                    if(Array.isArray(error[1])){
                        error[1].forEach((error) => {
                            setImagesError(prev => {
                                prev[error.index] = error.error
                                return [...prev]
                            })
                        })
                    }
                }
            }
        })
    }

    const clearInputs = () => {
        setCategory('');
        setDescription('');
        setName('');
        setActualPrice('');
        setSellingPrice('');
        setContents([]);
        setImages([]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <ButtonDropdown error={categoryError} defaultValue={'Category'} setState={setCategory} dropdowns={categories} />
                <InputOne error={nameError} value={name} onChange={handleName} placeholder='Product Name' />
                <InputOne error={descriptionError} value={description} onChange={handleDescription} placeholder='Description' />
                <InputOne error={actualPriceError} value={actualPrice} onChange={handleActualPrice} placeholder='Actual Price' />
                <InputOne error={sellingPriceError} value={sellingPrice} onChange={handleSellingPrice} placeholder='Selling Price' />
                <div className={styles["images-wrapper"]}>
                    <div className={styles["heading"]}>
                        Upload Images
                    </div>
                    <div className={styles["images-input-wrapper"]}>
                        <InputFile error={imagesError[0]} id={'sell-image-0'} imageSrc={images[0] ? URL.createObjectURL(images[0]) : null} onChange={(e) => handleImages(e, 0)} />
                        <InputFile error={imagesError[1]} id={'sell-image-1'} imageSrc={images[1] ? URL.createObjectURL(images[1]) : null} onChange={(e) => handleImages(e, 1)} />
                        <InputFile error={imagesError[2]} id={'sell-image-2'} imageSrc={images[2] ? URL.createObjectURL(images[2]) : null} onChange={(e) => handleImages(e, 2)} />
                        <InputFile error={imagesError[3]} id={'sell-image-3'} imageSrc={images[3] ? URL.createObjectURL(images[3]) : null} onChange={(e) => handleImages(e, 3)} />
                    </div>
                </div>
                <div className={styles["contents-wrapper"]} style={contents.length === 0 ? {display: 'none'} : {}}>
                {
                    contents.map(({field, value, fieldError, valueError}, i) => {
                        return (
                            <div key={i} className={styles["field-value"]}>
                                <InputOne error={fieldError} value={field} onChange={(e) => handleField(e, i)} placeholder="Field" />
                                <InputOne error={valueError} value={value} onChange={(e) => handleValue(e, i)} placeholder="Value" />
                            </div>
                        )
                    })
                }
                </div>
                <ButtonOne onClick={handleNewField} style={{width: 'fit-content'}} type={'cancel'} >
                    Add new Field
                </ButtonOne>
                <div className={styles['buttons-wrapper']}>
                    <ButtonOne type={'option'} onClick={() => navigate(-1)} >
                        Cancel
                    </ButtonOne>
                    <ButtonOne loading={submitLoading} onClick={handleSubmit}>
                        Submit
                    </ButtonOne>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
        </div>
    )
}