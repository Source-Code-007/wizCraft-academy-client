/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const ActiveLink = ({to, children}) => {
    return (
        <NavLink to={to} className={({isActive})=> ` rounded-none text-slate-300 font-bold mx-1 ${isActive? 'border-b border-red-500' : ''}`}>{children}</NavLink>
    );
};

export default ActiveLink;