import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

import singleNewsBanner from "../../assets/img/singleNewsBanner.jpg";
import { FaUser } from "react-icons/fa";



const SingleNews = () => {
    const { id } = useParams()
    const { axiosSecure } = UseAxiosSecure()

    const { isLoading, data: singleNews, error, refetching } = useQuery(
        {
            queryKey: ['singleNews'],
            queryFn: async () => {
                const result = await axiosSecure(`/get-single-news/${id}`)
                return result.data
            }
        }
    )

    console.log(isLoading, singleNews);

    if (isLoading) {
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

    const { img, newsTitle, newsPublishedDate, newsParagraph, authorName, authorRole, comments, tags } = singleNews

    return (
        <div>
            <div className="h-[60vh] bg-cover bg-center bg-slate-800 bg-blend-overlay flex items-center justify-center" style={{ backgroundImage: `url(${singleNewsBanner})` }}>
                <div className="space-y-3 w-5/6 xl:w-4/6 ">
                    <p>Home / {singleNews?.newsTitle}</p>
                    <h2 className="font-extrabold text-2xl md:text-3xl xl:text-5xl !leading-relaxed">{singleNews?.newsTitle}</h2>
                </div>
            </div>

            <div className="grid grid-cols-12 my-container py-14">
                <div className="col-span-8 space-y-5">

                    <div className={`card card-compact shadow-inner shadow-slate-300 text-slate-200 overflow-hidden`}>
                        <div className="relative group overflow-hidden">
                            <img src={img} alt={newsTitle} className="h-80 w-full rounded-t group-hover:scale-105 transition duration-500 rounded" />
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                        </div>
                        <div className="card-body text-lg !pt-10 relative min-h-[220px]">

                            <h2 className="card-title absolute -top-6  translate-x-5 bg-[#063a92] p-2">{new Date(newsPublishedDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</h2>
                            <p className="flex gap-3 items-center text-slate-300"><FaUser className="text-[#e74c3c]"></FaUser> By {authorName} / {authorRole} </p>
                            <p className="leading-loose text-slate-300">{newsParagraph}</p>
                            <p>Tags {tags.map((tag, ind) => <button key={ind} className="cmn-btn-two mx-3 !bg-[#063a92]">{tag}</button>)}</p>
                        </div>
                    </div>

                    <div className="space-y-4 !mt-28">
                        <h3 className="font-bold text-3xl">{comments?.length} comments to "{newsTitle}" </h3>
                        {
                            comments.length && comments?.map((comment, ind) => {
                                return <div key={ind} className="shadow-inner shadow-slate-300 rounded p-5 px-16 space-y-4" >
                                    <div className="flex justify-between gap-5">
                                        <h2 className="flex gap-2 items-center text-3xl font-bold">{comment?.commentAuthor} <span className="text-[#e74c3c] font-normal text-lg">{new Date(comment?.commentDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span></h2>
                                        <button className="cmn-btn-one">Reply</button>
                                    </div>
                                    <p className="text-slate-300">{comment?.commentText}</p>
                                </div>
                            })
                        }
                    </div>

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

                <div className="col-span-4">

                </div>

            </div>


        </div>
    );
};

export default SingleNews;