import bannerBgOne from '../../../assets/img/bannerBgOne.jpg'; 
import bannerBgTwo from '../../../assets/img/bannerBgTwo.jpg'; 
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const Banner = () => {
    return (
        <div className='h-screenf bg-cover bg-center'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-screen">

                <SwiperSlide className='bg-cover bg-center !bg-fixed' style={{ backgroundImage: `url(${bannerBgOne})` }}>
                    <div className='h-screen flex justify-center items-center text-center text-white'>
                        <div className='w-5/6 md:w-4/6 xl:w-3/6 mx-auto'>
                            <h2 className='font-bold text-3xl'>Hello from magic school!</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate expedita nemo officiis, adipisci ipsum repellendus assumenda, animi repudiandae accusantium ea dolore! Officiis numquam ipsa totam illum ipsum corrupti quam vitae.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='bg-cover bg-center' style={{ backgroundImage: `url(${bannerBgTwo})` }}>
                    <div className='h-screen flex justify-center items-center text-center text-white'>
                        <div className='w-5/6 md:w-4/6 xl:w-3/6 mx-auto'>
                            <h2 className='font-bold text-3xl'>Hello from magic school!</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate expedita nemo officiis, adipisci ipsum repellendus assumenda, animi repudiandae accusantium ea dolore! Officiis numquam ipsa totam illum ipsum corrupti quam vitae.</p>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;