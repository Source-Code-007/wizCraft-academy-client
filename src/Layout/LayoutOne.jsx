import { ThreeCircles } from 'react-loader-spinner';
import DynamicTitle from '../HelpingComponent/DynamicTitle';
import FromTop from '../HelpingComponent/FromTop';
import GoToTop from '../HelpingComponent/GoToTop';
import Footer from '../Shared/Footer/Footer';
import Nav from '../Shared/Nav/Nav';
import { Outlet } from 'react-router-dom';
import UseAuth from '../Hook/UseAuth';

const LayoutOne = () => {
    const { authLoading } = UseAuth()

    // Loading state
    if (authLoading) {
        return <div className="h-screen flex items-center justify-center">
            <ThreeCircles
                height="100"
                width="100"
                color="#e74c3c"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            /> </div>
    }

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