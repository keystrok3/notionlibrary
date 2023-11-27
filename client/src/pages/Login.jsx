/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSignIn }) => {

    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const register = await fetch('/api/auth/login', {
                method: 'POST',
    
                headers: {
                    "Content-Type": "application/json"
                },
    
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });

            const response = await register.json();
    
            if(!register.ok) {
                return alert(response.msg)
            }

            
            onSignIn(response.session_data.user);   
            
            if(response.session_data.user.confirmed === false) {
                alert("Please check your email for instrutions on how to confirm you email address");
            }
    
            navigate('/home');
        } catch (error) {
            console.log('Server error: ', error);
            alert(error);
        }
    };


    return (
        <div className="login-page">
            <div className="login-form">
                <form id="login">
                    <label htmlFor="login"><h2>Sign In</h2></label>
                    <div className="email">
                        <input onChange={handleEmail} type="email" placeholder="Email" />
                    </div>
                    <div className="password">
                        <input onChange={handlePassword} type="password" placeholder="Password" />
                    </div>
                    <div className="submit">
                        <button onClick={handleLogin} className="submit-btn">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;



