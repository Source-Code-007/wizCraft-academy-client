import CommonSectionTitle from '../../../HelpingComponent/CommonSectionTitle';
import galleryImg1 from '../../../assets/img/Gallery/anna-samoylova-w55SpMmoPgE-unsplash.jpg'
import galleryImg2 from '../../../assets/img/Gallery/artem-kniaz-DqgMHzeio7g-unsplash.jpg'
import galleryImg3 from '../../../assets/img/Gallery/gallery-2.jpg'
import galleryImg4 from '../../../assets/img/Gallery/gallery-3.jpg'
import { motion } from "framer-motion"


const Gallery = () => {
    return (
        <div className='my-container py-14 overflow-hidden'>
            <CommonSectionTitle title={'Magic in Frames'} subtitle={'A Captivating Gallery of Enchanting Moments'}></CommonSectionTitle>
            <div className='grid grid-cols-12 gap-7'>
                
                <div className='col-span-12 lg:col-span-3 flex flex-col gap-7'>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: .2, type: "spring", stiffness: 70 }}
                        className='relative group !h-[500px] md:!h-full overflow-hidden'
                    >
                        <img src={galleryImg1} className="h-full w-full object-cover group-hover:scale-105 transition duration-500 rounded" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: .2, type: "spring", stiffness: 70 }}
                        className='relative group !h-[500px] md:!h-full overflow-hidden'
                    >
                        <img src={galleryImg3} className="h-full w-full object-cover group-hover:scale-105 transition duration-500 rounded" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                    </motion.div>

                </div>

                <div className='col-span-12 lg:col-span-6'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: .2, type: "spring", stiffness: 70 }}
                        className='relative group !h-[500px] md:!h-full overflow-hidden'
                    >
                        <img src={galleryImg2} className="h-full w-full object-cover group-hover:scale-105 transition duration-500 rounded" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                    </motion.div>
                </div>

                <div className='col-span-12 lg:col-span-3'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        transition={{delay: .2, type: "spring", stiffness: 70 }}
                        className='relative group !h-[500px] md:!h-full overflow-hidden'
                    >
                        <img src={galleryImg4} className="h-full w-full object-cover group-hover:scale-105 transition duration-500 rounded" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Gallery;