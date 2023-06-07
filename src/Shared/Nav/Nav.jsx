import { useEffect, useState } from "react";
import ActiveLink from "../../HelpingComponent/ActiveLink"
import { Link } from "react-router-dom";
import logo from '../../assets/img/magicianLogo.png'

const Nav = () => {

    const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToTop = window.pageYOffset === 0;
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
            <li><ActiveLink to={'/about'}>About</ActiveLink></li>
        </>

    return (
        <nav className={`navbar bg-slate-900 transition duration-500 shadow ${isTop? 'bg-opacity-25' : 'bg-opacity-50'} fixed z-50`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
                <Link to={'/signin'}><button className="cmn-btn-two">Signin</button></Link>
            </div>
        </nav>
    );
};

export default Nav;