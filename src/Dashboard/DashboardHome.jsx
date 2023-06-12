import { useEffect, useState } from "react";
import UseAxiosSecure from "../Hook/UseAxiosSecure";
import UseRole from "../Hook/UseRole";
import { ThreeCircles } from "react-loader-spinner";
import UseAuth from "../Hook/UseAuth";
// import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Legend, Area, Bar } from 'recharts';


const DashboardHome = () => {
    const { user } = UseAuth()
    const { axiosSecure } = UseAxiosSecure()
    const [isRole, isRoleLoading] = UseRole()
    const [statsData, setStatsData] = useState('')
    const [statsDataLoading, setStatsLoadingData] = useState(true)

    useEffect(() => {
        axiosSecure(`/dashboard-stats?email=${user?.email}&&role=${isRole}`).then(res => {
            console.log('hey');
            setStatsData(res.data)
            setStatsLoadingData(false)
        }
        ).catch(e => console.log(e.message))
    }, [axiosSecure, user?.email, isRole])

    if (isRoleLoading || statsDataLoading) {
        return <div className="h-screen flex items-center justify-center">
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
            /> </div>
    }


    const studentData = [
        { name: 'Total Enrollment', pv: statsData.totalEnrollments },
        { name: 'Total Expend', pv: statsData.totalExpend },
        { name: 'Total Payments', pv: statsData?.totalPayments },
    ];

    const instructorData = [
        { name: 'Rank', pv: statsData?.rank },
        { name: 'Total enrolled student', pv: statsData.totalEnrolledStudents },
        { name: 'Total earning', pv: statsData.totalEarning },
    ];

    const adminData = [
        { name: 'Total students', pv: statsData.totalStudents },
        { name: 'Total enrolled students', pv: statsData.totalEnrolled },
        { name: 'Total earning', pv: statsData?.totalEarning },
    ];

    const isStudent = isRole === 'student'
    const isInstructor = isRole === 'instructor'
    const isAdmin = isRole === 'admin'

    return (
        <div className="py-10 my-container">

            <div className="stats shadow w-full py-16 text-center">

                <div className="stat">
                    <div className="stat-title">{isStudent? 'Total enrollments': isInstructor? 'Rank': isAdmin? 'Total students' : ''}</div>
                    <div className="stat-value text-primary">{isStudent? statsData?.totalEnrollments: isInstructor? statsData?.rank: isAdmin? statsData?.totalStudents : ''}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">{isStudent? 'Total Expend': isInstructor? 'Total enrolled students' : isAdmin? 'Total enrolled students' : '' }</div>
                    <div className="stat-value text-secondary">{isStudent? statsData?.totalExpend: isInstructor? statsData?.totalEnrolledStudents: isAdmin? statsData?.totalEnrolled : ''}</div>
                </div>

                <div className="stat">
                    <div className="stat-value">{isStudent? statsData?.totalPayments: isInstructor? statsData?.totalEarning : isAdmin? statsData?.totalEarning : '' }</div>
                    <div className="stat-title">{isStudent? 'Total payment': isInstructor? 'Total earning' : isAdmin? 'Total earning' : '' }</div>
                </div>

            </div>

            <div style={{ width: '80%', height: 500, margin: '50px auto' }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={isRole==='student'? studentData : isRole==='instructor'? instructorData : isRole==='admin'? adminData : ''}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#d2cdcd2e" />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                        <Bar dataKey="pv" barSize={50} fill="#e74c3c" />
                        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default DashboardHome;