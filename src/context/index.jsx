import React, { createContext, useState, useContext, useReducer, useEffect } from 'react';

import { userServices } from '../utils'

export const GlobalContext = createContext();

const INITIALIZE = "INITIALIZE"
const SIGN_IN = "SIGN_IN"
const SIGN_OUT = "SIGN_OUT"

const initState = {
    isInitalize: false,
    isAuthenticated: false,
    user: null
}

export function reducer(state, action) {
    switch (action.type) {
        case INITIALIZE:
            const { isAuthenticated, user } = action.payload;
            return {
                ...state,
                isInitalize: true,
                isAuthenticated,
                user,
            };
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}

export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(initialize({isAuthenticated: false, user: null}));
            return;
        }

        const fetchData = async () => {
            const res = await userServices.getProfile();
            console.log(res);
            const data = res.data;
            if (data) {
                dispatch(initialize({isAuthenticated: true, user: data}));
            } else 
                dispatch(initialize({isAuthenticated: false, user: null}));
        }

        fetchData();
    }, [])

    return (
        <GlobalContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider')
    }
    return context;
}

export function signin(user) {
    return {
        type: SIGN_IN,
        payload: user
    }
}

export function signout() {
    return {
        type: SIGN_OUT
    }
}

export function initialize(payload) {
    return {
        type: INITIALIZE,
        payload 
    }
}