import { useEffect } from "react";
import UseAxiosSecure from "../Hook/UseAxiosSecure";

const DashboardHome = () => {
    const {axiosSecure} = UseAxiosSecure()

    useEffect(()=>{
        axiosSecure('/test-jwt').then(res=> console.log(res)).catch(e=> console.log(e.message))
    }, [axiosSecure])

    return (
        <div>
            This is dashboard home
        </div>
    );
};

export default DashboardHome;