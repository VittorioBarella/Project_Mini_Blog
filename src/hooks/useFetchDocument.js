import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchDocument = (docCollection, search = null, uid = null) => {

    const [documents, setDcouments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {

                let q;

                // search
                // dashboard

                q = await query(collectionRef, orderBy("createAt", "desc"));

                await onSnapshot(q, (QuerySnapshot) => {
                    setDcouments(
                        QuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error.message);

                setLoading(false);
            }
        }

        loadData();
    }, [docCollection, search, uid, cancelled]);


    useEffect(() => {
        return () => setCancelled(true);
    }, []);


    return { documents, loading, error };
};