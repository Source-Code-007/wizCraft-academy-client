/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";

const PopularInstructor = () => {

    const { axiosSecure } = UseAxiosSecure()
    const [PopularInstructors, setPopularInstructors] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axiosSecure('/popular-instructors')
        .then(res=> {setPopularInstructors(res.data); setIsLoading(false)})
    }, [axiosSecure])

    return (
        <div className='min-h-screen bg-center bg-cover '>
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
                : <div className='my-container py-28 '>
                    <CommonSectionTitle title={'Popular instructor'} subtitle={'Most wanted instructor!'}></CommonSectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-5">
                    {
                        PopularInstructors.map((instructor, ind) => {
                            const { _id, name, photo, email, date, enrolledStudent } = instructor

                            return <div key={ind} className={`card card-compact cmn-gradient-one shadow-xl text-slate-200 overflow-hidden`}>
                                <figure className='shadow'><img src={photo} alt={name} className='h-80 w-full rounded-t' /></figure>
                                <div className="card-body font-semibold text-lg relative !pt-10">
                                    <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{name}</h2>
                                    <p>price: {email}</p>
                                    <p>Instructor name: {new Date(date).toLocaleTimeString()}</p>
                                    <p>Total student: {enrolledStudent}</p>

                                </div>
                            </div>
                        })
                    }
                    </div>
                </div>
        }
    </div>
    );
};

export default PopularInstructor;