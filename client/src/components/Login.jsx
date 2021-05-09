import React, { useState, useEffect } from 'react';
import DataService from '../services/UserServices';
import { useHistory } from 'react-router-dom';
import LogoutError from './LogoutError';

function Login (props) {

    const [loginInfo, setLoginInfo] = useState({
        userName: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { value, name } = event.target;
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    const history = useHistory();

    const logUserIn = () => {
        DataService.login(loginInfo)
            .then (response => {
                if(response.data.success === 1) {
                    console.log(response);
                    history.push("/");
                    localStorage.setItem('decisionMakerToken', response.data.token);
                    localStorage.setItem('decisionMakerUID', response.data.data.uid);
                    props.checkAuth();
                } else {
                    setErrorMessage(response.data.data);
                };
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        props.authenticated ?

        <div>
            <LogoutError />
        </div> :

        <div className="page-form">
            <header>
                <h2>Login</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
            <div className="form-group preauth-select-style">
                <label for="userName">User Name</label>
                <input
                    id="userName"
                    type="userName"
                    className="form-control"
                    name="userName"
                    placeholder="Shopify"
                    required
                    value={loginInfo.userName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group preauth-select-style">
                <label for="password">Password</label>
                <input
                    id="pasword"
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required
                    value={loginInfo.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-info form-control preauth-loginbutton-style" id="login_button" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;
