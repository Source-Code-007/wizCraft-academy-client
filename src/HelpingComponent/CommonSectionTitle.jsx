/* eslint-disable react/prop-types */
import cmnBg from '../assets/img/cmnSectionTitleBg.png'
const CommonSectionTitle = ({title, subtitle}) => {
    return (
        <div className="py-10 mx-auto w-5/6 md:w-4/6 xl:w-3/6 space-y-4 text-center relative z-50">
            <h2 className="font-bold text-5xl">{title}</h2>            
            <img className='h-20 w-[400px] opacity-75 -z-10 absolute top-1 left-1/2 -translate-x-1/2' src={cmnBg} alt="" />
            <p className="text-lg">{subtitle}</p>            
        </div>
    );
};

export default CommonSectionTitle;