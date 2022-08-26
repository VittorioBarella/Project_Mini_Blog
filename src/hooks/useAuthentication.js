import { db } from "../firebase/config";
import {
    createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already registered.";
            } else {
                systemErrorMessage = "An error has occurred, please try again later.";
            }

            setError(systemErrorMessage);
        }

        setLoading(false);
    };

    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Incorrect password.";
            } else {
                systemErrorMessage = "An error has occurred, please try again later.";
            }

            console.log(systemErrorMessage);

            setError(systemErrorMessage);
        }

        console.log(error);

        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        logout,
        login,
        loading,
    };
};
