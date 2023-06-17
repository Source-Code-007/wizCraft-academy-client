import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ThreeCircles } from "react-loader-spinner";
import { Fade } from "react-awesome-reveal";
import {  FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"


const News = () => {
    const navigate = useNavigate()
    const { axiosSecure } = UseAxiosSecure()

    const { isLoading, data: allNews, error, refetching } = useQuery(
        {
            queryKey: ['allNews'],
            queryFn: async () => {
                const result = await axiosSecure('/get-news')
                return result.data
            }
        }
    )

    return (
        <div className='min-h-screen'>
            {
                isLoading ? <div className="h-[80vh] flex items-center justify-center">
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
                    : !allNews.length ? <div className="h-[80vh] flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There are no popular classes right now!</h2></div>
                        : <div className='my-container py-28 '>
                            <CommonSectionTitle title={'News & Articles'} subtitle={'Stay Spellbound with the Latest News and Updates from our Enchanting Summer Camp'}></CommonSectionTitle>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 lg:px-5">
                                {
                                    allNews.map((classP, ind) => {
                                        const { _id, authorName, authorRole, img,  newsTitle, newsPublishedDate } = classP

                                        return <Fade key={ind}>
                                            <motion.div
                                             variants={{
                                                hidden: { opacity: 0, x: ind%2===0? 100 : 0, y: ind%2===0? 0 : 100 },
                                                visible: { opacity: 1, x: 0, y: 0 }
                                            }}
                                            initial="hidden"
                                            whileInView="visible"
                                            transition={{ delay: .2, type: "spring", stiffness: 70 }}
                                            
                                            className={`card card-compact shadow-xl text-slate-200 overflow-hidden cmn-gradient-one`}>
                                                <div className="relative group overflow-hidden">
                                                    <img src={img} alt={newsTitle} className="h-80 w-full rounded-t group-hover:scale-105 transition duration-500 rounded" />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                                                </div>
                                                <div className="card-body text-lg relative min-h-[220px]">
                                                <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{new Date(newsPublishedDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h2>
                                                    <p className="flex gap-3 items-center text-slate-300"><FaUser className="text-[#e74c3c]"></FaUser> By {authorName} / {authorRole} </p>
                                                    <h2 className="text-2xl font-bold">{newsTitle}</h2>
                                                    <button onClick={()=>navigate(`/news/${_id}`)} className="cmn-btn-two w-fit">View News</button>
                                                </div>
                                            </motion.div>
                                        </Fade>
                                    })
                                }
                            </div>
                        </div>
            }
        </div>
    );
};

export default News;