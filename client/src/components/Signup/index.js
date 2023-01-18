import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };

	return (
        <main>
            <div>
                <h2 className="title">Sign-up</h2>
                {data ? (<p><Link to="/">back to the homepage.</Link></p>) : (
                <form className="scheduleForm" onSubmit={handleFormSubmit}>
                    <div className="allignForm">
                    <div className="scheduleContainer">
                                <label className="nameLabel">Username:</label>
                                <input
                                className="nameInput"
                                name="username"
                                type="text"
                                value={formState.username}
                                onChange={handleChange}
                                />
                            </div>
                        <div className="scheduleContainer">
                            <div className="scheduleContainer">
                                <label className="nameLabel">Email:</label>
                                <input
                                className="nameInput"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="scheduleContainer">
                                <label className="nameLabel">Password:</label>
                                <input
                                className="nameInput"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="loginForm">
                            <button className="loginButton" style={{ cursor: 'pointer' }} type="submit">Sign-up</button>
                            <Link className="logInstead" to="/login">Login instead</Link>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            {error && (
                <div>
                    {error.message}
                </div>
            )}
            </div>
        </main>
        );
    }

export default Signup;