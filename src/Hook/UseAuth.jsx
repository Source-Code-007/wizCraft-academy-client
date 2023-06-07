import { useContext } from "react";
import { authContextData } from "../Context/AuthContext";

const UseAuth = () => {
    const { user, setUser, authLoading, setAuthLoading, createUserWithEmailPassFunc, updateProfileFunc, signinUserWithEmailPassFunc, signinUserWithEmailFunc, signinUserWithGithubFunc, signoutUserFunc } = useContext(authContextData)

    
    return { user, setUser, authLoading, setAuthLoading, createUserWithEmailPassFunc, updateProfileFunc, signinUserWithEmailPassFunc, signinUserWithEmailFunc, signinUserWithGithubFunc, signoutUserFunc }
};

export default UseAuth;