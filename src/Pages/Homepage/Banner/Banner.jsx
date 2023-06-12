import bannerBgOne from '../../../assets/img/bannerBgOne.jpg'; 
import bannerBgTwo from '../../../assets/img/bannerBgTwo.jpg'; 
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='h-screenf bg-cover bg-center'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-screen">

                <SwiperSlide className='bg-cover bg-center !bg-fixed' style={{ backgroundImage: `url(${bannerBgOne})` }}>
                    <div className='h-screen flex justify-center items-center text-center text-white'>
                        <div className='w-5/6 md:w-4/6 lg:w-3/6 mx-auto space-y-4'>
                            <h2 className='font-bold text-5xl'>Welcome to the Magic School!</h2>
                            <p className='text-slate-300 '>Unleash your inner wizard and embark on a magical journey like no other</p>
                            <Link to={'/classes'}><button className="cmn-btn-one mt-4">See classes</button></Link>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='bg-cover bg-center' style={{ backgroundImage: `url(${bannerBgTwo})` }}>
                    <div className='h-screen flex justify-center items-center text-center text-white'>
                    <div className='w-4/6 md:w-4/6 lg:w-3/6 mx-auto space-y-4'>
                            <h2 className='font-bold text-5xl'>Embrace the Extraordinary!</h2>
                            <p className='text-slate-300 '>Unlock ancient spells, master potions, and delve into the mystical arts</p>
                            <Link to={'/instructors'}><button className="cmn-btn-one mt-4">See instructors</button></Link>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;