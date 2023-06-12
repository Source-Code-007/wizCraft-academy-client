import DynamicTitle from '../HelpingComponent/DynamicTitle';
import FromTop from '../HelpingComponent/FromTop';
import Footer from '../Shared/Footer/Footer';
import Nav from '../Shared/Nav/Nav';
import { Outlet } from 'react-router-dom';

const LayoutOne = () => {
    return (
        <DynamicTitle>
            <FromTop>
                <Nav></Nav>
                <Outlet></Outlet>
                <Footer></Footer>
            </FromTop>
        </DynamicTitle>
    );
};

export default LayoutOne;