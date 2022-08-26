import { collection, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useReducer, useState } from "reducer";
import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                error: null
            };
        case "INSERTED_DOC":
            return {
                loading: false,
                error: null
            };
        case "ERROR":
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const useInsertDocument = (docColletion) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCacelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const insertDocument = async (document) => {
        checkCacelBeforeDispatch({
            type: "LOADING",
        });
        try {

            const newDocument = { ...document, createAt: Timestamp.now() };

            const insertedDocument = await addDoc(
                collection(db, docColletion),
                newDocument
            );

            checkCacelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            });

        } catch (error) {
            checkCacelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertDocument, response };
};