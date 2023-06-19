/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";
import axios from "axios";

const auth = getAuth(app)
export const authContextData = createContext()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const AuthContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [authLoading, setAuthLoading] = useState(true)

    // create user with email and password func
    const createUserWithEmailPassFunc = (email, password) => {
        setAuthLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update profile info func
    const updateProfileFunc = (name, photo) => {
        setAuthLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }



    // signin user with email and password func
    const signinUserWithEmailPassFunc = (email, password) => {
        setAuthLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // signin user with google func
    const signinUserWithEmailFunc = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // signin user with github func
    const signinUserWithGithubFunc = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // signout user func
    const signoutUserFunc = () => {
        setAuthLoading(true)
        return signOut(auth)
    }



    // user monitoring
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currUser => {
            if (currUser) {
                setAuthLoading(false)
                // JWT create
                axios.post(`${import.meta.env.VITE_API_URL}/create-jwt`, {email: currUser.email})
                .then((res) => {
                    localStorage.setItem('jwt-token', res.data);
                    setUser(currUser);
                    setAuthLoading(false);
                  })
                  .catch((e) => {
                    console.log(e.message);
                    setUser(currUser);
                    setAuthLoading(false);
                  });
            } else {
                localStorage.removeItem('jwt-token')
                setUser(currUser)
                setAuthLoading(false)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const authContextObj = {
        user, setUser, authLoading, setAuthLoading, createUserWithEmailPassFunc, updateProfileFunc, signinUserWithEmailPassFunc, signinUserWithEmailFunc, signinUserWithGithubFunc, signoutUserFunc
    }
    return (
        <authContextData.Provider value={authContextObj}>
            {children}
        </authContextData.Provider>
    );
};

export default AuthContext;