/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";

const InstructorsPage = () => {
    const { axiosSecure } = UseAxiosSecure()
    const [instructors, setInstructors] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axiosSecure('/all-instructors')
            .then(res => { setInstructors(res.data); setIsLoading(false) })
            .catch(e => console.log(e.message))
    }, [axiosSecure])

    return (
        <div className='min-h-screen'>
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
                    : <div className='my-container py-28 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-5'>
                        {
                            instructors.map((instructor, ind) => {
                                const { _id, name, photo, email, date } = instructor

                                return <div key={ind} className="card card-compact rounded-b-none bg-slate-800 bg-opacity-50 shadow-xl text-slate-200 overflow-hidden">
                                    <div className="h-40 relative">
                                        <figure className='shadow'><img src={photo} alt={name} className='h-40 w-40 my-8 rounded-xl absolute -bottom-24 z-10' /></figure>
                                    </div>
                                    <div className="card-body font-semibold text-lg relative !pt-28 rounded-t-xl cmn-gradient-one">
                                        <h2 className="card-title absolute top-14  translate-x-5 bg-[#063a92] p-2 z-20">{name}</h2>
                                        <p>Email: {email}</p>
                                        <p>Joining date: {new Date(date).toLocaleDateString()}</p>
                                        <p>Total Class: pending</p>
                                        <p>Classes: pending, pending, pending</p>
                                        <p>Total student: pending</p>
                                        <button className="cmn-btn-two">See classes</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );
};

export default InstructorsPage;