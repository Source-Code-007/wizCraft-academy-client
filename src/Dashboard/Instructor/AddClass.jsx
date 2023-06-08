// - **Add a Class:** This page will have a form with the following fields:
//         - Class name
//         - Class Image
//         - Instructor name (read-only) **(use the displayName value of logged in user/instructor)**
//         - Instructor email (read-only) **(use the email value of logged in user/instructor)**
//         - Available seats
//         - Price
//         - Add button
//         - When creating a class on the database, the value of the status field will be pending.

import { useForm } from 'react-hook-form';
import UseAuth from "../../Hook/UseAuth";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../../assets/img/signinBg.jpg'
import axios from 'axios';

const AddClass = () => {

    const { user, setAuthLoading } = UseAuth()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleSignupFunc = form => {
        form.instructorName = user?.displayName
        form.instructorEmail = user?.email

        const {instructorName, instructorEmail, className, classImg, availableSeats, price} = form
        console.log(form);


    };


    return (
        <div className="bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='min-h-screen my-container flex items-center justify-center'>
                <form onSubmit={handleSubmit(handleSignupFunc)} className='space-y-3 p-10 w-full bg-slate-900 bg-opacity-75 shadow rounded'>
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
                        <input type='text' id='classImg' className='my-inp' {...register("classImg", { required: true })} placeholder='Your class Image here' />
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
        </div>
    );
};

export default AddClass;