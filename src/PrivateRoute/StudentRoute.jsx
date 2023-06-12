/* eslint-disable react/prop-types */
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import UseRole from '../Hook/UseRole';
import UseAuth from '../Hook/UseAuth';

const StudentRoute = ({children}) => {
    const {user, authLoading} = UseAuth()
    const [ isRole, isRoleLoading ] = UseRole()
    const location = useLocation()

    if (authLoading ||  isRoleLoading) {
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
            />
        </div>
    }

    if(isRole!=='student'){
       return <Navigate to={'/signin'} state={{from: location}}></Navigate>
    }
    return children
};

export default StudentRoute;