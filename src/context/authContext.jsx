import { createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../Firebase'; 


// creacion del contexto
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export function AuthProvider({children}){

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const signup = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password)  

const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

const logout = () => signOut(auth)

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
    })
    return () => unSubscribe()
}, [])

    return (
        <AuthContext.Provider value={{signup, login, user, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}