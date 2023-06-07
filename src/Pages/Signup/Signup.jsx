import { useForm } from 'react-hook-form';
import signupLottie from '../../../public/lottieAnimation/signup-lottie.json'
import UseAuth from "../../Hook/UseAuth";
import Lottie from "lottie-react";
import './Signup.css'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { createUserWithEmailPassFunc, updateProfileFunc, signoutUserFunc } = UseAuth()
    const [isPassShow, setIsPassShow] = useState(false)
    const [isConfirmPassShow, setIsConfirmPassShow] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = form => {
        const { name, photo, email, password, confirmPassword, terms } = form
        console.log(form);

        if (!terms.checked) {
            setError('*Please check terms and condition first')
            return
        }
        if (password !== confirmPassword) {
            setError('*Your password is not match!')
            return
        }

        // password regexp
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")
            return
        }

        createUserWithEmailPassFunc(email, password)
            .then(res => {
                // const currUser = res.user
                updateProfileFunc(name, photo).then(() => {
                    setSuccess('user created successfully')
                    signoutUserFunc().then(() => { }).catch(e => console.log(e.message))
                    navigate('/signin')
                }).catch(e => setError(e.message))

            }).catch(e => {
                if (e.code === 'auth/email-already-in-use') {
                    setError('Email address is already in use. Please use a different email or try logging in.')
                } else {
                    setError(e.message)
                }
            })
    };

    return (
        <div className="bg-blue-200">
            <div className='min-h-screen grid grid-col-1 md:grid-cols-2 gap-4 xl:gap-8 items-center my-container'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 p-10 bg-slate-50 shadow rounded'>
                    <input type='text' className='my-inp' {...register("name")} placeholder='Your name here' />
                    <input type='url' className='my-inp' {...register("photo")} placeholder='Your photo URL here' />
                    <input type='email' className='my-inp' {...register("email")} placeholder='Your email here' />

                    <div className='relative'>
                        <input type={`${isPassShow ? 'text' : 'password'}`} className='my-inp' {...register("password", { required: true })} placeholder='Your password here' />
                        <span className='absolute right-2 top-4 cursor-pointer' onClick={() => setIsPassShow(!isPassShow)}> {isPassShow ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>} </span>
                        {errors.password && <p className='text-red-500'>This field is required</p>}
                    </div>
                    <div className='relative'>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type={`${isConfirmPassShow ? 'text' : 'password'}`} id='confirmPassword' className='my-inp' {...register("confirmPassword", { required: true })} placeholder='Confirm password' />
                        <span className='absolute right-2 top-11 cursor-pointer' onClick={() => setIsConfirmPassShow(!isConfirmPassShow)}> {isConfirmPassShow ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>} </span>
                        {errors.password && <p className='text-red-500'>This field is required</p>}
                    </div>


                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" name='terms' aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms">Accept <Link className='link-hover link-primary'>Terms and Condition</Link></label>
                            </div>
                        </div>
                    </div>
                    {error && <p className='text-red-500'>*{error}</p>}
                    {success && <p className='text-green-500'>{success}</p>}


                    <button className='cmn-btn-one' type='submit'>Submit</button>
                    <p className="text-sm font-light">
                        Already have an account? <Link to='/signin' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                    </p>
                </form>

                <Lottie animationData={signupLottie} loop={true} className='h-fulfl w-full' />
            </div>
        </div>
    );
};

export default Signup;