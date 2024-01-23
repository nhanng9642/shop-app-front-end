import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
import Fobbidden from '../pages/Forbidden'

export const AdminRoute = ({ children }) => {
    const { user } = useGlobalContext();

    if (!user || user.role != 'admin') {
        return (
           <Fobbidden />
        )
    }

    return (
        <>
            {children}
        </>
    )
}