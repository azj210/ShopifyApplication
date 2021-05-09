import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, useHistory, Route } from 'react-router-dom';
import DataService from './services/UserServices';

import Home from './components/Home';
import Redirect from './components/Redirect';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Logout from './components/Logout';

function App() {
  const history = useHistory();

	//check to see if user is authenticated
	const [authenticated, setAuthenticated] = useState("loading");

	const changeAuth = () => {
    setAuthenticated(!authenticated);
	};

	//authenticated user
	async function checkAuth() {
		const token = localStorage.getItem('decisionMakerToken');
		if (token) {
      console.log(token);
			const response = await DataService.checkToken(token)
				.catch(e => {
					console.log(e);
				});
			if (response && response.data.success === 1) {
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
				localStorage.removeItem("decisionMakerToken");
				localStorage.removeItem("decisionMakerUID");
				//history.go();
			}
		} else {
			setAuthenticated(false);
		}
	};

	return (
		<Router>
			<div className="App">
				{authenticated === "loading" ?
				<Route path="/" exact={true} component={() => <Redirect checkAuth={checkAuth}/>} /> :
				<Route path="/" exact={true} component={() => <Home checkAuth={checkAuth} authenticated={authenticated} />} />}
        <Route path="/register" component={() => <Register checkAuth={checkAuth} authenticated={authenticated}/>} />
        <Route path="/login" component={() => <Login checkAuth={checkAuth} authenticated={authenticated}/>} />
        <Route path="/account" component={() => <Account checkAuth={checkAuth} authenticated={authenticated}/>} />
        <Route path="/logout" component={Logout} />
      </div>
		</Router>
	);
};

export default App;
