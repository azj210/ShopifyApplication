const pool = require("../../config/database");

module.exports = {
    addImagePath: (data, callBack) => {
        pool.query(
            `insert into media(uid, path, date, description, name)
                    values(?,?,?,?,?)`,
            [
                data.uid,
                data.path,
                data.date,
                data.description,
                data.name
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteImage: (data, callBack) => {
        pool.query(
            `delete from media where uid = ? and name = ?`,
            [
                data.uid,
                data.name
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getImageByName: (data, callBack) => {
        pool.query(
            `select * from media where name = ?`,
            [ data.name ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getImagesBySpec: (data, callBack) => {
        pool.query(
            `select * from media where description = ?`,
            [ data.description ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //get the current date
    getDate: () => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        return dateTime;
    }
};
