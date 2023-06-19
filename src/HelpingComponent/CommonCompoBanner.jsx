/* eslint-disable react/prop-types */
import cmnCompoBanner from '../assets/img/commonCompoBanner.jpg';

const CommonCompoBanner = ({title, subtitle}) => {
    return (
              <div className="h-[60vh] bg-cover bg-center bg-slate-800 bg-blend-overlay flex items-center  space-y-4" style={{ backgroundImage: `url(${cmnCompoBanner})` }}>
                <div className="space-y-3 w-5/6 xl:w-4/6 mx-auto text-center">
                    <h2 className="font-extrabold text-2xl md:text-3xl xl:text-5xl !leading-relaxed">{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>
    );
};

export default CommonCompoBanner;