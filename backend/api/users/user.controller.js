const { create, getUserbyUserName } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {checkToken} = require("../../authentication/validateToken");
//sign creates json tokens
const { sign } = require("jsonwebtoken");

//controllers that handle all the services from user.service.js
module.exports = {
	createUser: (req, res) => {
  	const body = req.body;
	  //ensure we have necessary parameters in the request body
	  if (!body.password || !body.userName) {
			return res.status(422).json({
				success: 0,
				message: "one of the required inputs was not given",
			});
	  }
	  //ensure the password and username meets standards. for now just set loose standards
	  //but if time allows, can add extra requirements to the password and username
	  if (body.password.length < 5 || body.userName.length < 5) {
			return res.status(422).json({
				success: 0,
				message: "invalid username or password length",
			});
	  }

		const salt = genSaltSync(10);
		//using the salt we can generate the hash encrypted password and store it in body.password
		body.password = hashSync(body.password, salt);

		//the second parameter is a function that takes either err or results
		create(body, (err, results) => {
				if (err) {
					//return a response in the json format
					if (err.code == "ER_DUP_ENTRY") {
						return res.status(409).json({
							success: 0,
							message: "username was already taken",
						});
					}
					return res.status(500).json({
						success: 0,
						message: "database connection error",
					});
				}
				//we get results and send it to users
				return res.status(201).json({
					success: 1,
					data: results
				});
		});
  },

  //login controller
  login: (req, res) => {
		//user passes username and password, which will then be stored in body
		const body = req.body;
		//ensure the username and password are in the body
		if (!body.userName || !body.password) {
			return res.status(422).json({
				success: 0,
				message: "one of the required inputs was not given",
			});
		}

		//call the service. 2 params passed, the username and the callback
		getUserbyUserName(body.userName, (err, results) => {
			//if you get an error then stop running
			if (err) {
				return res.status(500).json({
					success: 0,
					message: "database connection error"
				});
			}
			//no error but result is blank
			if (!results) {
				return res.status(403).json({
					success: 0,
					message: "Invalid username"
				});
			}
			//valid username. take the result and compare input pass and pass associated with the username
			const result = compareSync(body.password, results.password);
			//matches
			if (result) {
				results.password = undefined;
				//generate a jsontoken qwe1234 that will be valid for 3 hours
				const jsontoken = sign({ result: results }, "qwe1234", { expiresIn: "3h" });
				return res.status(200).json({
					success: 1,
					message: "logged in successfully",
					data: results,
					token: jsontoken
				});
			} else {
				return res.status(403).json({
					success: 0,
					message: "Invalid password"
				});
			}
		});
  },

  getUserbyUID: (req, res) => {
		//extract the id from the url
		const uid = req.params.uid;
		//pass the uid into the servce
		getUserbyUID(uid, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: 0,
					message: "database connection error"
				});
			}
			if (!results) {
				return res.status(404).json({
					success: 0,
					message: "user not found"
				});
			}
			return res.status(200).json({
				success: 1,
				data: results
			});
		});
  }
};
