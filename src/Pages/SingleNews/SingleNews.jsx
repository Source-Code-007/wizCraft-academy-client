/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

import { FaAngleRight, FaComment, FaUser } from "react-icons/fa";
import CommonCompoBanner from "../../HelpingComponent/CommonCompoBanner";


// TODO: issue on recent news , no rerender
const SingleNews = () => {
    const { id } = useParams()
    const { axiosSecure } = UseAxiosSecure()
    const navigate = useNavigate()

    // single news
    const { isLoading: isSingleNewsLoading, data: singleNews, error: singleNewsErr, refetch: singleNewsRefetch } = useQuery(
        {
            queryKey: ['singleNews', id],
            queryFn: async () => {
                const result = await axiosSecure(`/get-single-news/${id}`)
                return result.data
            },
        }
    )

    // recent news
    const { isLoading: isRecentNewsLoading, data: recentNews, error: recentNewsErr, refetch: recentNewsRefetch } = useQuery(
        {
            queryKey: ['recentNews'],
            queryFn: async () => {
                const result = await axiosSecure('/get-recent-news')
                return result.data
            },
        }
    )


    if (isSingleNewsLoading || isRecentNewsLoading) {
        return <div className="h-screen flex items-center justify-center">
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

    const { img, newsTitle, newsPublishedDate, newsParagraph, authorName, authorRole, comments, tags, categories } = singleNews || {}

    return (
        <div>
            {/* Banner */}
            <CommonCompoBanner title={`Home / ${singleNews?.newsTitle}`} subtitle={singleNews?.newsTitle}></CommonCompoBanner>

            <div className="grid grid-cols-12  gap-8 my-container py-14">

                <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 space-y-5">

                    {/* news */}
                    <div className={`card card-compact shadow-inner shadow-slate-300 text-slate-200 overflow-hidden`}>
                        <div className="relative group overflow-hidden">
                            <img src={img} alt={newsTitle} className="h-80 w-full rounded-t group-hover:scale-105 transition duration-500 rounded" />
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                        </div>
                        <div className="card-body text-lg !pt-10 relative min-h-[220px]">

                            <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{new Date(newsPublishedDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h2>
                            <p className="flex gap-3 items-center text-slate-300"><FaUser className="text-[#e74c3c]"></FaUser> By {authorName} / {authorRole} </p>
                            <p className="leading-loose text-slate-300 my-7">{newsParagraph}</p>
                            <p>Tags {tags.map((tag, ind) => <button key={ind} className="cmn-btn-two mx-3 !bg-[#063a92]">{tag}</button>)}</p>
                        </div>
                    </div>

                    {/* comments */}
                    <div className="space-y-6 !mt-28">
                        <h3 className="font-bold text-3xl">{comments?.length} comments to "{newsTitle}" </h3>
                        {
                            comments.length && comments?.map((comment, ind) => {
                                return <div key={ind} className="shadow-inner shadow-slate-300 rounded p-14 space-y-4" >
                                    <div className="flex justify-between gap-5">
                                        <h2 className="flex gap-2 items-center text-3xl font-bold">{comment?.commentAuthor} <span className="text-[#e74c3c] font-normal text-sm">{new Date(comment?.commentDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span></h2>
                                        <button className="cmn-btn-one">Reply</button>
                                    </div>
                                    <p className="text-slate-300">{comment?.commentText}</p>
                                </div>
                            })
                        }
                    </div>

                    {/* post a comment */}
                    <div className="!my-24 p-5 shadow-inner shadow-slate-300">
                        <h2 className="font-bold text-4xl my-5">Leave a comment!</h2>
                        <form className="space-y-4">
                            <div className="flex gap-5">
                                <input type="text" placeholder="Name" className="my-inp" />
                                <input type="email" placeholder="email" className="my-inp" />
                            </div>
                            <textarea className="my-inp w-full h-60" name="comment" placeholder="Your comment here"></textarea>
                            <button className="cmn-btn-one ">Post comment</button>
                        </form>
                    </div>

                </div>



                <div className="col-span-12  lg:col-span-4 order-1 lg:order-2">

                    {/* search */}
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search…" className="input input-bordered my-inp" />
                            <button className="px-5 bg-[#e74c3c]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* recent news */}
                    <div className="space-y-5 p-5 shadow-inner shadow-slate-300 my-6">
                        <h2 className="font-bold text-3xl">Recent News</h2>
                        {
                            recentNews.map((news, ind) => {
                                const { _id, img, newsTitle, comments } = news
                                return <div key={ind} onClick={() => { navigate(`/news/${_id}`) }} className="grid grid-cols-2 gap-3 shadow-inner shadow-slate-300 my-3 p-3 cursor-pointer">
                                    <figure className="p-7">
                                        <img src={img} className="w-full h-full rounded" alt="" />
                                    </figure>
                                    <div className="space-y-3">
                                        <span className="text-sm flex items-center gap-2"><FaComment className="text-[#e74c3c]"></FaComment> {comments?.length ? comments.length : 0} comments</span>
                                        <h3 className="font-bold">{newsTitle}</h3>
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    {/* categories */}
                    <div className="space-y-5 p-5 shadow-inner shadow-slate-300 my-6">
                        <h2 className="font-bold text-3xl">Categories</h2>
                        <div>
                            {
                                categories.map((category, ind) => <p key={ind} className="my-1 flex gap-2 items-center text-slate-300"> <FaAngleRight className="text-[#e74c3c]"></FaAngleRight> {category}</p>)
                            }
                        </div>
                    </div>



                </div>

            </div>


        </div>
    );
};

export default SingleNews;