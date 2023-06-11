/* eslint-disable react/prop-types */
import { ThreeCircles } from "react-loader-spinner";
import UseRole from "../Hook/UseRole";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hook/UseAuth";

const AdminRoute = ({children}) => {
    const {user, authLoading} = UseAuth()
    const {signoutUserFunc} = UseAuth()
    const [ isRole, isRoleLoading ] = UseRole()
    const location = useLocation()

    if (authLoading || (user?.email && isRoleLoading)) {
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
    if(isRole!=='admin'){
        signoutUserFunc().then(()=>{}).catch(e=> console.log(e.message))
       return <Navigate to={'/signin'} state={{from: location}}></Navigate>
    }
    return children
};

export default AdminRoute;