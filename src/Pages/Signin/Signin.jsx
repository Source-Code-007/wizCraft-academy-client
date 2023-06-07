import { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hook/UseAuth";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImg from '../../assets/img/signinBg.jpg'
import signinLottie from '../../../public/lottieAnimation/signin-lottie.json'

const Signin = () => {
    const { signinUserWithEmailPassFunc, signinUserWithEmailFunc, signinUserWithGithubFunc } = UseAuth()

    const [isShowPass, setIsShowPass] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const { register, handleSubmit, watch, formState = { errors } } = useForm()
    const handleSigninFunc = form => {
        const { email, password } = form
        console.log(email, password);
    }



    // handle Google Signin Func
    const handleGoogleSigninFunc = () => {

    }

    // handle Github Signin Func
    const handleGithubSigninFunc = () => {

    }

    return (
        <div className="bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='min-h-screen grid grid-col-1 md:grid-cols-2 gap-4 xl:gap-8 items-center my-container'>
                <form onSubmit={handleSubmit(handleSigninFunc)} className='space-y-3 p-10 bg-slate-900 bg-opacity-75 shadow rounded'>
                    <h2 className='font-bold text-3xl text-white'>Signin to your account</h2>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">email</label>
                        <input type='email' id='email' className='my-inp' {...register("email")} placeholder='Your email here' />
                    </div>

                    <div className='relative'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">Confirm Password</label>
                        <input type={`${isShowPass ? 'text' : 'password'}`} id='password' className='my-inp' {...register("password", { required: true })} placeholder='••••••••' />
                        <span className='absolute right-2 top-4 cursor-pointer' onClick={() => setIsShowPass(!isShowPass)}> {isShowPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>} </span>
                        {error.password && <p className='text-red-500'>This field is required</p>}
                    </div>


                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" name='remember' aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-slate-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    {error && <p className='text-red-500'>*{error}</p>}
                    {success && <p className='text-green-500'>{success}</p>}

                    <button className='cmn-btn-one w-full' type='submit'>Signin</button>
                    <p className="text-sm font-light text-slate-300">
                        New user? <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup</Link>
                    </p>

                </form>

                <Lottie animationData={signinLottie} loop={true} className='h-full w-full' />
            </div>
        </div>
    );
};

export default Signin;