import bgImg from '../../assets/img/signinBg.jpg'
import { FaPen } from "react-icons/fa";

const MyClasses = () => {
    return (

        <div className="min-h-screen bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='my-container py-20 px-10 xl:px-5'>
                <div className="!overflow-x-auto xl:w-full bg-slate-900 bg-opacity-50 text-slate-200">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-slate-200 text-lg'>           
                                <th>#</th>
                                <th>Credential</th>
                                <th>Total enrolled student</th>
                                <th>status</th>
                                <th className='text-center'>Feedback</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>{0}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td> 20 </td>
                                <td>status</td>
                                <td className='text-center'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum delectus sint soluta minima! Voluptas iste iusto dignissimos expedita, omnis, blanditiis animi cumque quisquam aliquid impedit enim consectetur. Suscipit, alias veritatis! </td>
                                <th>  <button className="cmn-btn-one"> <FaPen></FaPen></button>    </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyClasses;