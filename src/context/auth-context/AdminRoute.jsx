import { useAuth } from './useAuth'
import Fobbidden from '../../pages/Forbidden'

// eslint-disable-next-line react/prop-types
export const AdminRoute = ({ children }) => {
    const { user } = useAuth();

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