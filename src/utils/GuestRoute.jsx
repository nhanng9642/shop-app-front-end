import React from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
import Loading from '../pages/Loading'

export function GuestRoute({ children }) {
    const { isInitalize, isAuthenticated, user } = useGlobalContext();

    if (!isInitalize) {
        return <Loading />
    }

    if (isAuthenticated && user) {
        console.log(user)
        if (user.role == 'admin') {
            return (
                <Navigate to="/admin/home" replace/>
            )
        } 
        console.log('user');
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
