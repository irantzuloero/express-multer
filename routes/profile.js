var express = require('express');
var path = require('path');
var router = express.Router();
const multer = require('multer');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos PNG y JPG'), false);
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: fileFilter
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    // Extraemos el nombre del campo de texto 'name' del formulario
    const userName = req.body.name;

    // Generamos la URL de la imagen cargada
    const imageUrl = `https://fictional-couscous-wrxggp545w4fgvx9-3000.app.github.dev/uploads/${req.file.filename}`;

    // Mostramos la información en la consola
    console.log(`Zure izena: ${userName}`);
    console.log(`Fitxategia: ${imageUrl}`);

    // Enviamos una respuesta con los datos
    res.send(`Jaso da`);
});

module.exports = router;
