import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import DataService from '../services/UserServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';

import Logout from './Logout';

function Account (props) {
    const [newImage, setNewImage] = useState("");
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const token = localStorage.getItem("decisionMakerToken");
    const uid = localStorage.getItem("decisionMakerUID");

    const handleNewImageChange = (event) => {
        setNewImage(event.target.files[0]);
    };
    const handleNewName = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }
    const handleNewDescription = (event) => {
        setNewDescription(event.target.value);
    }

    const handleSendImage = () => {
        //save the image
        if (newImage && newName) {
            //save new message in database
            const formData = new FormData();
            formData.append('file', newImage);
            formData.append('uid', uid);
            formData.append('name', newName);
            formData.append('description', newDescription);

            DataService.createImg(token, formData)
            .then(response => {
                //sent the image
                alert("Your image was saved successfully!");
                setNewImage("");
                setNewName("");
                setNewDescription("");
            })
            .catch(e => {
                console.log(e);
            });
        } else {

        }
    };

    return(
        <div>
            <div>
                <input type="text" placeholder="Write File Name..." onChange={handleNewName} id="nameInput" />
                <input type="text" placeholder="Write File Description..." onChange={handleNewDescription} id="descriptionInput" />
                <input type="file" onChange={handleNewImageChange} id="imgInput" />
                <button onClick={handleSendImage} className="btn btn btn-primary" id = "sendMedia">
                    Send Image
                </button>
            </div>

            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    );
};

export default Account;
