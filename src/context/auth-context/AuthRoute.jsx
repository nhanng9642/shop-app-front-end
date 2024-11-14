import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import Loading from '../../pages/Loading';

// eslint-disable-next-line react/prop-types
export const AuthRoute = ({ children }) => {
    const { isInit, isAuthenticated } = useAuth();

    if (!isInit) {
        return <Loading />
    }

    if (!isAuthenticated) {
        console.log('not authenticated');
        return <Navigate to="/auth/sign-in" replace/>
    }

    return (
        <>
            {children}
        </>
    )
}