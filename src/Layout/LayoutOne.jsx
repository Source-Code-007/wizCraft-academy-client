import DynamicTitle from '../HelpingComponent/DynamicTitle';
import FromTop from '../HelpingComponent/FromTop';
import GoToTop from '../HelpingComponent/GoToTop';
import Footer from '../Shared/Footer/Footer';
import Nav from '../Shared/Nav/Nav';
import { Outlet } from 'react-router-dom';

const LayoutOne = () => {
    return (
        <div className='overflow-hidden'>
            <DynamicTitle>
            <FromTop>
                <Nav></Nav>
                <Outlet></Outlet>
                <Footer></Footer>
                <GoToTop></GoToTop>
            </FromTop>
        </DynamicTitle>
        </div>
    );
};

export default LayoutOne;