import {http, httpA} from "../http-common.js";

const checkToken = token => {
    const authHTTP = httpA(token);
    return authHTTP.post("/users/authenticate");
};

const create = data => {
    return http.post("/users/create", data);
};

const login = data => {
    return http.post("/users/login", data);
};

const createImg = (token, data) => {
    const authHTTP = httpA(token);
    return authHTTP.post("/media/add", data, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
        timeout: 30000,
    });
};

const deleteImg = (token, data) => {
    const authHTTP = httpA(token);
    return authHTTP.delete("/media/delete", data);
};

const getImgByName = (token, data) => {
    const authHTTP = httpA(token);
    return authHTTP.post("/media/getByName", data);
};

const getImgBySpec = (token, data) => {
    const authHTTP = httpA(token);
    return authHTTP.post("/media/getBySpec", data);
};

export default {
    checkToken,
    create,
    login,
    createImg,
    deleteImg,
    getImgByName,
    getImgBySpec
};
