import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import Gallery from "./Gallery/Gallery";
import Introduction from "./Introduction.jsx/Introduction";
import News from "./News/News";
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
                <Gallery></Gallery>
                <Testimonial></Testimonial>
                <News></News>
                <ContactUs></ContactUs>
        </>
    );
};

export default Homepage;