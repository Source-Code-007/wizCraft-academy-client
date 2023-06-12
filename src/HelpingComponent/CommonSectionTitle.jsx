/* eslint-disable react/prop-types */
const CommonSectionTitle = ({title, subtitle}) => {
    return (
        <div className="py-10 mx-auto w-5/6 md:w-4/6 xl:w-3/6 space-y-2 text-center text-white">
            <h2 className="font-bold text-5xl">{title}</h2>            
            <p className="text-lg font-semibold text-slate-200">{subtitle}</p>            
        </div>
    );
};

export default CommonSectionTitle;