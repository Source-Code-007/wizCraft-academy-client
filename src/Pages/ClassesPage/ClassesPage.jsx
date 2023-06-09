import  { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Hook/UseAxiosSecure';
import bgImg from '../../assets/img/signinBg.jpg'
import { ThreeCircles } from 'react-loader-spinner';

const ClassesPage = () => {

    const { axiosSecure } = UseAxiosSecure()
    const [classes, setClasses] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axiosSecure('/all-classes')
            .then(res => { setClasses(res.data); setIsLoading(false) })
            .catch(e => console.log(e.message))
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
                : <div className='my-container py-28 grid grid-cols-3 gap-5'>
                    {
                        classes.map((classP, ind) => {
                            const { _id, classImg, className, instructorName, availableSeats, price } = classP

                            return <div key={ind} className="card card-compact cmn-gradient-one shadow-xl text-slate-200 overflow-hidden">
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
        }
    </div>
    );
};

export default ClassesPage;