import { createContext, useContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase'; 

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export function AuthProvider({children}){

const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password)  

const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

    return (
        <AuthContext.Provider value={{signup, login}}>
            {children}
        </AuthContext.Provider>
    )
}