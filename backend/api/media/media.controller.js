const { addImagePath, deleteImage, getImageByName, getImageByNameRestricted, getImagesBySpec, getDate } = require("./media.service");
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
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "failed to save file"
                });
            }
        });

        const data = {
            uid: body.uid,
            path: req.file.originalname,
            date: time,
            description: body.description,
            name: body.name
        };

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

    deleteImage: (req, res) => {
        //1 of the required fields is missing
        if (!req.body.uid || !req.body.name) {
            return res.status(422).json({
                success: 0,
                message: "one or more of the required fields was missing"
            });
        }

        //first get the image, then both physically delete it from the directory and delete its path from the database
        const body = req.body;
        getImageByNameRestricted(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            //no error but result is blank
			if (!results.length) {
				return res.status(404).json({
					success: 0,
					message: "the image requested can not be found"
				});
			}

            const path = `media/${results[0].path}`;
            fs.unlink(path, (err) => {
                if (err) {
                    //return a response in the json format
                    return res.status(500).json({
                        success: 0,
                        message: "could not delete image"
                    });
                }
            });

            deleteImage(body, (err, results) => {
                if (err) {
                    //if have time write a rollback function here on the physical image deletion
                    return res.status(500).json({
                        success: 0,
                        message: "database connection error"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
        });

    },

    getImageByName: (req, res) => {
        if (!req.body.name) {
            return res.status(422).json({
                success: 0,
                message: "image name is missing"
            });
        }

        const body = req.body;
        getImageByName(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            //no error but result is blank
			if (!results.length) {
				return res.status(404).json({
					success: 0,
					message: "the image requested can not be found"
				});
			}

            const path = `media/${results[0].path}`;
            fs.readFile(path, (err, data) => {
                if (err) {
                    //return a response in the json format
                    return res.status(500).json({
                        success: 0,
                        message: "could not retrieve image"
                    });
                }
                if (!data) {
                    return res.status(404).json({
                        success: 0,
                        message: "media not found"
                    });
                }
                //we get results and send it to users
                return res.status(200).json({
                    success: 1,
                    data: data
                });
            });
        });
    },

    getImagesBySpec: (req, res) => {
        if (!req.body.description) {
            return res.status(422).json({
                success: 0,
                message: "image description is missing"
            });
        }

        const body = req.body;
        getImagesBySpec(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            //no error but result is blank
            if (!results.length) {
				return res.status(404).json({
					success: 0,
					message: "images matching the description can not be found"
				});
			}

            var resArr = [];
            for (var i = 0; i < results.length; i++) {
                const path = `media/${results[i].path}`;
                resArr.push(fs.readFileSync(path))
            }
            //we get results and send it to users
            return res.status(200).json({
                success: 1,
                data: resArr
            });
        });
    }
};
