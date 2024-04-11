// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './styles.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        navigate('/register/user');
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login/user', { email, password });
    
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('accessToken', token);
                toast.success('Login Successfully');
                navigate('/homepage');
            } else {
                toast.error('Login failed. Please try again.');
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred during login.');
            console.error('An error occurred during login:', error);
        }
    };
    

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-form p-4 border rounded">
                <h3 className="text-center">Login</h3>
                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Group controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={email} required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password} required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                    <div style={{ marginTop: '10px' }}></div> 
                    <Button variant="primary" type="button" className="w-100 mt-3" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
