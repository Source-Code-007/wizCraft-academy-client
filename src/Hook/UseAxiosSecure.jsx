/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
const UseAxiosSecure = () => {
    const navigate = useNavigate()
    const { signoutUserFunc, setAutLoading } = UseAuth()

    useEffect(() => {
        axiosSecure.interceptors.request.use(req => {
            const token = localStorage.getItem('jwt-token')
            if (token) {
                req.headers.authorization = `Bearer ${token}`
            }
            return req
        })

        axiosSecure.interceptors.response.use(
            res => res,
            err => {
                if (err.response && (err.response.status === 403)) {
                    signoutUserFunc().then(() => { }).catch(e => { })
                    navigate('/signin')
                }
                return Promise.reject(err)
            }
        )
    }, [navigate, signoutUserFunc, setAutLoading])




    return { axiosSecure }
};

export default UseAxiosSecure;