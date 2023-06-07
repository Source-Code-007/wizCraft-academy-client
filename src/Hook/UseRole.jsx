import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UseAuth from './UseAuth';

const UseRole = () => {
    const {user, authLoading} = UseAuth()
    const { isLoading: isRoleLoading, error, reFetching, data: isRole } = useQuery({
        queryKey: ['isRole', user?.email],
        queryFn: async () => {
            const res = await axios(`http://localhost:3000/users-role?email=${user?.email}`).then(res => console.log(res.data))
            return res.data
        },
        enabled: !!user?.email
    })
    console.log(isRole);

    return [isRole, isRoleLoading]
};

export default UseRole;