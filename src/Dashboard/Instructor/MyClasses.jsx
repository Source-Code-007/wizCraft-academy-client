import { useQuery } from '@tanstack/react-query';
import bgImg from '../../assets/img/signinBg.jpg'
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import UseAuth from '../../Hook/UseAuth';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';

const MyClasses = () => {
    const { user } = UseAuth()
    const {axiosSecure} = UseAxiosSecure()


    const { isLoading: myClassesLoading, data: myClasses, refetch, } = useQuery({
        queryKey: ['myClasses'],
        queryFn: async () => {
            const result = await axiosSecure.get(`http://localhost:3000/instructor/my-classes?email=${user?.email}`)
            return result.data
        },
        enabled: !!user.email
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
                    : !myClasses.length ? <div className="h-screen flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There is no class added!</h2></div>
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
                                                const { className, classImg, totalEnrolledStudent, feedback, price, status } = myClass
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
                                                    <td className='text-center'> {totalEnrolledStudent ? totalEnrolledStudent : 0} </td>
                                                    <td className='text-center'>{status}</td>
                                                    <td className='text-center'> {feedback ? feedback : 'N/A'} </td>
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