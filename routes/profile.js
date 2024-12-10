var express = require('express');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop(); 
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`); 
    }
})

const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); 
    } else {
        cb(new Error('Soilik PNG eta JPG fitxategiak onartzen dira'), false); 
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: fileFilter
});

router.use(express.urlencoded({ extended: true }));

/* POST eskaera: fitxategia eta izena prozesatu */
router.post('/profile', upload.single('avatar'), function (req, res, next) {
    const userName = req.body.name; 
    const fileUrl = path.join('/uploads', req.file.filename);

    console.log(`Zure izena: ${userName}`);
    console.log(`Fitxategia: ${fileUrl}`);

    res.send(`Zure izena: ${userName}. Fitxategia: ${fileUrl}`);
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send(`Errorea: ${err.message}`);
    } else if (err) {
        res.status(400).send(`Errorea: ${err.message}`);
    } else {
        next();
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})


module.exports = router;
