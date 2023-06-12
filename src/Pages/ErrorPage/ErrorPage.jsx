import { Link } from 'react-router-dom';
import errorPageBg from '../../assets/img/ErrorPageBG.jpg'
const ErrorPage = () => {
    return (
        <div className='h-screen bg-center bg-cover relative' style={{backgroundImage: `url(${errorPageBg})`}}>
           <Link to='/'> <button className="cmn-btn-one absolute right-20 bottom-5">Go to Home page</button></Link>
        </div>
    );
};

export default ErrorPage;