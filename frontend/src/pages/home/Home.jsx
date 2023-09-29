import { useNavigate } from 'react-router-dom';
import Banner from '../../components/fragments/banner/Banner';
import Footer from '../../components/fragments/footer/Footer';
import Header from '../../components/fragments/header/header';
import CategoryCard from '../../components/general/category_card/CategoryCard';
import Heading from '../../components/general/heading/heading';
import Login from '../login_signup_wrapper/LoginSignupWrapper';
import styles from './home.module.css';

function Home(){

    const navigate = useNavigate();

    const categories = [
        'bikes',
        'accessories',
        'parts',
        'others'
    ]

    return (
        <>
            <Banner onButtonClick={() => navigate('/products')} heading={'One place, Everything for your bike.'} buttonText={'Try it now!'} imageSrc={'images/banner.png'} subHeading={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.'} />
            <div className={styles['categories-section']}>
                <Heading heading={'CATEGORIES'} />
                <div className={styles['categories-wrapper']}>
                    {
                        categories.map((category) => {
                            return <CategoryCard key={category} title={category} imageSrc={`images/categories/${category}.png`} />
                        })
                    }
                </div>
            </div>
            <Banner onButtonClick={() => navigate('/sell')} heading={'Have something to sell ?'} buttonText={'Sell Now'} imageSrc={'images/banner-two.png'} subHeading={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.'} />
            <Footer />
        </>
    )
}

export default Home;