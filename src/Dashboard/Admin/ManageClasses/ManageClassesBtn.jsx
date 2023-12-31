/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const ManageClassesBtn = ({ id, status, refetch }) => {
    const {axiosSecure} = UseAxiosSecure()

    // handle Status Func
    const handleStatusFunc = (id, status) => {
        axiosSecure.patch(`/admin/class-status-manage/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    if (status === 'approve') {
                        toast.success('Class accepted!', {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    if (status === 'deny') {
                        toast.warning('Class denied!', {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    refetch()
                }
            })
            .catch(e => console.log(e.message))
    }

    return (
        <>
            <button disabled={status !== 'pending'} className={`cmn-btn-two ${status !== 'pending' && '!bg-[#063a92] !bg-opacity-50 !text-slate-300'}`} onClick={() => handleStatusFunc(id, 'approved')}>Approve</button>
            <button disabled={status !== 'pending'} className={`cmn-btn-two ${status !== 'pending' && '!bg-[#063a92] !bg-opacity-50 !text-slate-300'}`} onClick={() => handleStatusFunc(id, 'denied')}>Deny</button>
        </>
    );
};

export default ManageClassesBtn;