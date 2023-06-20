import MyMotion from "./MyMotion";

/* eslint-disable react/prop-types */

const CommonSectionTitle = ({ title, subtitle }) => {
    return (
        <MyMotion y={-100}>
            <div className="py-14 mx-auto w-5/6 md:w-4/6 xl:w-3/6 space-y-4 text-center relative z-50 ">
                <h2 className="font-bold text-5xl">{title}</h2>
                <p className="text-lg text-[#e74c3c]">{subtitle}</p>
            </div>
        </MyMotion>
    );
};

export default CommonSectionTitle;