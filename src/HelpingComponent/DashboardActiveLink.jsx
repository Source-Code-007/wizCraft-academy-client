import { NavLink } from 'react-router-dom';

const DashboardActiveLink = ({to, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> ` rounded-none text-slate-300 font-bold mx-1 ${isActive? 'border-l border-red-500 bg-red-500 bg-opacity-20 !text-red-500' : ''}`}>{children}</NavLink>
    );
};

export default DashboardActiveLink;