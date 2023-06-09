/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';

const UseRole = () => {
    const {axiosSecure} = UseAxiosSecure()
    const {user} = UseAuth()

    const { isLoading: isRoleLoading, error, reFetching, data:isRole } = useQuery({
        queryKey: ['isRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/get-role?email=${user?.email}`)
            return res.data.role
        },
        enabled: !!user?.email
    })

    return [isRole, isRoleLoading]
};

export default UseRole;