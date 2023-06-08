import { useQuery } from '@tanstack/react-query';
import bgImg from '../../assets/img/signinBg.jpg'
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const MyClasses = () => {


    const { isLoading: myClassesLoading, data: myClasses, refetch, } = useQuery({
        queryKey: ['myClasses'],
        queryFn: async () => {
            const result = await axios.get('http://localhost:3000/instructor/my-classes')
            return result.data
        }
    })




    return (
        <div className="min-h-screen bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            {
                myClassesLoading ? <div className="h-screen flex items-center justify-center">
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
                    />
                </div>
                    : <div className='my-container py-20 px-10 xl:px-5'>
                        <div className="!overflow-x-auto xl:w-full bg-slate-900 bg-opacity-50 text-slate-200">
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
                                            const { className, classImg, availableSeats, feedback, price, status } = myClass
                                            return <tr key={ind}>
                                                <td>{ind+1}</td>
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
                                                <td className='text-center'> 20 </td>
                                                <td className='text-center'>{status}</td>
                                                <td className='text-center'> {feedback? feedback : 'NA'} </td>
                                                <th className='text-end'>  <button className="cmn-btn-one"> <FaPen></FaPen></button>  </th>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }

        </div>
    );

};

export default MyClasses;