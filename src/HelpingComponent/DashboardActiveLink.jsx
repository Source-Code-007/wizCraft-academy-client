import { NavLink } from 'react-router-dom';

const DashboardActiveLink = ({to, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> ` rounded-none text-slate-300 font-bold mx-1 ${isActive? 'border-l border-[#e74c3c] bg-[#e74c3c] bg-opacity-20 !text-[#e74c3c]' : ''}`}>{children}</NavLink>
    );
};

export default DashboardActiveLink;