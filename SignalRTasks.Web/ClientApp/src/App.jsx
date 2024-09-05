import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LogOut from './Pages/LogOut';
import { AuthComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <AuthComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/logout' element={<PrivateRoute><LogOut/></PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthComponent>
    );
}

export default App;