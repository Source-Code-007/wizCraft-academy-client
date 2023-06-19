import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMailBulk, FaMailchimp, FaPhone, FaTelegram, FaTwitter } from 'react-icons/fa';
import CommonSectionTitle from '../../../HelpingComponent/CommonSectionTitle';
import contactUsBg from '../../../assets/img/contact-us-bg.svg'

const ContactUs = () => {
    return (
        <div className='my-container my-28'>
            <CommonSectionTitle title={'Get in touch'} subtitle={'Contact us for help, questions or to join the team!'}></CommonSectionTitle>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-12 lg:col-span-6 xl:col-span-4 bg-cover  rounded p-8 space-y-16' style={{ backgroundImage: `url(${contactUsBg})` }}>
                    <div className='space-y-3'>
                        <h2 className='font-bold text-3xl'>Contact Information</h2>
                        <p>Fill up the form and our team will be get back to you within 24 hours!</p>
                    </div>
                    <div className='space-y-8'>
                        <p className='flex gap-2 items-center text-slate-300'><FaPhone></FaPhone> +8801XXXXXXXXX </p>
                        <p className='flex gap-2 items-center text-slate-300'><FaMailBulk></FaMailBulk> utsho926@gmail.com </p>
                        <p className='flex gap-2 items-center text-slate-300'><FaLocationArrow></FaLocationArrow> 102 Street, 4132 New York </p>
                    </div>
                    <ul className='flex gap-4'>
                        <li><a href="#" className='inline-block hover:scale-125 transition duration-500'><FaFacebook></FaFacebook></a></li>
                        <li><a href="#" className='inline-block hover:scale-125 transition duration-500'><FaTwitter></FaTwitter></a></li>
                        <li><a href="#" className='inline-block hover:scale-125 transition duration-500'><FaInstagram></FaInstagram></a></li>
                        <li><a href="#" className='inline-block hover:scale-125 transition duration-500'><FaLinkedin></FaLinkedin></a></li>
                    </ul>
                </div>
                <div className='col-span-12 lg:col-span-6 xl:col-span-8 space-y-5'>
                    <div className='flex gap-5'>
                        <input type="text" className='my-inp' placeholder='First name' />
                        <input type="text" className='my-inp' placeholder='Last name' />
                    </div>
                    <div className='flex gap-5'>
                        <input type="text" className='my-inp' placeholder='Your name here' />
                        <input type="email" className='my-inp' placeholder='Your email here' />
                    </div>
                    <textarea className="my-inp w-full h-60" name="comment" placeholder="Your comment here"></textarea>
                    <button className='cmn-btn-one'>Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;