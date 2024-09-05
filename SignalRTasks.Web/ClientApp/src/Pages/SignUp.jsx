import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [emailExists, setEmailExists] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);

        const isValid = formData.name && formData.email && formData.password;
        setIsFormValid(isValid);
    }

    const onFormSubmit = async e => {
        e.preventDefault();

        const { data } = await axios.get(`/api/Users/EmailExists?email=${formData.email}`);
        setEmailExists(data.emailExists);
        if (!data.emailExists) {
            await axios.post('/api/users/signup', { User: formData });
            navigate('/login');
        }
    }

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Sign up for a new account</h3>
                {emailExists && <span className='text-danger'>There already exists an account associated with this email address.</span>}
                <form onSubmit={onFormSubmit}>
                    <input type='text' name='name' placeholder='Name' onChange={onTextChange} value={formData.name} className='form-control' />
                    <br />
                    <input type='text' name='email' placeholder='Email' onChange={onTextChange} value={formData.email} className='form-control' />
                    <br />
                    <input type='password' name='password' placeholder='Password' onChange={onTextChange} value={formData.password} className='form-control' />
                    <br />
                    <button className='btn btn-outline-primary' disabled={!isFormValid}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;