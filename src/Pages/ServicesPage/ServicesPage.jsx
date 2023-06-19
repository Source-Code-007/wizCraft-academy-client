import { FaAffiliatetheme, FaAirFreshener, FaMagic, FaPastafarianism, FaPhoenixFramework, FaStudiovinari } from 'react-icons/fa';
import servicesBg from '../../assets/img/singleNewsBanner.jpg'
import counterBg from '../../assets/img/videoSectionBg.jpg'
import CountUp from 'react-countup';
import MyMotion from '../../HelpingComponent/MyMotion';

const ServicesPage = () => {

    const services = [
        {
            name: "Magic Workshops",
            icon: <FaPhoenixFramework></FaPhoenixFramework>,
            description: "Immerse yourself in the world of magic with our captivating workshops. Learn awe-inspiring tricks and techniques from our expert instructors, as they reveal the secrets behind the most mesmerizing illusions."
        },
        {
            name: "Private Lessons",
            icon: <FaStudiovinari></FaStudiovinari>,
            description: "Elevate your magical skills to new heights with personalized, one-on-one instruction. Our experienced magicians will guide you through tailored lessons, providing invaluable insights and helping you master the art of enchantment."
        },
        {
            name: "Special Events",
            icon: <FaAirFreshener></FaAirFreshener>,
            description: "Be spellbound by our extraordinary special events that bring the wonder of magic to life. Experience breathtaking performances, witness astonishing feats, and immerse yourself in the enchanting atmosphere of our themed gatherings."
        },
        {
            name: "Custom Programs",
            icon: <FaAffiliatetheme></FaAffiliatetheme>,
            description: "Experience the magic your way with our customizable programs. Whether it's for a group, organization, or a special occasion, we'll work closely with you to create a tailored magic program that meets your specific needs and exceeds your expectations."
        },
        {
            name: "Corporate Training",
            icon: <FaPastafarianism></FaPastafarianism>,
            description: "Ignite creativity and foster teamwork with our captivating corporate training programs. Using the power of magic, we offer engaging team-building exercises and captivating presentations that inspire collaboration, innovation, and a touch of enchantment in the workplace."
        },
        {
            name: "Magic Shows",
            icon: <FaMagic></FaMagic>,
            description: "Witness unforgettable magic shows performed by our talented magicians. Prepare to be amazed as they showcase mind-boggling illusions, astonishing tricks, and a spellbinding performance that will leave you in awe."
        }
    ];

    return (
        <div>
            <div className="h-[60vh] bg-cover bg-center bg-slate-800 bg-blend-overlay flex items-center  space-y-4" style={{ backgroundImage: `url(${servicesBg})` }}>
                <div className="space-y-3 w-5/6 xl:w-4/6 mx-auto text-center">
                    <h2 className="font-extrabold text-2xl md:text-3xl xl:text-5xl !leading-relaxed">Services</h2>
                    <p>Unlock the Magic: Discover Our Enchanting Services</p>
                </div>
            </div>
            <div className='my-container py-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                {
                    services.map((service, ind) => {
                        return <div key={ind} className='p-5 group shadow space-y-4 bg-slate-900 bg-opacity-40 relative pb-16 min-h-[380px]'>
                            <span className='flex justify-center'><span className='text-3xl rounded-full p-5 border-4 border-[#02066f] transition duration-500 group-hover:scale-110 group-hover:rotate-45'>{service.icon}</span></span>
                            <h2 className='font-bold text-3xl'>{service.name}</h2>
                            <p className='text-slate-300'>{service.description}</p>
                            <button className='cmn-btn-two absolute bottom-2 left-2'>Read more</button>
                        </div>
                    })
                }
            </div>

            <div className='bg-center bg-cover bg-fixed bg-slate-800 bg-blend-overlay py-36 my-20' style={{ backgroundImage: `url(${counterBg})` }}>
                <div className='my-container grid grid-cols-1 lg:grid-cols-3 gap-5'>
                    <MyMotion x={150}>
                        <div className='p-8 py-14 rounded bg-slate-800 bg-opacity-50 flex flex-col items-center justify-center space-y-4'>
                            <CountUp end={805} duration={5} enableScrollSpy className='font-bold text-3xl' />
                            <p>Enchanted Participants</p>
                        </div>
                    </MyMotion>
                    <div className='p-8 py-14 rounded bg-slate-800 bg-opacity-50 flex flex-col items-center justify-center space-y-4'>
                        <CountUp end={35} duration={5} enableScrollSpy className='font-bold text-3xl' />
                        <p>Total instructors</p>
                    </div>
                    <MyMotion x={-150}>
                        <div className='p-8 py-14 rounded bg-slate-800 bg-opacity-50 flex flex-col items-center justify-center space-y-4'>
                            <CountUp end={65} duration={5} enableScrollSpy className='font-bold text-3xl' />
                            <p>Total classes</p>
                        </div>
                    </MyMotion>
                </div>
            </div>

        </div>
    );
};

export default ServicesPage;