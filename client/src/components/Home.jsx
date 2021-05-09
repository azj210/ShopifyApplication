import React, { useState, useEffect } from 'react';
import Account from './Account';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Home (props) {
    const[user, setUser] = useState();

    useEffect(() => {
        props.checkAuth();
    });

    //bring user to their homepage if authenticated, else bring them to register/login screen
    return(
        props.authenticated ?
        <div>
            <Account user={user} setUser={setUser} />
        </div> :
        <div className="homepage-header">
            <h1>Image Repository</h1>
            <Link to="/register" className="btn btn btn-primary" id='register_btn'>Register</Link>
            <Link to="/login" className="btn btn btn-primary" id='login_btn'>Login</Link>
        </div>
    );
};

export default Home;
