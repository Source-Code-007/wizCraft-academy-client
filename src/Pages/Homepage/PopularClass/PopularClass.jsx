/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";
import { Fade } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hook/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import UseRole from "../../../Hook/UseRole";

const PopularClass = () => {
    const { user, authLoading } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isRole, isRoleLoading] = UseRole()
    const { axiosSecure } = UseAxiosSecure()
    const [PopularClasses, setPopularClasses] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axiosSecure('/popular-classes')
            .then(res => { setPopularClasses(res.data); setIsLoading(false) })
    }, [axiosSecure])

    // all selected classes
    const { data: selectedClasses, isLoading: selectedClassesIsLoading, refetch, error } = useQuery({
        queryKey: ['selectedClasses'],
        queryFn: async () => {
            const result = await axiosSecure('/all-selected-classes')
            return result.data
        }
    })

    // handle select Class Func
    const handleSelectClassFunc = (classP) => {
        if (!user?.email) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You have to login for select this course!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, login!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin', { state: { from: location } })
                }
            })
            return
        }

        // store selected class in database
        axiosSecure.post(`/selected-classes?email=${user?.email}`, classP)
            .then(res => {
                if (res.data.acknowledged) {
                    toast.success('Class added!', {
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
            })
            .catch(e => console.log(e.message))
    }

    // already selected class for disable button
    const isAlreadySelectedClass = (id) => {
        const selectedClass = selectedClasses.find(classP => classP.classId === id)
        let isSelectedClass
        if (selectedClass) {
            isSelectedClass = selectedClass.selectBy.includes(user?.email)
        }
        return isSelectedClass
    }

    return (
        <div className='min-h-screen'>
            {
                (isLoading || authLoading || selectedClassesIsLoading || (user?.email && isRoleLoading)) ? <div className="h-[80vh] flex items-center justify-center">
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
                    : !PopularClasses.length ? <div className="h-[80vh] flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There are no popular classes right now!</h2></div>
                        : <div className='my-container py-28 '>
                            <CommonSectionTitle title={'Popular Classes'} subtitle={'Most wanted magic classes!'}></CommonSectionTitle>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 lg:px-5">
                                {
                                    PopularClasses.map((classP, ind) => {
                                        const { _id, classImg, className, instructorName, availableSeats, enrolledStudent, price } = classP

                                        return <Fade key={ind}>
                                            <div className={`card card-compact shadow-xl text-slate-200 overflow-hidden ${availableSeats === 0 ? 'bg-red-500 bg-opacity-50' : 'cmn-gradient-one'}`}>
                                                <figure className='shadow'><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                                <div className="card-body font-semibold text-lg relative !pt-10">
                                                    <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                                    <p>Instructor name: {instructorName}</p>
                                                    <p>Available seats: {availableSeats}</p>
                                                    <p>Enrolled students: {enrolledStudent}</p>
                                                    <p>price: ${price}</p>

                                                    <button disabled={availableSeats === 0 || isRole === 'admin' || isRole === 'instructor' || (selectedClasses?.length && isAlreadySelectedClass(_id))}
                                                        className={`cmn-btn-two w-fit flex items-center gap-3 my-3 ${(availableSeats === 0 || isRole === 'admin' || isRole === 'instructor' || (selectedClasses?.length && isAlreadySelectedClass(_id))) ? '!bg-[#063a92] !text-slate-300' : ''}`}
                                                        onClick={() => handleSelectClassFunc(classP)}>
                                                        <FaHeart></FaHeart> {(selectedClasses?.length && isAlreadySelectedClass(_id)) ? 'Already selected' : 'select'}
                                                    </button>

                                                </div>
                                            </div>
                                        </Fade>
                                    })
                                }
                            </div>
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

export default PopularClass;