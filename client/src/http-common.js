import axios from 'axios';
require('dotenv').config();

const http = axios.create({
    baseURL: "http://localhost:4000/api",
    //baseURL: "https://shopify-app-backend.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

const httpA = token => {
    return (
        axios.create({
            baseURL : "http://localhost:4000/api",
            //baseURL : "https://shopify-app-backend.herokuapp.com/api",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    );
};

export {
    http,
    httpA
};
