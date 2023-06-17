import GoToTop from "../../HelpingComponent/GoToTop";
import Banner from "./Banner/Banner";
import Introduction from "./Introduction.jsx/Introduction";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
import Testimonial from "./Testimonial/Testimonial";
import VideoSection from "./VideoSection/VideoSection";

const Homepage = () => {
    return (
        <>
                <Banner></Banner>
                <Introduction></Introduction>
                <PopularClass></PopularClass>
                <PopularInstructor></PopularInstructor>
                <VideoSection></VideoSection>
                <Testimonial></Testimonial>
                <GoToTop></GoToTop>
        </>
    );
};

export default Homepage;