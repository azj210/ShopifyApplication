//const { addImagePath, deleteImage, getImageByName, getImagesBySpec, getDate } = require("./media.service");
const { addImagePath, getDate } = require("./media.service");
const {checkToken} = require("../../authentication/validateToken");
const fs = require('file-system');

module.exports = {
    addImage: (req, res) => {
        //1 of the required fields is missing
        if (!req.file || !req.body.uid || !req.body.name) {
            return res.status(422).json({
                success: 0,
                message: "one of the fields was missing"
            });
        }
        //the file name is too long
        if (req.file.originalname.length > 255) {
            return res.status(422).json({
                success: 0,
                message: "the file name is too long"
            });
        }
        //the given name file name is too long
        if (req.body.name.length > 20) {
            return res.status(422).json({
                success: 0,
                message: "the given name for the file is longer than 20 characters"
            });
        }

        const body = req.body;
        //set the current date
        const time = getDate();
        const path = `media/${req.file.originalname}`;

        fs.writeFile(path, req.file.buffer, function(err) {
            if (err) throw err
            console.log('File saved.');
        })

        const data = {
            uid: body.uid,
            path: req.file.originalname,
            date: time,
            description: body.description,
            name: body.name
        }

        addImagePath(data, (err, results) => {
            if (err) {
                //return a response in the json format
                if (err.code == "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        success: 0,
                        message: "either the file name or file path was already taken",
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }

            //we get results and send it to users
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },


};
