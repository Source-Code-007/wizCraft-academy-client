import { useEffect } from "react";
import CommonSectionTitle from "../../../HelpingComponent/CommonSectionTitle";
import UseAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ThreeCircles } from "react-loader-spinner";
import { Fade } from "react-awesome-reveal";

const News = () => {
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
                                        const { _id, authorName, authorRole, authorImage, img, banner, newsTitle, newsParagraph, newsPublishedDate } = classP

                                        return <Fade key={ind}>
                                            <div className={`card card-compact shadow-xl text-slate-200 overflow-hidden cmn-gradient-one`}>
                                                <figure className='shadow'><img src={img} alt={newsTitle} className='h-80 w-full rounded-t' /></figure>
                                                <div className="card-body font-semibold text-lg relative !pt-10">
                                                    <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{newsTitle}</h2>
                                                    <p>Instructor name: {authorName}</p>
                                                    <p>News title: {newsTitle}</p>
                                                    <p>Author role: {authorRole}</p>
                                                    <p>Published date {newsPublishedDate}</p>

                                                </div>
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

export default News;