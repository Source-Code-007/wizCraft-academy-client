/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UseAuth from './UseAuth';

const UseRole = () => {
    const {user, authLoading} = UseAuth()
    console.log(8, authLoading);
    const { isLoading: isRoleLoading, error, reFetching, data:isRole } = useQuery({
        queryKey: ['isRole', user?.email],
        queryFn: async () => {
            const res = await axios(`http://localhost:3000/get-role?email=${user?.email}`)
            return res.data.role
        },
        enabled: !!user?.email
    })

    return [isRole, isRoleLoading]
};

export default UseRole;