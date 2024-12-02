/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Loading } from "@/pages/status";

const ROLE_ADMIN = 'ROLE_ADMIN';
export function GuestRoute({ children }) {
    const { isInit, isAuthenticated, user } = useAuth();

    if (!isInit) {
        return <Loading />
    }

    if (isAuthenticated && user) {
        if (user.role == ROLE_ADMIN) {
            return (
                <Navigate to="/admin/home" replace/>
            )
        } 
        return (
            <Navigate to="/user" replace/>
        )
    }

    return children;

}
