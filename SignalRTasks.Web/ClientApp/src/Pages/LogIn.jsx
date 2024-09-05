import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuthentication } from '../AuthContext';

const LogIn = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoginValid, setIsLoginValid] = useState(true);
    const navigate = useNavigate();
    const { setUser } = useAuthentication();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/users/login', formData);
        const isValid = data;
        setIsLoginValid(isValid);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!isLoginValid && <span className='text-danger'>Invalid Entry. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input type='text' name='email' placeholder='Email' value={formData.email} onChange={onTextChange} className='form-control' />
                    <br />
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={onTextChange} className='form-control' />
                    <br />
                    <button className='btn btn-outline-success'>Log in</button>
                </form>
                <Link to='/signup'>Sign up for a new account</Link>
            </div>
        </div>
    )
}

export default LogIn;