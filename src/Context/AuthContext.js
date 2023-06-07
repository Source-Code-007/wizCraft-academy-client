import { createContext } from "react";

const authContextData = createContext()
const AuthContext = ({children}) => {




    const authContextObj = {
        name: 'Utsho'
    }
    return (
        <authContextData.Provider value={authContextObj}>
            {children}
        </authContextData.Provider>
    );
};

export default AuthContext;