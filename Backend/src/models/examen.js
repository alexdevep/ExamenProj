
// Instancias de conexion con BD
const mysql = require('mysql');
const db_credentials = require('./db_creds');
var connection = mysql.createPool(db_credentials);

let examModel = {};

examModel.getExam = (callback) => {
    if (connection){

        /*
        const sql = `
            SELECT * FROM Exam
            WHERE id = ${connection.escape(userData.id)}
        `;
        */
        const sql = `
            SELECT * FROM Examen
        `;

        connection.query(
            sql, (err, rows) => {
                if (err) {
                    console.log('fallo');
                    callback(err);
                }
                else{
                    //callback => res.json...
                    console.log('exito');
                    callback(null, rows);
                }
            }
        )
    }
    else {
        callback(err);
    }
};

examModel.newExam = (data, callback) => {
    try {
        if (connection) {
            connection.query(
                'INSERT INTO Examen SET ?',
                data,
                (err, result) => {
                    if(err) {
                        callback(err);
                    }
                    else
                    {
                        //console.log(result)
                        callback(null, {
                            'insertId': result.insertId
                        });
                    }
                }
            )
        }
    } catch (error) {
        callback(err);
    }
};

examModel.getResp = (data, callback) => {
    if (connection){

        const sql = `
            SELECT * FROM Preguntas
            WHERE id_examen = ${connection.escape(data.id)}
        `;

        connection.query(
            sql, (err, rows) => {
                if (err) {
                    callback(err);
                }
                else{
                    callback(null, rows);
                }
            }
        )
    }
    else {
        callback(err);
    }
};

examModel.newRespuesta = (data, callback) => {
    try {
        if (connection) {
            connection.query(
                'INSERT INTO Preguntas SET ?',
                data,
                (err, result) => {
                    if(err) {
                        callback(err);
                    }
                    else
                    {
                        //console.log(result)
                        callback(null, {
                            'insertId': result.insertId
                        });
                    }
                }
            )
        }
    } catch (error) {
        callback(err);
    }
};




module.exports = examModel;