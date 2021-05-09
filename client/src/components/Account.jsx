import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import DataService from '../services/UserServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';
import "./pretty.css";

import Logout from './Logout';

function Account (props) {
    const [newImage, setNewImage] = useState("");
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [newDelete, setNewDelete] = useState("");
    const [searchChoice, setSearchChoice] = useState("Search By File Name");
    const token = localStorage.getItem("decisionMakerToken");
    const uid = localStorage.getItem("decisionMakerUID");

    const handleNewImageChange = (event) => {
        setNewImage(event.target.files[0]);
    };
    const handleNewName = (event) => {
        setNewName(event.target.value);
    };
    const handleNewDescription = (event) => {
        setNewDescription(event.target.value);
    };
    const handleNewSearch = (event) => {
        setNewSearch(event.target.value);
    };
    const handleNewDelete= (event) => {
        setNewDelete(event.target.value);
    };
    const handleChoice = (event) => {
        setSearchChoice(event.target.value);
    };

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
                if (e == "Error: Request failed with status code 409") {
                    alert("Unfortunately someone already took that image name :(")
                } else {
                    alert("Your image was no saved successfully, please try again")
                }
            });
        } else {
            alert("Please provide a new image and name for that image!")
        }
    };

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    const handleSendSearch = () => {
        if (newSearch) {
            if (searchChoice == "Search By File Name") {
                const data = { uid: uid, name: newSearch };
                DataService.getImgByName(token, data)
                .then(response => {
                    //convert the media array buffer to a unit8array then to a blob
                    const x = new Uint8Array(response.data.data.data);
                    const blob = arrayBufferToBlob(x);
                    const blobURL = createObjectURL(blob);

                    const imgBody = document.getElementById("i");
                    removeAllChildNodes(imgBody);
                    const newImg = document.createElement('img');
                    newImg.src = blobURL;
                    imgBody.appendChild(newImg);
                    setNewSearch("");
                })
                .catch(e => {
                    if (e == "Error: Request failed with status code 404") {
                        alert("Could not find an image with that file name :(");
                    } else {
                        alert("The search was not successful, please try again");
                    }
                })
            } else {
                const data = { uid: uid, description: newSearch };
                DataService.getImgBySpec(token, data)
                .then(response => {
                    const imgBody = document.getElementById("i");
                    removeAllChildNodes(imgBody);
                    for (var i = 0; i < response.data.data.length; i++) {
                        //convert the media array buffer to a unit8array then to a blob
                        const x = new Uint8Array(response.data.data[i].data);
                        const blob = arrayBufferToBlob(x);
                        const blobURL = createObjectURL(blob);

                        const newImg = document.createElement('img');
                        newImg.src = blobURL;
                        imgBody.appendChild(newImg);
                    }
                    setNewSearch("");
                })
                .catch(e => {
                    alert("The search was not successful, please try again");
                })
            }
        } else {
            alert("Please enter a search parameter")
        }
    };

    const handleDeleteImage = () => {
        if (newDelete) {
            const data = { uid: uid, name: newDelete };
            DataService.deleteImg(token, data)
            .then(response => {
                alert("The image was successfully deleted!");
            })
            .catch(e => {
                if (e == "Error: Request failed with status code 422") {
                    alert("Could not find an image with that name");
                } else {
                    alert("The search was not successful, please try again");
                }
            })
            setNewDelete("");
        } else {
            alert("Please enter the name of a file to delete")
        }
    }

    return(
        <div>
            <div>
                <input type="text" placeholder="Write File Name..." value = {newName} onChange={handleNewName} id="nameInput" />
                <input type="text" placeholder="Write File Description..." value = {newDescription} onChange={handleNewDescription} id="descriptionInput" />
                <input type="file" onChange={handleNewImageChange} id="imgInput" />
                <button onClick={handleSendImage} className="btn btn btn-primary" id = "sendMedia">
                    Send Image
                </button>
            </div>
            <div>
                <div className="form-group">
                    <input type="text" placeholder="Search and Display..." value = {newSearch} onChange={handleNewSearch} id="searchInput" />
                    <select className="form-control dashboard-select-style" name="option" value={searchChoice} onChange={handleChoice}>
                        <option>Search By File Name</option>
                        <option>Search By File Description</option>
                    </select>
                    <button onClick={handleSendSearch} className="btn btn btn-primary" id = "sendSearch">
                        Send Search Request
                    </button>
                </div>
                <div className="imgs-container" id="i"></div>
            </div>
            <div>
                <input type="text" placeholder="Delete by File Name..." value = {newDelete} onChange={handleNewDelete} id="deleteInput" />
                <button onClick={handleDeleteImage} className="btn btn btn-primary" id = "deleteMedia">
                    Delete Image
                </button>
            </div>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    );
};

export default Account;
