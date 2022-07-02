import { createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
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

const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
}


useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
    })
    return () => unSubscribe()
}, [])

    return (
        <AuthContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}