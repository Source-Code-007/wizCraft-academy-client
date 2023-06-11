/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import bgImg from '../../../assets/img/signinBg.jpg'
import { Slide } from "react-awesome-reveal";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";

const SelectedClasses = () => {
    const { user } = UseAuth()
    const { axiosSecure } = UseAxiosSecure()
    const navigate = useNavigate()

    const { data: selectedClasses, isLoading: selectedClassesIsLoading, error, refetch } = useQuery({
        queryKey: ['mySelectedClasses'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-selected-classes?email=${user?.email}`)
            return result.data
        },
        enabled: !!user?.email
    })

    // handle delete class func
    const handleDeleteSelectedClass = (classId) => {
        
            Swal.fire({
                title: 'Are you sure?',
                text: "You never revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#02066f',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/delete-my-selected-classes?email=${user?.email}&&id=${classId}`)
                        .then(res => {
                            if (res.data.acknowledged) {
                                toast.success('Class deleted!', {
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
            })
    }


    // handlePayBtnFunc
    const handlePayBtnFunc= (classP)=>{
        navigate('/make-payment') 
        localStorage.setItem('payment-info', JSON.stringify(classP))
    }

    
    return (
        <div className='min-h-screen bg-center bg-cover bg-slate-900 bg-blend-overlay' style={{ backgroundImage: `url(${bgImg})` }}>
            {
                selectedClassesIsLoading ? <div className="h-screen flex items-center justify-center">
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
                    /> </div>
                    : !selectedClasses.length ? <div className="h-screen flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There is no selected classes!</h2></div>
                    : <div className='my-container py-28 px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {
                            selectedClasses.map((classP, ind) => {
                                const { _id, classImg, className, classId, instructorName, availableSeats, price } = classP

                                return <div key={ind} className={`card card-compact shadow-xl text-slate-200 overflow-hidden ${availableSeats === 0 ? 'bg-red-500 bg-opacity-50' : 'cmn-gradient-one'}`}>
                                    <figure className='shadow'><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body font-semibold text-lg relative !pt-10">
                                        <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                        <p>Instructor name: {instructorName}</p>
                                        <p>Available seats: {availableSeats}</p>
                                        <p>price: {price}</p>

                                        <div className="card-actions justify-end">
                                            <Slide direction='right' duration={1500}>
                                                <button onClick={() => handleDeleteSelectedClass(classId)} className={`cmn-btn-two w-fit flex items-center gap-3 my-3 }`}> <FaTrash></FaTrash> Delete</button>
                                            </Slide>
                                            <Slide direction='left' duration={1500}>
                                                <button onClick={()=>handlePayBtnFunc(classP)} className={`cmn-btn-two w-fit flex items-center gap-3 my-3 }`}> <FaDollarSign></FaDollarSign> Pay</button>
                                            </Slide>
                                        </div>

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

export default SelectedClasses;