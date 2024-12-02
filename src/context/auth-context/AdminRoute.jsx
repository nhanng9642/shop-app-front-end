import { useAuth } from './useAuth'
import { Forbidden } from "@/pages/status"

// eslint-disable-next-line react/prop-types
export const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || user.role !== 'ROLE_ADMIN') {
        return (
           <Forbidden />
        )
    }

    return children;
}