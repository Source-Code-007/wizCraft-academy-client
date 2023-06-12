/* eslint-disable no-unused-vars */
import bgImg from '../../../assets/img/signinBg.jpg'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { Slide } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';

const ManageUsers = () => {

    const { data: allUsers, refetch, error, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axios.get('https://wizcraft-academy-server.vercel.app/all-users')
            return res.data
        }
    })


    // handle make role by admin
    const handleMakeRoleFunc = (id, updatedRole) => {
        axios.patch(`https://wizcraft-academy-server.vercel.app/admin/make-role/${id}`, { updatedRole })
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success('Role Updated!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    refetch()
                }
            }).catch(e => console.log(e.message))

    }

    return (
        <div className='min-h-screen bg-center bg-cover bg-slate-900 bg-blend-overlay' style={{ backgroundImage: `url(${bgImg})` }}>
            {
                isLoading ? <div className="h-screen flex items-center justify-center">
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
                    /> </div>
                    : <div className='my-container py-28 px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-10'>
                        {
                            allUsers?.filter(user => user.role !== 'admin').map((user, ind) => {
                                const { _id, name, photo, role, email } = user

                                return <div key={ind} className="card card-compact cmn-gradient-one shadow-xl text-slate-200 overflow-hidden">
                                    <figure className='shadow'><img src={photo} alt={name} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body font-semibold text-lg relative !pt-10">
                                        <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{name}</h2>
                                        <p>Role: {role}</p>
                                        <p>Email: {email}</p>
                                        <Slide direction='right' duration={1000}>
                                            <div className="card-actions justify-end">
                                                {
                                                    role === 'student' ? <><button onClick={() => handleMakeRoleFunc(_id, 'instructor')} className={`cmn-btn-two`}>Make instructor</button>  <button onClick={() => handleMakeRoleFunc(_id, 'admin')} className={`cmn-btn-two`}>Make admin</button></> 
                                                    : role === 'instructor' ? <><button onClick={()=> handleMakeRoleFunc(_id, 'admin')} className={`cmn-btn-two`}>Make admin</button></> : ''
                                                }

                                            </div>
                                        </Slide>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default ManageUsers;