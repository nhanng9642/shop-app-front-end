import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
import Loading from '../pages/Loading';

export const AuthRoute = ({ children }) => {
    const { isInitalize, isAuthenticated } = useGlobalContext();

    if (!isInitalize) {
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