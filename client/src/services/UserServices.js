import {http, httpA} from "../http-common.js";

const checkToken = token => {
  const authHTTP = httpA(token);
  return authHTTP.post("/users/authenticate");
};

export default {
  checkToken
};
