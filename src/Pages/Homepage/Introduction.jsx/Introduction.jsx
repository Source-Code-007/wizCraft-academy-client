import { FaCampground, FaCheck } from 'react-icons/fa';
import introductionImg from '../../../assets/img/introductionImg.jpg'
import MyMotion from '../../../HelpingComponent/MyMotion';

const Introduction = () => {
    return (
        <div className='min-h-screen my-container py-12 grid grid-cols-2 items-center justify-center gap-12'>
            <MyMotion x={-100}>
                <img className='bg-slate-800 bg-blend-overlay rounded hover:scale-105 transition duration-500' src={introductionImg} alt="" />
            </MyMotion>
            <MyMotion x={100}>
                <div className='space-y-6'>
                    <p className='text-lg text-[#e74c3c]'>Our introductions</p>
                    <h2 className='font-bold text-5xl !leading-relaxed'>Welcome to summer camp magic school</h2>
                    <p className='flex gap-3 items-center text-slate-300'> <span className='text-[#e74c3c] text-5xl'> <FaCampground></FaCampground> </span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    <ul className='space-y-3'>
                        <li className='flex gap-3 text-slate-300'> <span className='rounded-full inline-block p-1 bg-[#e74c3c]'><FaCheck></FaCheck></span> Refresing to get such a personal touch.</li>
                        <li className='flex gap-3 text-slate-300'> <span className='rounded-full inline-block p-1 bg-[#e74c3c]'><FaCheck></FaCheck></span> Duis aute irure dolor in reprehenderit in voluptate.</li>
                        <li className='flex gap-3 text-slate-300'> <span className='rounded-full inline-block p-1 bg-[#e74c3c]'><FaCheck></FaCheck></span> Velit esse cillum dolore eu fugiat nulla pariatur.</li>
                    </ul>
                </div>
            </MyMotion>
        </div>
    );
};

export default Introduction;