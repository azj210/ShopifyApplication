import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../services/UserServices';

function Register(props) {
    const initialFormState= {
        userName: "",
        password: ""
    };

    const [form, setForm] = useState({initialFormState});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        props.checkAuth();
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveData = event => {
        //ensure that username and password given are both of length at least 5
        if (form.userName.length >= 5 && form.password.length >= 5) {
            DataService.create(form)
              .then(response => {
                  setSubmitted(true);
                  console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              });
        }
        //otherwise if the user entered a username but it is less than length 5
        else if (form.userName && form.userName.length < 5) {
            alert("User Name must be at least 5 characters long!");
        }
        //otherwise if the user entered a password but it is less than length 5
        else if (form.password && form.password.length < 5) {
            alert("Password must be at least 5 characters long!");
        }
        event.preventDefault();
    };

    return (
        <div>
          {submitted ? (
            <header className="notification">
                <h4>You signed up successfully!</h4>
                <Link to ="/login" className="btn btn-info" id="register_to_login">
                    Login
                </Link>
            </header>
          ) : (
            <div className="page-form">
                <header>
                    <h2>Register</h2>
                </header>
                <div className="form-group preauth-select-style">
                    <label htmlFor="userName">UserName</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        required
                        value={form.userName}
                        onChange={handleChange}
                        name="userName"
                    />
                </div>
                <div className="form-group preauth-select-style">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>

                <button type="submit" id="submit" className="btn btn btn-primary" onClick={saveData}>
                    Submit
                </button>

            </div>
            )}
        </div>
      );
};

export default Register;
