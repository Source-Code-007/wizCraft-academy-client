/* eslint-disable no-unused-vars */
import { Link, Outlet } from "react-router-dom";
import UseRole from "../Hook/UseRole";
import { ThreeCircles } from "react-loader-spinner";
import ActiveLink from "../HelpingComponent/ActiveLink";
import logo from '../../src/assets/img/magicianLogo.png'
import { FaChalkboardTeacher, FaCreativeCommons, FaSchool, FaUniversity, FaUserGraduate } from "react-icons/fa";
import UseAuth from "../Hook/UseAuth";
import { Fade, JackInTheBox, Roll, Rotate, Slide, Zoom } from "react-awesome-reveal";

const DashboardLayout = () => {
    const [isRole, isRoleLoading] = UseRole()
    const { user } = UseAuth()

    if (isRoleLoading) {
        return <div className="h-screen flex items-center justify-center bg-[#063a92]">
            <ThreeCircles
                height="100"
                width="100"
                color="#02066f"
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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center bg-[#02066f] h-screen">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="cmn-btn-one absolute top-2 right-2 drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-[#063a92] text-slate-200 font-bold space-y-3 text-lg">
                    {/* Sidebar content here */}
                    <li>
                        <Zoom>
                            <Link to={'/'} className="flex gap-2 justify-center">
                                <img src={logo} className="w-16 h-auto" />
                                <h2>WizCraft Academy</h2>
                            </Link>
                        </Zoom>
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
                            <Slide><li><ActiveLink to={'/dashboard/student'}> <FaUserGraduate></FaUserGraduate> Student Home</ActiveLink></li>
                                <li><ActiveLink to={'/my-selected-class'}> <FaChalkboardTeacher></FaChalkboardTeacher> My selected classes</ActiveLink></li>
                                <li><ActiveLink to={'/my-enrolled-class'}> <FaUniversity></FaUniversity> Enrolled classes</ActiveLink></li></Slide>
                            : isRole === 'instructor' ?
                                <Slide><li><ActiveLink to={'/dashboard/instructor'}>Instructor Home</ActiveLink></li>
                                    <li><ActiveLink to={'/instructor/add-class'}>Add Class</ActiveLink></li>
                                    <li><ActiveLink to={'/instructor/my-classes'}>My Classes</ActiveLink></li></Slide>
                                : isRole === 'admin' ? 
                                    <Slide> <li><ActiveLink to={'/dashboard-admin'}>Admin Home</ActiveLink></li>
                                        <li><ActiveLink to={'/admin/manage-classes'}>Manage Classes</ActiveLink></li>
                                        <li><ActiveLink to={'/admin/manage-users'}>Manage Users</ActiveLink></li> </Slide> : ''
                    }


                    {/* TODO */}
                    <div className="form-control w-52 absolute bottom-5 ">
                        <Slide>
                            <label className="cursor-pointer label justify-center gap-2">
                                <span className="label-text !text-white">Toogle theme</span>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </label>
                        </Slide>
                    </div>

                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;