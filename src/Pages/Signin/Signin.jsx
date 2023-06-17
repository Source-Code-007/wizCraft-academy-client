import { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hook/UseAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import bgImg from '../../assets/img/signinBg.jpg'
import signinLottie from '../../../public/lottieAnimation/signin-lottie.json'
import axios from "axios";

const Signin = () => {
    const { signinUserWithEmailPassFunc, setAuthLoading, setUser, signinUserWithEmailFunc, signinUserWithGithubFunc } = UseAuth()

    const [isShowPass, setIsShowPass] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const handleSigninFunc = form => {
        setError('')
        const { email, password } = form

        // password regexp
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")
            return
        }

        signinUserWithEmailPassFunc(email, password).then(res => {
            const currUser = res.user
            setUser(currUser)
            setSuccess('user signin by email & password!')
            navigate(from || '/')
            reset()
        }).catch(e => {
            setAuthLoading(false)
            if (e.code === "auth/user-not-found") {
                setError('User not found')
            } else if (e.code === "auth/invalid-email") {
                setError('Invalid email')
            } else if (e.code === "auth/wrong-password") {
                setError('wrong password')
            } else if (e.code === "auth/too-many-requests") {
                setError("Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.")
            } else {
                setError(e.message)
            }
        })
    }

    // signin User With Email Func
    const handleGoogleSigninFunc = () => {
        setError('')
        signinUserWithEmailFunc().then(res => {
            const currUser = res.user

            // user stored in database 
            const user = { name: currUser.displayName, photo: currUser.photoURL, email: currUser.email, date: new Date(), role: 'student' }
            axios.post('http://localhost:3000/users', { user })
                .then(res => {
                    setUser(currUser)
                    setSuccess('user signin by google')
                    navigate(from || '/')
                }).catch(e => console.log(e.message))

        }).catch(e => {
            setAuthLoading(false)
            if (e.code === 'auth/account-exists-with-different-credential') {
                setError('account exists with different credential')
                return
            }
            setError(e.message)
        })
    }

    // signin User With Github Func
    const handleGithubSigninFunc = () => {
        setError('')
        signinUserWithGithubFunc().then(res => {

            const currUser = res.user
            // user stored in database 
            const user = { name: currUser.displayName, photo: currUser.photoURL, email: currUser.email, date: new Date(), role: 'student' }
            axios.post('http://localhost:3000/users', { user })
                .then(res => {
                    setUser(currUser)
                    setSuccess('user signin by github!')
                    navigate(from || '/')
                }).catch(e => console.log(e.message))

        }).catch(e => {
            setAuthLoading(false)
            if (e.code === 'auth/account-exists-with-different-credential') {
                setError('account exists with different credential')
                return
            }
            setError(e.message)
        })
    }


    return (
        <div className="bg-cover bg-center bg-slate-800 bg-blend-overlay" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='min-h-screen grid grid-col-1 md:grid-cols-2 gap-4 xl:gap-8 items-center my-container'>

                <div className="p-10 bg-slate-900 bg-opacity-75 shadow rounded">
                    <form onSubmit={handleSubmit(handleSigninFunc)} className='space-y-3'>
                        <h2 className='font-bold text-3xl text-white mb-6'>Signin to your account</h2>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">email</label>
                            <input type='email' id='email' className='my-inp' {...register("email", { required: true })} placeholder='Your email here' />
                            {errors.email && <p className='text-red-500'>This field is required</p>}
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">Password</label>
                            <input type={`${isShowPass ? 'text' : 'password'}`} id='password' className='my-inp' {...register("password", { required: true })} placeholder='••••••••' />
                            <span className='absolute right-2 top-11 text-slate-300 cursor-pointer' onClick={() => setIsShowPass(!isShowPass)}> {isShowPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>} </span>
                            {errors.password && <p className='text-red-500'>This field is required</p>}
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
                            <a href="#" className="text-sm font-medium text-slate-300 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>

                        {error && <p className='text-red-500'>*{error}</p>}
                        {success && <p className='text-green-500'>{success}</p>}

                        <button className='cmn-btn-one w-full' type='submit'>Signin</button>
                        <p className="text-sm font-light text-slate-300">
                            New user? <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup</Link>
                        </p>

                    </form>

                    <div className='flex items-center my-2'>
                        <hr className="flex-grow" />
                        <span className="mx-2 text-slate-300">Or sign in with</span>
                        <hr className="flex-grow" />
                    </div>
                    <div className='flex justify-evenly gap-4 flex-col sm:flex-row'>
                        <button onClick={handleGoogleSigninFunc} className='cmn-btn-one flex items-center justify-center'> <FaGoogle className='mr-2'></FaGoogle> Google</button>
                        <button onClick={handleGithubSigninFunc} className='cmn-btn-one flex items-center justify-center'> <FaGithub className='mr-2'></FaGithub> Github</button>
                    </div>

                </div>

                <Lottie animationData={signinLottie} loop={true} className='h-full w-full' />
            </div>
        </div>
    );
};

export default Signin;