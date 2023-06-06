import bannerBgOne from '../../../assets/img/bannerBgOne.jpg';

const Banner = () => {
    return (
        <div className='h-screen bg-cover bg-center' style={{backgroundImage: `url(${bannerBgOne})`}}>
        </div>
    );
};

export default Banner;