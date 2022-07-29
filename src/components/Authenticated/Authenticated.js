import { Navigate  } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const Authenticated = ({ children }) => {

    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to='/landing' />;
}
export default Authenticated;