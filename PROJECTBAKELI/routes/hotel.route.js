const express = require('express');
const router = express.Router();
const multer = require('multer');
const hotelController = require('../controllers/hotel.controller');

// Configuration de Multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination pour enregistrer les fichiers téléchargés
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nom du fichier téléchargé
    }
});

const upload = multer({ storage: storage });

// Route POST pour la création d'un hôtel avec téléchargement de fichier
router.post('/', upload.single('photo'), hotelController.createHotel);

// Autres routes pour obtenir, mettre à jour et supprimer des hôtels
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotelById);
router.delete('/:id', hotelController.deleteHotelById);

module.exports = router;
