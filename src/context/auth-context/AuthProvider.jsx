import { useEffect, useReducer } from "react";
import { userServices } from "@/services";
import { AuthContext } from "./AuthContext";

const INIT = "INIT", LOGIN = "LOGIN", LOGOUT = "LOGOUT";

const reducer = (state, action) => {
    switch (action.type) {
        case INIT:
            return { ...state, isInit: true, isAuthenticated: false, user: null };
        case LOGIN:
            return { ...state, isInit: true, isAuthenticated: true, user: action.payload };
        case LOGOUT:
            return { ...state, isInit: true, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

const initialState = {
    isAuthenticated: false,
    user: null,
    isInit: false
};

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const authen = async () => {
            const token = localStorage.getItem("access_token");

            if (token) {
                try {
                    const { user } = await userServices.getProfile();
                    dispatch({ type: LOGIN, payload: user });
                } catch {
                    dispatch({ type: INIT });
                }
            } else {
                dispatch({ type: INIT });
            }
        }
    
        authen();
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}