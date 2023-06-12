import DynamicTitle from '../HelpingComponent/DynamicTitle';
import Footer from '../Shared/Footer/Footer';
import Nav from '../Shared/Nav/Nav';
import { Outlet } from 'react-router-dom';

const LayoutOne = () => {
    return (
            <DynamicTitle>
                <Nav></Nav>
                <Outlet></Outlet>
                <Footer></Footer>
            </DynamicTitle>
    );
};

export default LayoutOne;