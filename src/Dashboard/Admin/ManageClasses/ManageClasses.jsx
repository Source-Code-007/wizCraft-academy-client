import bgImg from '../../../assets/img/signinBg.jpg'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { Slide } from 'react-awesome-reveal';
import { ToastContainer, toast } from 'react-toastify';
import FeedbackModal from './FeedbackModal';
import ManageClassesBtn from './ManageClassesBtn';
import { useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';


const ManageClasses = () => {
    const {axiosSecure} = UseAxiosSecure()
    const [currentClassId, setCurrentClassId] = useState(null)

    const { isLoading, data: allClasses, refetch, error } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get('http://localhost:3000/all-classes')
            return res.data
        }
    })

    // add feedback
    const addFeedbackFunc = (feedback) => {
        if (!feedback) {
            return
        }
        axiosSecure.put(`http://localhost:3000/admin/add-feedback/${currentClassId}`, { feedback })
            .then(res => {
                if (res.data.acknowledged) {
                    toast.success('Feedback added!', {
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
                    : <div className='my-container py-28 px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {
                            allClasses.map((classP, ind) => {
                                const { _id, instructorName, instructorEmail, className, classImg, status, availableSeats, feedback, price } = classP

                                return <div key={ind} className="card card-compact cmn-gradient-one shadow-xl text-slate-200 overflow-hidden">
                                    <figure><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body font-semibold text-lg relative !pt-10">
                                        <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                        <p>Instructor: {instructorName}</p>
                                        <p>Instructor email: {instructorEmail}</p>
                                        <p>Available seats: {availableSeats}</p>
                                        <p>Status: {status}</p>
                                        <p>Price: ${price}</p>
                                        <Slide direction='right' duration={2000}>
                                            <div className="card-actions justify-end">
                                                <ManageClassesBtn id={_id} refetch={refetch} status={status}></ManageClassesBtn>
                                                <button className={`cmn-btn-two ${(feedback || status==='approved' || status==='pending') && '!bg-[#063a92] !text-slate-300 !bg-opacity-50'}`} disabled={feedback || status==='approved' || status==='pending'} onClick={() => { window.my_modal_1.showModal(); setCurrentClassId(_id) }}>Feedback</button>
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
            <FeedbackModal addFeedbackFunc={addFeedbackFunc}></FeedbackModal>
        </div>
    );
};

export default ManageClasses;