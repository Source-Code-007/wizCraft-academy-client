import { useQuery } from '@tanstack/react-query';
import bgImg from '../../assets/img/signinBg.jpg'
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import UseAuth from '../../Hook/UseAuth';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
import UpdateClassModal from './UpdateClassModal';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MyClasses = () => {
    const { user } = UseAuth()
    const { axiosSecure } = UseAxiosSecure()
    const [forUpdateClass, setForUpdateClass] = useState('')


    const { isLoading: myClassesLoading, data: myClasses, refetch, } = useQuery({
        queryKey: ['myClasses'],
        queryFn: async () => {
            const result = await axiosSecure.get(`http://localhost:3000/instructor/my-classes?email=${user?.email}`)
            return result.data
        },
        enabled: !!user.email
    })


    // updateClassFunc
    const updateClassFunc = (e) => {
        const form = e.target
        const updatedClass = { className: form.className.value, price: parseInt(form.price.value), classImg: form.classImg.value }
        axiosSecure.patch(`/instructor/update-class/${forUpdateClass._id}`, { updatedClass })
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success('class updated!', {
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
        <div className="min-h-screen bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            {
                myClassesLoading ? <div className="h-screen flex items-center justify-center">
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
                    : !myClasses.length ? <div className="h-screen flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There are no class added!</h2></div>
                        : <div className='my-container py-20 px-10 xl:px-5'>
                            <div className="!overflow-x-auto xl:w-full bg-slate-900 bg-opacity-75 text-slate-200 rounded shadow-inner shadow-slate-600 py-8">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-slate-200'>
                                            <th>#</th>
                                            <th>Credential</th>
                                            <th className='text-center'>Total enrolled student</th>
                                            <th className='text-center'>status</th>
                                            <th className='text-center'>Feedback</th>
                                            <th className='text-end'>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {/* row 1 */}
                                        {
                                            myClasses.map((myClass, ind) => {
                                                const { _id, className, classImg, enrolledStudent, feedback, price, status } = myClass
                                                return <tr key={ind}>
                                                    <td>{ind + 1}</td>
                                                    <td>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={classImg} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{className}</div>
                                                                <div className="text-sm opacity-50">${price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'> {enrolledStudent} </td>
                                                    <td className='text-center'>{status}</td>
                                                    <td className='text-center'> {feedback ? feedback : 'N/A'} </td>
                                                    <th className='text-end'>  <button className="cmn-btn-one" onClick={() => { window.my_modal_1.showModal(); setForUpdateClass(myClass) }}><FaPen></FaPen></button>  </th>

                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
            }

            <UpdateClassModal updateClassFunc={updateClassFunc} forUpdateClass={forUpdateClass}></UpdateClassModal>
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

export default MyClasses;