/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../Hook/UseAuth';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import { Puff, ThreeCircles } from 'react-loader-spinner';
import bgImg from '../../../assets/img/signinBg.jpg'

const PaymentHistory = () => {
    const { user } = UseAuth()
    const { axiosSecure } = UseAxiosSecure()

    const { data: paymentInfo, refetch, isLoading, error } = useQuery({
        queryKey: ['paymentHistoryInfo'],
        queryFn: async () => {
            const res = await axiosSecure(`/get-payment-info?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email && !user.authLoading
    })


    return (
        <div className="min-h-screen bg-slate-800 bg-blend-overlay bg-center bg-cover" style={{ backgroundImage: `url(${bgImg})` }}>
            {
                isLoading ? <div className="h-screen flex items-center justify-center">
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
                    : !paymentInfo.length ? <div className="h-screen flex items-center justify-center"><h2 className='text-4xl text-white font-bold bg-red-500 p-3'>There is no payment history!</h2></div>
                        : <div className="overflow-x-auto w-5/6 mx-auto py-16">

                            <div className="bg-slate-700 bg-opacity-50 text-slate-200 rounded shadow-inner shadow-slate-600">
                                {/* <h2 className="font-bold text-3xl my-3">Total Payment: ${paymentInfo.reduce((sum, pInfo)=> sum+pInfo.amount, 0)/100} </h2> */}
                                <table className="table w-full">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-white'>
                                            <th>#</th>
                                            {/* <th>User</th> */}
                                            <th>Name</th>
                                            <th>Class</th>
                                            <th>trxId</th>
                                            <th>Total Price</th>
                                            <th>Payment Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {paymentInfo?.map((pInfo, ind) => {
                                            const { _id, trxId, email, className, user, amount, date } = pInfo

                                            const dateP = new Date(date).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })
                                            return <tr key={_id}>
                                                <td>{ind + 1}</td>
                                                <td>{user}</td>
                                                <td>{className}</td>
                                                <td>{trxId}</td>
                                                <td>{amount / 100}</td>
                                                <td>{dateP}</td>
                                            </tr>
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </div>
            }


        </div>
    );
};

export default PaymentHistory;