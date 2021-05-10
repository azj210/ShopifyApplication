const express = require("express");
const app = express();

const userRouter = require("./backend/api/users/user.router");
const mediaRouter = require("./backend/api/media/media.router");
const cors = require("cors");

var corsOptions = {
  origin: ['https://alex-jiang-image-repository.netlify.app', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

//since user passes in json, we convert it into javascript object
app.use(express.json());

//if any requests come for _ data then we pass to /api/_ route
app.use("/api/users", userRouter);
app.use("/api/media", mediaRouter);

server = require("http").createServer(app);

server.listen(process.env.PORT || 4000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

module.exports = app;
