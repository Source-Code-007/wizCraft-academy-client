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

    if(isLoading){
        return  <div className="h-screen flex items-center justify-center">
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
    }

    return (
        <div className='min-h-screen'>
            <h2 className="font-bold text-3xl text-center pt-28 mb-10">Our Expert Instructors</h2>

            {
                !instructors.length? <div className="h-[70vh] flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There are no instructors right now.!</h2></div> 
                : <div className='my-container pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-5'>
                        {
                            instructors.map((instructor, ind) => {
                                const { _id, name, photo, email, date, enrolledStudent } = instructor

                                return <div key={ind} className="card card-compact rounded-b-none bg-slate-800 bg-opacity-50 shadow-xl text-slate-200 overflow-hidden">
                                    <div className="h-40 relative bg-[#02066f] bg-opacity-25">
                                        <figure className='shadow'><img src={photo} alt={name} className='h-40 w-40 my-8 rounded-xl absolute -bottom-24 z-10' /></figure>
                                    </div>
                                    <div className="card-body font-semibold text-lg relative !pt-28 rounded-t-xl cmn-gradient-one">
                                        <h2 className="card-title absolute top-14  translate-x-5 bg-[#063a92] p-2 z-20">{name}</h2>
                                        <p>Email: {email}</p>
                                        <p>Joining date: {new Date(date).toLocaleDateString()}</p>
                                        <p className={`${!enrolledStudent ? 'text-red-500' : ''}`}>Total student: {enrolledStudent}</p>
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