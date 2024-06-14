const multer = require('multer');

// Configuration de Multer pour enregistrer les fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
    // Vérifiez si le fichier est une image
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Configuration de Multer avec les options de stockage et de filtrage
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
