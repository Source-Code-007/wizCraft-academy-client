import GoToTop from "../../HelpingComponent/GoToTop";
import Banner from "./Banner/Banner";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
import Testimonial from "./Testimonial/Testimonial";

const Homepage = () => {
    return (
        <>
                <Banner></Banner>
                <PopularClass></PopularClass>
                <PopularInstructor></PopularInstructor>
                <Testimonial></Testimonial>
                <GoToTop></GoToTop>
        </>
    );
};

export default Homepage;