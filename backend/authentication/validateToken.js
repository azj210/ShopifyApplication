const { verify } = require("jsonwebtoken");

//need to use this token to validate certain services
//apply this middleware necessary apis
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if(token) {
      //remove the bearer from the token. The token starts from the 7 index
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err){
          res.status(401).json({
            success: 0,
            message: "Invalid Token"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
        res.status(403).json({
          success: 0,
          message: "Access Denied. Unauthorized User."
        });
    }
  }
}
