/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion"


const PopularInstructor = () => {

    const { axiosSecure } = UseAxiosSecure()
    const [PopularInstructors, setPopularInstructors] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure('/popular-instructors')
            .then(res => { setPopularInstructors(res.data); setIsLoading(false) })
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
                    : !PopularInstructors.length ? <div className="h-[80vh] flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There are no popular instructors right now!</h2></div>
                        : <div className='my-container py-28 '>
                            <CommonSectionTitle title={'Popular instructors'} subtitle={'Most wanted instructor!'}></CommonSectionTitle>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:px-5">
                                {
                                    PopularInstructors.map((instructor, ind) => {
                                        const { _id, name, photo, email, date, enrolledStudent } = instructor

                                        return <Fade key={ind}>
                                            <div className={`card card-compact cmn-gradient-one shadow-xl text-slate-200 p-8 grid grid-cols-12 gap-5 overflow-hidden`}>

                                                <motion.div
                                                    variants={{
                                                        hidden: { opacity: 0, x: -50 },
                                                        visible: { opacity: 1, x: 0 }
                                                    }}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    transition={{ duration: 0.5, delay: .2, type: "spring", stiffness: 100 }}
                                                    className='col-span-12  xl:col-span-4 flex items-center justify-center'>
                                                    <img src={photo} alt={name} className='h-36 w-36 rounded' />
                                                </motion.div>

                                                <motion.div
                                                    variants={{
                                                        hidden: { opacity: 0, x: 50 },
                                                        visible: { opacity: 1, x: 0 }
                                                    }}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    transition={{ duration: 0.5, delay: .2, type: "spring", stiffness: 100 }}
                                                    className="card-body col-span-12 xl:col-span-8 font-semibold text-lg !p-0">
                                                    <div className="flex justify-between">
                                                        <h2 className="card-title text-lg lg:text-xl xl:text-2xl">{name}</h2>
                                                        <div
                                                            className='flex items-center justify-center gap-2 text-lg'
                                                        >
                                                            <Link className='inline-block transition hover:scale-125 hover:text-[#e74c3c]' to={'https://web.facebook.com/UtshoBhai007'} target='_blank'><FaFacebook></FaFacebook></Link>
                                                            <Link className='inline-block transition hover:scale-125 hover:text-[#e74c3c]' to={'https://www.linkedin.com/in/ahashan-habib-utsho-722745107'} target='_blank'><FaLinkedin></FaLinkedin></Link>
                                                            <Link className='inline-block transition hover:scale-125 hover:text-[#e74c3c]' to={'https://github.com/Source-Code-007'} target='_blank'><FaGithub></FaGithub></Link>
                                                        </div>
                                                    </div>
                                                    <p className="font-normal text-slate-300">
                                                        Jimmy is our exceptionally popular and highly sought-after instructor, who has amassed a remarkable {enrolledStudent} students since {new Date(date).toLocaleDateString()}. Don't miss the chance to connect with Jimmy by reaching out to him at {email}.
                                                    </p>
                                                    <Link to={`/instructor-classes/${name}`}>
                                                        <button className="cmn-btn-two w-fit flex-end mt-3">View Classes</button>
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </Fade>
                                    })
                                }
                            </div>
                        </div>
            }
        </div>
    );
};

export default PopularInstructor;