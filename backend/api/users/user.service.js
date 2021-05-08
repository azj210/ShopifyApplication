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
          //no user with username
          return callBack(error);
        }
        //user with username found, first param passed to callBack is null second is user data
        return callBack(null, results[0]);
      }
    );
  }
};
