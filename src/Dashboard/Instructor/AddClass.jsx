/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import UseAuth from "../../Hook/UseAuth";
import { useState } from 'react';
import bgImg from '../../assets/img/signinBg.jpg'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const AddClass = () => {
    const { user } = UseAuth()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleAddClassFunc = form => {
        form.instructorName = user?.displayName
        form.instructorEmail = user?.email

        const { instructorName, instructorEmail, className, classImg, availableSeats, price } = form
        const myClass = { instructorName, instructorEmail, className, classImg, availableSeats: parseInt(availableSeats), price: parseInt(price), status:'pending' }

        // store class in database
        axios.post('http://localhost:3000/instructor/add-class', { myClass })
            .then(res => {
                if(res.data.insertedId){
                    toast.success('Class added successfully!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
            })
            .catch(e => setError(e.message))

    };


    return (
        <div className="bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='min-h-screen my-container flex items-center justify-center'>
                <form onSubmit={handleSubmit(handleAddClassFunc)} className='space-y-3 p-10 w-full bg-slate-900 bg-opacity-75 shadow rounded'>
                    <h2 className='font-bold text-3xl text-white'>Add a class</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Instructor Name</label>
                            <input type='text' className='my-inp' id='name' defaultValue={user?.displayName} disabled {...register("instructorName")} />
                        </div>

                        <div>
                            <label htmlFor="photo" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Instructor email</label>
                            <input type='url' className='my-inp' id='photo' disabled defaultValue={user?.email} {...register("instructorEmail")} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="className" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Class name</label>
                        <input type='text' id='className' className='my-inp' {...register("className", { required: true })} placeholder='Your class name here' />
                        {errors.className && <p className='text-red-500'>This field is required</p>}
                    </div>

                    <div>
                        <label htmlFor="classImg" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Class image</label>
                        <input type='url' id='classImg' className='my-inp' {...register("classImg", { required: true })} placeholder='Your class Image here' />
                        {errors.classImg && <p className='text-red-500'>This field is required</p>}
                    </div>

                    <div>
                        <label htmlFor="availableSeats" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Available seats</label>
                        <input type='text' id='classImg' className='my-inp' {...register("availableSeats", { required: true })} placeholder='Available seats' />
                        {errors.availableSeats && <p className='text-red-500'>This field is required</p>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-400 dark:text-white">Price</label>
                        <input type='number' id='classImg' className='my-inp' {...register("price", { required: true })} placeholder='Price...' />
                        {errors.price && <p className='text-red-500'>This field is required</p>}
                    </div>


                    {error && <p className='text-red-500'>*{error}</p>}
                    {success && <p className='text-green-500'>{success}</p>}

                    <button className='cmn-btn-one w-full !my-6' type='submit'>Add class</button>

                </form>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default AddClass;