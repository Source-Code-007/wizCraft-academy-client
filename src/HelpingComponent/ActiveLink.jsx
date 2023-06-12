/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const ActiveLink = ({to, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> ` rounded-none text-slate-200 font-bold mx-1 ${isActive? 'border-b border-[#e74c3c]' : ''}`}>{children}</NavLink>
    );
};

export default ActiveLink;