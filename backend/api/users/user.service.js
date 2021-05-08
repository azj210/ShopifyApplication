const pool = require("../../config/database");

module.exports = {
  //receives data from the controller and receives a callBack function if code is successful
  //creates a new user
  create: (data, callBack) => {
    pool.query(
      `insert into users(userName, password)
              values(?,?)`,
      [
        data.userName,
        data.password
      ],
      //if we get results then error is null
      (error, results, fields) => {
        if (error) {
            return callBack(error);
        }
        //otherwise we don't have an error
        return callBack(null, results);
      }
    );
  },

  //get a user by their username
  getUserbyUserName: (userName, callBack) => {
    pool.query(
      `select * from users where userName = ?`,
      [userName],
      (error, results, fields) => {
        //callBack is a function that takes in 2 parameters
        if (error) {
          //no user with email
          return callBack(error);
        }
        //user with email found, first param passed to callBack is null second is user data
        return callBack(null, results[0]);
      }
    );
  },

  //retrieves a user by uid
  getUserbyUID: (uid, callBack) => {
    pool.query(
      `select * from users where uid = ?`,
      [uid],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        //results is an array format so we only need 1 result (the user)
        return callBack(null, results[0]);
      }
    );
  }
};
