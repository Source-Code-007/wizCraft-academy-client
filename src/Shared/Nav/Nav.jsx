import { useEffect, useState } from "react";
import ActiveLink from "../../HelpingComponent/ActiveLink"
import { Link } from "react-router-dom";
import logo from '../../assets/img/magicianLogo.png'
import UseAuth from "../../Hook/UseAuth";
import { ThreeCircles } from "react-loader-spinner";

const Nav = () => {
    const [isTop, setIsTop] = useState(true);
    const { user, authLoading, signoutUserFunc } = UseAuth()
    const [theme, setTheme] = useState(false)


    //theme toggle
    useEffect(() => {
        document.body.style.background = theme ? 'linear-gradient(to right, #e0eafc, #cfdef3)' : 'linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )';
        document.body.style.color = theme ? '#000' : '#fff';
      }, [theme]);

    // handleSignoutFunc
    const handleSignoutFunc = () => {
        signoutUserFunc().then(() => console.log('signout user')).catch(e => console.log(e.message))
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToTop = window.pageYOffset < 200;
            setIsTop(scrolledToTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menu =
        <>

            <li><ActiveLink to={'/'}>Home</ActiveLink></li>
            <li><ActiveLink to={'/instructors'}>Instructors</ActiveLink></li>
            <li><ActiveLink to={'/classes'}>Classes</ActiveLink></li>
            {user?.email && <li><ActiveLink to={'/dashboard-home'}>Dashboard</ActiveLink></li>}

        </>

    return (



        <nav className={`navbar px-8 bg-slate-900 transition duration-500 shadow ${isTop ? 'bg-opacity-25' : 'bg-opacity-90'} fixed z-50`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-slate-800 bg-opacity-75 mt-3 p-2 shadow space-y-5 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <a className="text-2xl font-bold cursor-pointer text-white flex items-center gap-2"><img className="w-12 h-12" src={logo} alt="" /> WizCraft</a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">

                <div className="form-control mx-5 bottom-5 ">
                    <label className="cursor-pointer label justify-center gap-2">
                        {/* <span className="label-text !text-white">Toogle theme</span> */}
                        <input type="checkbox" className="toggle toggle-primary" onChange={(e) => setTheme(e.target.checked)} />
                    </label>
                </div>

                {
                    authLoading ? <ThreeCircles
                        height="55"
                        width="55"
                        color="#e74c3c"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    /> : user ? <>
                        <Link><img className="h-12 w-12 rounded-full mx-2" src={user.photoURL} alt="" /></Link>
                        <button onClick={handleSignoutFunc} className='cmn-btn-two'>Signout</button>
                    </> : <Link to={'/signin'}><button className="cmn-btn-two">Signin</button></Link>
                }
            </div>
        </nav>
    );
};

export default Nav;