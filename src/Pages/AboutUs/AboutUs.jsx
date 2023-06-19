import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CommonCompoBanner from "../../HelpingComponent/CommonCompoBanner";
import CommonSectionTitle from "../../HelpingComponent/CommonSectionTitle";
import aboutImg from '../../assets/img/introductionImg.jpg'
import MyMotion from "../../HelpingComponent/MyMotion";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hook/UseAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const AboutUs = () => {
    const { axiosSecure } = UseAxiosSecure()
    const [activeTab, setActiveTab] = useState('instructor')

    const { isLoading, data: allUsers, error, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const result = await axiosSecure('/all-users')
            return result.data
        }
    })

    // Loading state
    if (isLoading) {
        return <div className="h-screen flex items-center justify-center">
            <ThreeCircles
                height="100"
                width="100"
                color="#e74c3c"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            /> </div>
    }

    const tabPanel = ['instructor', 'admin']

    return (
        <div>
            <CommonCompoBanner title={'About Us'} subtitle={'Unveiling the Magic Behind Our Story'}></CommonCompoBanner>

            {/* Mission and vision */}
            <div className="my-container grid grid-cols-2 gap-5 py-14">
                <div className="space-y-6">
                    <MyMotion y={100}>
                        <div className="space-y-3">
                            <h2 className="font-bold text-3xl">Mission</h2>
                            <p className="text-slate-300">Our mission is to inspire and empower individuals of all ages to unlock their magical potential and discover the joy of enchantment. Through immersive and engaging programs, we aim to nurture creativity, foster personal growth, and ignite a lifelong passion for the art of magic. We strive to create a supportive and inclusive community where participants can develop their skills, build confidence, and create unforgettable moments of wonder.</p>
                        </div>
                    </MyMotion>
                    <MyMotion y={-100}>
                        <div className="space-y-3">
                            <h2 className="font-bold text-3xl">Vision</h2>
                            <p className="text-slate-300">Our vision is to be the leading summer camp magic school, recognized globally for our exceptional programs and transformative experiences. We envision a world where magic is celebrated as a powerful art form that sparks imagination, cultivates curiosity, and connects people across cultures and generations. We aspire to cultivate a new generation of skilled magicians who will continue to push the boundaries of magic and inspire others with their performances, creativity, and dedication to the craft.</p>
                        </div>
                    </MyMotion>
                </div>
                <div>
                    <MyMotion x={-100}>
                        <img className='bg-slate-800 bg-blend-overlay rounded hover:scale-105 transition duration-500' src={aboutImg} alt="" />
                    </MyMotion>
                </div>
            </div>

            {/* Meet our team */}
            <div className="my-container py-16">
                <CommonSectionTitle title={'Meet our team'}></CommonSectionTitle>

                <Tabs>
                    <TabList className="flex gap-3 justify-center items-center mb-8">
                        <Tab><button onClick={() => setActiveTab('instructor')} className={`${activeTab === 'instructor' ? 'cmn-btn-one' : 'cmn-btn-one-outline'}`} >Instructor</button></Tab>
                        <Tab><button onClick={() => setActiveTab('admin')} className={`${activeTab === 'admin' ? 'cmn-btn-one' : 'cmn-btn-one-outline'}`} >Admin</button></Tab>
                    </TabList>



                    {
                        tabPanel.map((elem, ind) => {
                            return <TabPanel key={ind}>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        allUsers.filter(user => user.role === elem).map((userP, ind) => {
                                            return <div key={ind} className="card bg-slate-900 bg-opacity-50 relative group overflow-hidden">
                                                <img className="w-full h-72 rounded" src={userP.photo} alt="" />
                                                <div className="card-body">
                                                    <h2 className="font-bold text-3xl">{userP.name}</h2>
                                                </div>
                                                <ul className="flex gap-2 justify-center items-center text-3xl absolute inset-0 translate-y-36 bg-slate-800 bg-opacity-70 transition duration-500 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                                    <li><Link className=" transition duration-500 hover:scale-110 hover:text-orange-500"><FaFacebook></FaFacebook></Link></li>
                                                    <li><Link className=" transition duration-500 hover:scale-110 hover:text-orange-500"><FaTwitter></FaTwitter></Link></li>
                                                    <li><Link className=" transition duration-500 hover:scale-110 hover:text-orange-500"><FaInstagram></FaInstagram></Link></li>
                                                </ul>
                                            </div>
                                        })
                                    }
                                </div>
                            </TabPanel>
                        })
                    }

                </Tabs>

            </div>

        </div>
    );
};

export default AboutUs;