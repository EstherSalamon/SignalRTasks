import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthentication } from '../AuthContext';

const LogOut = () => {

    const navigate = useNavigate();
    const { setUser } = useAuthentication();

    useEffect(() => {

        const doLogOut = async () => {
            await axios.post('api/users/logout');
            setUser(null);
            navigate('/');
        }

        doLogOut();

    }, [])

    return (<></>);
}

export default LogOut;