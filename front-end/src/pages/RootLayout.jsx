import {Outlet, useNavigation} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation/MainNavigation'; 
const RootLayout = () => { 
    const navigation = useNavigation();
    return (
        <>
            <MainNavigation/>
            <Outlet/>
        </>
    )
}

export default RootLayout;