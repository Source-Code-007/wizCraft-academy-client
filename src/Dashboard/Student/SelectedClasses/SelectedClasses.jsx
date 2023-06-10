import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import { ToastContainer } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { FaDollarSign,  FaTrash } from "react-icons/fa";
import bgImg from '../../../assets/img/signinBg.jpg'

const SelectedClasses = () => {
    const { user } = UseAuth()
    const { axiosSecure } = UseAxiosSecure()

    const { data: selectedClasses, isLoading: selectedClassesIsLoading, error, refetch } = useQuery({
        queryKey: ['specificSelectedClasses'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/specific-user-selected-classes?email=${user?.email}`)
            return result.data
        },
        enabled: !!user?.email
    })

    return (
        <div className='min-h-screen bg-center bg-cover bg-slate-900 bg-blend-overlay' style={{ backgroundImage: `url(${bgImg})` }}>
            {
                selectedClassesIsLoading ? <div className="h-screen flex items-center justify-center">
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
                            selectedClasses.map((classP, ind) => {
                                const { _id, classImg, className, instructorName, availableSeats, price } = classP

                                return <div key={ind} className={`card card-compact shadow-xl text-slate-200 overflow-hidden ${availableSeats === 0 ? 'bg-red-500 bg-opacity-50' : 'cmn-gradient-one'}`}>
                                    <figure className='shadow'><img src={classImg} alt={className} className='h-80 w-full rounded-t' /></figure>
                                    <div className="card-body font-semibold text-lg relative !pt-10">
                                        <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{className}</h2>
                                        <p>Instructor name: {instructorName}</p>
                                        <p>Available seats: {availableSeats}</p>
                                        <p>price: {price}</p>
                                        <button className={`cmn-btn-two w-fit flex items-center gap-3 my-3 }`}> <FaTrash></FaTrash> Delete</button>
                                        <button className={`cmn-btn-two w-fit flex items-center gap-3 my-3 }`}> <FaDollarSign></FaDollarSign> Pay</button>
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
        </div>
    );
};

export default SelectedClasses;