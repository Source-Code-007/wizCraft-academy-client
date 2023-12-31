import { FaPlay } from 'react-icons/fa';
import videoBg from '../../../assets/img/videoSectionBg.jpg';
import MyMotion from '../../../HelpingComponent/MyMotion';
import VideoModal from './VideoModal';

const VideoSection = () => {
    return (
        <div className='h-[60vh] bg-center bg-cover bg-fixed my-12 bg-slate-800 bg-blend-overlay' style={{ backgroundImage: `url(${videoBg})` }}>
            <div className='my-container h-full grid grid-cols-12 items-center gap-6'>
                <div className='space-y-4 col-span-8'>
                    <MyMotion x={100}>
                        <p className='text-[#e74c3c] text-lg'>Unleash Your Inner Magician</p>
                    </MyMotion>
                    <MyMotion x={-100}>
                        <h2 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold !leading-normal'>Learn from Expert Magicians and Develop Your Magical Skills</h2>
                    </MyMotion>
                </div>
                <div className='text-right col-span-4'>
                    <MyMotion x={100} delay={.5}>
                        <button onClick={() => window.my_modal_1.showModal()} className='bg-[#e74c3c] text-white shadow-inner shadow-white text-3xl rounded-full inline-block p-12'><FaPlay></FaPlay></button>
                    </MyMotion>
                </div>
            </div>
            <VideoModal></VideoModal>
        </div>
    );
};

export default VideoSection;