import CommonSectionTitle from '../../../HelpingComponent/CommonSectionTitle';
import galleryImg1 from '../../../assets/img/Gallery/anna-samoylova-w55SpMmoPgE-unsplash.jpg'
import galleryImg2 from '../../../assets/img/Gallery/artem-kniaz-DqgMHzeio7g-unsplash.jpg'
import galleryImg3 from '../../../assets/img/Gallery/gallery-2.jpg'
import galleryImg4 from '../../../assets/img/Gallery/gallery-3.jpg'

const Gallery = () => {
    return (
        <div className='my-container'>
            <CommonSectionTitle title={'Magic in Frames'} subtitle={'A Captivating Gallery of Enchanting Moments'}></CommonSectionTitle>
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-3 space-y-8'>
                    <img src={galleryImg1} alt="" />
                    <img src={galleryImg3} alt="" />
                </div>
                <div className='col-span-6'>
                    <img className='h-full' src={galleryImg2} alt="" />
                </div>
                <div className='col-span-3'>
                    <img src={galleryImg4} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Gallery;