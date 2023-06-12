import { SwiperSlide } from 'swiper/react';
import CommonSectionTitle from '../../../HelpingComponent/CommonSectionTitle';
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from 'swiper';
import { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import { ThreeCircles } from 'react-loader-spinner';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonial = () => {
    const { axiosSecure } = UseAxiosSecure()
    const [testimonials, setTestimonials] = useState('')
    const [isTestimonialLoading, setIsTestimonialLoading] = useState(true)

    useEffect(() => {
        axiosSecure('/get-testimonials')
            .then(res => {
                setTestimonials(res.data)
                setIsTestimonialLoading(false)
            }).catch(e => console.log(e.message))
    }, [axiosSecure])



    return (
        <div className='my-container py-14'>
            <CommonSectionTitle
                title={'What clients are saying'}
                subtitle={'Magic Mastery and Beyond: Personal Stories of Growth and Achievement from our Graduates'}
            ></CommonSectionTitle>


            {isTestimonialLoading ? <div className="h-[50vh] flex items-center justify-center">
                <ThreeCircles
                    height="80"
                    width="80"
                    color="#e74c3c"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                /> </div> :
                <Swiper
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    spaceBetween={40}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper my-14"
                >
                    {
                        testimonials.map((testimonial, ind) => {
                            const { clientName, img, bannerImg, comment, date } = testimonial
                            return <SwiperSlide key={ind} className='w-full mb-10 bg-[#e74c3c]'>
                                <div className='h-44 relative' style={{ backgroundImage: `url(${bannerImg})` }}>

                                    <img src={img} className='h-24 w-24 rounded-full mx-auto absolute -bottom-5 left-0 right-0' />
                                    <FaQuoteLeft className='absolute -bottom-5 text-6xl left-10 text-white'></FaQuoteLeft>
                                </div>
                                <div className='py-12 px-6 min-h-[250px] text-white space-y-2'>
                                    <h2 className='text-3xl font-bold'>{clientName}</h2>
                                    <h2 className='text-slate-300'>{comment}</h2>
                                    <p className='text-white font-bold text-lg'>{new Date(date).toLocaleDateString()}</p>
                                </div>
                            </SwiperSlide>
                        })
                    }

                </Swiper>
            }


        </div>
    );
};

export default Testimonial;