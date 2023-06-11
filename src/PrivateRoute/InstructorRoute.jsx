/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hook/UseAuth";
import UseRole from "../Hook/UseRole";
import { ThreeCircles } from "react-loader-spinner";


const InstructorRoute = ({children}) => {
    const {user, authLoading} = UseAuth()
    const {signoutUserFunc, setAuthLoading} = UseAuth()
    const [ isRole, isRoleLoading ] = UseRole()
    const location = useLocation()

    if (authLoading || isRoleLoading) {
        return <div className="h-screen flex items-center justify-center bg-[#063a92]">
            <ThreeCircles
                height="100"
                width="100"
                color="#02066f"
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

    if(isRole!=='instructor'){
        signoutUserFunc().then(()=>{}).catch(e=> {setAuthLoading(false)})
       return <Navigate to={'/signin'} state={{from: location}}></Navigate>
    }
    return children
};

export default InstructorRoute;