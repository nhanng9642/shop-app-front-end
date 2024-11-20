/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Loading } from "@/pages/status";

export function GuestRoute({ children }) {
    const { isInit, isAuthenticated, user } = useAuth();

    if (!isInit) {
        return <Loading />
    }

    if (isAuthenticated && user) {
        if (user.role == 'admin') {
            return (
                <Navigate to="/admin/home" replace/>
            )
        } 
        return (
            <Navigate to="/user" replace/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}
