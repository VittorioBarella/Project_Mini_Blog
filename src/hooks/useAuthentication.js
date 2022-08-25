import {
    createUserWithEmailAndPassword, getAuth, updateProfile
} from 'firebase/auth';

import { useEffect, useState } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
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
        setError(null);

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });


            setLoading(false);

            return user;
        } catch (error) {

            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "Password must contain at least 6 characters.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already registered.";
            } else {
                systemErrorMessage = "An error has occurred, please try later.";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
    };
};