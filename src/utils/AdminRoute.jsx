import { useGlobalContext } from '../context'
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