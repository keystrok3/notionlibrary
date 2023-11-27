import { useEffect, useState } from 'react';
import '../assets/css/Register.css';

const Register = () => {
    
    // State
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password_2, setPassword_2 ] = useState("");
    const [ passwordsMatch, setPasswordsMatch ] = useState(true);

    // input onchange event handlers
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePassword_2 = (e) => {
        setPassword_2(e.target.value);
    };

    // Submit request
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if(!passwordsMatch) return alert("Passwords don't match");

        const register = await fetch('/api/auth/register', {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        const response = await register.json();

        console.log(response);

    };

    // Check that password re-entered matched password
    useEffect(() => {
        if(password_2.length > 0) {
            setPasswordsMatch(password === password_2);
        } else {
            setPasswordsMatch(true)
        }
    }, [ password_2 ]);


    return (
        <div className="registration-page">
            <h1 className="header">Notion Library</h1>

            <div className="register-form">
                <label htmlFor="registration-form"><h2>Create Account</h2></label>

                <form id="registration-form">
                    <div className="first-name">
                        <input onChange={handleFirstName} type="text" placeholder='First Name'/>
                    </div> 

                    <div className="last-name">
                        <input onChange={handleLastName} type="text" placeholder='Surname Name'/>
                    </div>

                    <div className="email">
                        <input onChange={handleEmail} type="email" placeholder='Email' />
                    </div>

                    <div className="password">
                        <input onChange={handlePassword} type="password" placeholder='Password' />
                    </div>

                    <div className="password-reenter">
                        <input onChange={handlePassword_2} type="password" placeholder='Re-enter password' />
                        { passwordsMatch ? null : <p>{"Passwords don't match"}</p> }
                    </div>

                    <div className="submit-btn">
                        <button onClick={handleSubmitForm} className="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Register