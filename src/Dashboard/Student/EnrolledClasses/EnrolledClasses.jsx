import { useQuery } from "@tanstack/react-query";
import { Slide } from "react-awesome-reveal";
import { FaTrash } from "react-icons/fa";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import UseAuth from "../../../Hook/UseAuth";
import bgImg from '../../../assets/img/signinBg.jpg'

const EnrolledClasses = () => {
    const {user, authLoading} = UseAuth()
    const {axiosSecure} = UseAxiosSecure()


    const {data:enrolledClasses, refetch, isLoading, error} = useQuery({
        queryKey: ['enrolledClasses'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/my-enrolled-classes?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email && !authLoading
    })

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
                    : !enrolledClasses.length ? <div className="h-screen flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There is no enrolled classes!</h2></div>
                    : <div className='my-container py-28 px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {
                            enrolledClasses.map((classP, ind) => {
                                const { _id, classImg, className, date, instructorName, availableSeats, price } = classP

                                return <div key={ind} className={`card card-compact shadow-xl text-slate-200 overflow-hidden ${availableSeats === 0 ? 'bg-red-500 bg-opacity-50' : 'cmn-gradient-one'}`}>
                                    <figure className='shadow'><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body font-semibold text-lg relative !pt-10">
                                        <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                        <p>Instructor name: {instructorName}</p>
                                        <p>price: {price}</p>
                                        <p>Enrolled date: {new Date(date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );
};

export default EnrolledClasses;