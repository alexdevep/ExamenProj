const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

const Exam = require('./models/examen');

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
//app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes

app.get('/', (req, res) => {
    console.log("Conexion raiz");
    res.status(200).json({ "msg": "Conexion completada!" });
});

//------------------------------------------------- EXAMENES ---------------------------------------
app.get('/examenes', (req, res) => {
    console.log(">>/examenes");
    Exam.getExam((err, data) => {
        if(err){
            res.status(500).json({ success: false, msg: 'Fallo conexion'});
        }
        res.status(200).json(data);
    });
});

app.post('/nuevo', function (req, res) {
    console.log(">>/nuevo");
    console.log(req.body);
    try {
        const objData = {
            nombre: req.body.nombre,
            cant_preguntas: req.body.cant
        };

        Exam.newExam(objData, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({ id: data.insertId, success: true });
            }
            else if (err) {
                res.status(200).json({ msg: "Error, el examen ya existe", success: false });
            }
            else {
                res.status(500).json({ success: false, msg: 'ddb failed'});
            }
        })

    }
    catch (e) {
        res.status(500).json({ msg: "Fallo al crear el examen", success: false });
    }
});

app.get('/resby/:id', (req, res) => {
    console.log(">>/resby/:id");
    const resData = {
        id: req.params.id
    };

    Exam.getResp(resData,(err, data) => {
        if(err){
            res.status(500).json({ success: false, msg: 'Fallo conexion'});
        }
        res.status(200).json(data);
    });
});

app.post('/respuesta', function (req, res) {
    console.log(">>/respuesta");
    try {
        //const {objData} = req.body;

        Exam.newRespuesta(req.body, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({ msg: "Exito", success: true });
            }
            else {
                res.status(500).json({ success: false, msg: 'ddb failed'});
            }
        })

    }
    catch (e) {
        res.status(500).json({ msg: "Fallo al guardar respuesta", success: false });
    }
});

// Static files
// Sin static files aun

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});

/*
EJECUTAR EN CONSOLA EL COMANDO
node src/app.js
*/