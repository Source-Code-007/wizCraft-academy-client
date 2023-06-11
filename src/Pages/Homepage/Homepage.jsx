import Banner from "./Banner/Banner";
import PopularClass from "./PopularClass/PopularClass";
import PopularInstructor from "./PopularInstructor/PopularInstructor";

const Homepage = () => {
    return (
        <>
                <Banner></Banner>
                <PopularClass></PopularClass>
                <PopularInstructor></PopularInstructor>
        </>
    );
};

export default Homepage;