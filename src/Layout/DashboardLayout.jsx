/* eslint-disable no-unused-vars */
import { Link, Outlet } from "react-router-dom";
import UseRole from "../Hook/UseRole";
import { ThreeCircles } from "react-loader-spinner";
import logo from '../../src/assets/img/magicianLogo.png'
import { FaChalkboardTeacher, FaHome, FaRegWindowRestore, FaSearchPlus, FaUniversity, FaUserCog, FaUserGraduate, FaUserPlus, FaUserSecret, FaUsers, FaVenus } from "react-icons/fa";
import UseAuth from "../Hook/UseAuth";
import { Flip, JackInTheBox, Slide, Zoom } from "react-awesome-reveal";
import DashboardActiveLink from "../HelpingComponent/DashboardActiveLink";

const DashboardLayout = () => {
    const [isRole, isRoleLoading] = UseRole()
    const { user } = UseAuth()

    if (user?.email && isRoleLoading) {
        return <div className="h-screen flex items-center justify-center ">
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
            />
        </div>
    }



    return (
        <div className="drawer lg:drawer-open overflow-x-hidden">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content lg:ml-80">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="cmn-btn-one fixed top-2 right-2 drawer-button lg:hidden z-50">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 h-full bg-[#063a92] text-slate-200 font-bold space-y-3 text-lg fixed">
                    {/* Sidebar content here */}
                    <li>
                        <Link to={'/'} className="flex gap-2 justify-center">
                            <img src={logo} className="w-12 h-auto" />
                            <h2>WizCraft Academy</h2>
                        </Link>
                    </li>
                    <div className="space-y-2 !my-5 flex gap-5 justify-center items-center">
                        <JackInTheBox>
                            <img src={user?.photoURL} className="h-14 w-14 rounded-full" alt="" />
                            <div>
                                <h2 className="uppercase">{user?.displayName}</h2>
                                <p className="font-normal text-lg">{isRole}</p>
                            </div>
                        </JackInTheBox>
                    </div>

                    {
                        isRole === 'student' ?
                            <Slide left cascade><li><DashboardActiveLink to={'/dashboard-home'}> <FaUserGraduate></FaUserGraduate> Student Home</DashboardActiveLink></li>
                                <li><DashboardActiveLink to={'/my-selected-classes'}> <FaChalkboardTeacher></FaChalkboardTeacher> My selected classes</DashboardActiveLink></li>
                                <li><DashboardActiveLink to={'/my-enrolled-classes'}> <FaUniversity></FaUniversity> Enrolled classes</DashboardActiveLink></li>
                                <li><DashboardActiveLink to={'/payment-history'}> <FaUniversity></FaUniversity> Payment History </DashboardActiveLink></li></Slide>
                            : isRole === 'instructor' ?
                                <Slide left cascade><li><DashboardActiveLink to={'/dashboard-home'}> <FaHome></FaHome> Instructor Home </DashboardActiveLink></li>
                                    <li><DashboardActiveLink to={'/instructor/add-class'}> <FaSearchPlus></FaSearchPlus> Add Class</DashboardActiveLink></li>
                                    <li><DashboardActiveLink to={'/instructor/my-classes'}> <FaRegWindowRestore></FaRegWindowRestore> My Classes</DashboardActiveLink></li></Slide>
                                : isRole === 'admin' ?
                                    <Slide left cascade> <li><DashboardActiveLink to={'/dashboard-home'}> <FaUserSecret></FaUserSecret> Admin Home</DashboardActiveLink></li>
                                        <li><DashboardActiveLink to={'/admin/manage-classes'}> <FaVenus></FaVenus> Manage Classes</DashboardActiveLink></li>
                                        <li><DashboardActiveLink to={'/admin/manage-users'}> <FaUsers></FaUsers> Manage Users</DashboardActiveLink></li> </Slide> : ''
                    }


                    {/* TODO */}
                    {/* <div className="form-control w-52 absolute bottom-5 ">
                        <Slide>
                            <label className="cursor-pointer label justify-center gap-2">
                                <span className="label-text !text-white">Toogle theme</span>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </label>
                        </Slide>
                    </div> */}

                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;