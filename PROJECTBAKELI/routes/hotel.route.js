// const express = require('express');
// const router = express.Router();
// const multer = require('../multer');
// const hotelController = require('../controllers/hotel.controller');

// // Route pour créer un hôtel avec téléchargement de photo
// router.post('/hotels', multer.single('photo'), async (req, res) => {
//     try {
//         const { title, address, price, email, telephone, devise } = req.body;

//         // Vérifiez si toutes les données nécessaires sont présentes
//         if (!title || !address || !price || !email || !telephone || !devise || !req.file) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         // Création de l'hôtel en incluant le chemin du fichier téléchargé
//         const hotel = await hotelController.createHotel({
//             title,
//             address,
//             price,
//             email,
//             telephone,
//             devise,
//             photo: req.file.filename
//         });

//         console.log('Hotel created:', hotel);

//         res.status(201).json({ message: 'Hotel created successfully', hotel });
//     } catch (error) {
//         console.error('Error creating hotel:', error);
//         res.status(500).json({ message: 'Failed to create hotel', error: error.message });
//     }
// });

// // Autres routes pour obtenir, mettre à jour et supprimer des hôtels
// router.get('/hotels', hotelController.getAllHotels);
// router.get('/hotels/:id', hotelController.getHotelById);
// router.put('/hotels/:id', hotelController.updateHotelById);
// router.delete('/hotels/:id', hotelController.deleteHotelById);

// module.exports = router;

const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');
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

const upload = multer({ storage: storage });

// Route pour créer un hôtel avec téléchargement de photo
router.post('/', upload.single('photo'), hotelController.createHotel);

// Autres routes pour obtenir, mettre à jour et supprimer des hôtels
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotelById);
router.delete('/:id', hotelController.deleteHotelById);

module.exports = router;
