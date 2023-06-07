/* eslint-disable no-unused-vars */
import { Link, Outlet } from "react-router-dom";
import UseRole from "../Hook/UseRole";
import { ThreeCircles } from "react-loader-spinner";
import ActiveLink from "../HelpingComponent/ActiveLink";
import logo from '../../src/assets/img/magicianLogo.png'
import { FaChalkboardTeacher, FaCreativeCommons, FaSchool, FaUniversity, FaUserGraduate } from "react-icons/fa";
import UseAuth from "../Hook/UseAuth";

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
                        <Link to={'/'} className="flex gap-2 justify-center">
                            <img src={logo} className="w-16 h-auto" />
                            <h2>WizCraft Academy</h2>
                        </Link>
                    </li>

                    <div className="space-y-2 !my-3 text-center">
                        <img src={user?.photoURL} className="h-14 w-14 mx-auto rounded-full" alt="" />
                        <h2 className="uppercase">{user?.displayName}</h2>
                    </div>
                    {
                        isRole === 'student' ?
                            <> <li><ActiveLink to={'/dashboard/student'}> <FaUserGraduate></FaUserGraduate> Student Home</ActiveLink></li>
                                <li><ActiveLink to={'/my-selected-class'}> <FaChalkboardTeacher></FaChalkboardTeacher> My selected classes</ActiveLink></li>
                                <li><ActiveLink to={'/my-enrolled-class'}> <FaUniversity></FaUniversity> Enrolled classes</ActiveLink></li> </>
                            : isRole === 'instructor' ?
                                <> <li><ActiveLink to={'/student-dashboard-home'}>Student Home</ActiveLink></li>
                                    <li><ActiveLink to={'/my-selected-class'}>My selected classes</ActiveLink></li>
                                    <li><ActiveLink to={'/my-enrolled-class'}>Enrolled classes</ActiveLink></li> </>
                                : isRole === 'admin' ?
                                    <> <li><ActiveLink to={'/student-dashboard-home'}>Student Home</ActiveLink></li>
                                        <li><ActiveLink to={'/my-selected-class'}>My selected classes</ActiveLink></li>
                                        <li><ActiveLink to={'/my-enrolled-class'}>Enrolled classes</ActiveLink></li> </> : ''
                    }


                    {/* TODO */}
                    <div className="form-control w-52 absolute bottom-5 ">
                        <label className="cursor-pointer label justify-center gap-2">
                            <span className="label-text !text-white">Toogle theme</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </label>
                    </div>

                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;