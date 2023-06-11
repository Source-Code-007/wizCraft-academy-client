/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import bgImg from '../../../assets/img/signinBg.jpg'
import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";

const PopularClass = () => {
    const { axiosSecure } = UseAxiosSecure()
    const [PopularClasses, setPopularClasses] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axiosSecure('/popular-classes')
        .then(res=> {setPopularClasses(res.data); setIsLoading(false)})
    }, [axiosSecure])

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
                : <div className='my-container py-28 '>
                    <CommonSectionTitle title={'Popular Class'} subtitle={'Most wanted magic classes!'}></CommonSectionTitle>
                    <div className="grid grid-cols-3 gap-5">
                    {
                        PopularClasses.map((classP, ind) => {
                            const { _id, classImg, className, instructorName, availableSeats, price } = classP

                            return <div key={ind} className={`card card-compact shadow-xl text-slate-200 overflow-hidden ${availableSeats === 0 ? 'bg-red-500 bg-opacity-50' : 'cmn-gradient-one'}`}>
                                <figure className='shadow'><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                <div className="card-body font-semibold text-lg relative !pt-10">
                                    <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                    <p>Instructor name: {instructorName}</p>
                                    <p>Available seats: {availableSeats}</p>
                                    <p>price: {price}</p>

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

export default PopularClass;