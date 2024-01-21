import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'

export const AdminRoute = ({ children }) => {
    const { user } = useGlobalContext();

    if (!user || user.role != 'admin') {
        return (
           <div>Ban khong co quyen truy cap</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}