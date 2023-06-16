import { FaCampground, FaCheck } from 'react-icons/fa';
import introductionImg from '../../../assets/img/introductionImg.jpg'

const Introduction = () => {
    return (
        <div className='min-h-screen my-container py-12 grid grid-cols-2 items-center justify-center gap-12'>
            <div>
                <img className='bg-slate-800 bg-blend-overlay' src={introductionImg} alt="" />
            </div>
            <div className='space-y-6'>
                <p className='text-lg text-[#e74c3c]'>Our introductions</p>
                <h2 className='font-bold text-5xl'>Welcome to Camp of Summers</h2>
                <p className='flex gap-3 items-center text-slate-300'> <span className='text-[#e74c3c] text-5xl'> <FaCampground></FaCampground> </span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

        <ul>
            <li className='flex gap-3 text-slate-300'> <span className='text-[#e74c3c]'><FaCheck></FaCheck></span> Refresing to get such a personal touch.</li>
            <li className='flex gap-3 text-slate-300'> <span className='text-[#e74c3c]'><FaCheck></FaCheck></span> Duis aute irure dolor in reprehenderit in voluptate.</li>
            <li className='flex gap-3 text-slate-300'> <span className='text-[#e74c3c]'><FaCheck></FaCheck></span> Velit esse cillum dolore eu fugiat nulla pariatur.</li>
        </ul>
            </div>
        </div>
    );
};

export default Introduction;