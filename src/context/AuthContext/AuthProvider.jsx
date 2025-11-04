import {  useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,provider} from '../../firebase/firebase';
import { AuthContext } from './AuthContext';
import {toast} from "react-toastify";
import { signInWithPopup , signOut} from 'firebase/auth'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });

        return unsubscribe;
    }, []);

    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User:", result.user);
            return result.user;
        } catch (error) {
            console.error(error);
            toast.error(AuthErrorFormat(error.code));
            throw error;
        }
    };

    const logout = async ()=>{
        await signOut(auth)
    }

    return  (
        <AuthContext.Provider value={{ user ,signUpWithGoogle,logout }}>
            {children}
        </AuthContext.Provider>
    )
};
