﻿import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthComponent = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const setUp = async () => {
            const { data } = await axios.get('/api/users/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }

        setUp();

    }, []);

    if (isLoading) {
        return (
            <div style={{ marginTop: 80 }}>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthentication = () => useContext(AuthContext);

export { AuthComponent, useAuthentication };