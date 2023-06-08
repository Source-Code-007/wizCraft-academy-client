import React from 'react';
import bgImg from '../../../assets/img/signinBg.jpg'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

const ManageClasses = () => {

    const { isLoading, data: instructorClasses, refetching, error } = useQuery({
        queryKey: ['instructorClasses'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/instructor/my-classes')
            return res.data
        }
    })

    console.log(instructorClasses);

    return (
        <div className='min-h-screen bg-center bg-cover bg-slate-900 bg-blend-overlay' style={{ backgroundImage: `url(${bgImg})` }}>
            {
                isLoading ? <div className="h-screen flex items-center justify-center">
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
                    : <div className='my-container py-20 grid grid-cols-3 gap-5'>
                        {
                            instructorClasses.map((instructorClass, ind) => {
                                const { instructorName, instructorEmail, className, classImg, status, availableSeats, price } = instructorClass

                                return <div key={ind} className="card card-compact cmn-gradient-one shadow-xl text-slate-200">
                                    <figure><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{className}</h2>
                                        <p>{instructorName}</p>
                                        <p>{instructorEmail}</p>
                                        <p>{availableSeats}</p>
                                        <p>{status}</p>
                                        <div className="card-actions justify-end">
                                            <button className="cmn-btn-two">Approve</button>
                                            <button className="cmn-btn-two">Deny</button>
                                            <button className="cmn-btn-two">Feedback</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }


        </div>
    );
};

export default ManageClasses;