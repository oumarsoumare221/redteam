const Hotel = require('../models/hotel.model');
const multer = require('../multer');

exports.createHotel = async (req, res) => {
    try {
        console.log('Received request to create hotel with data:', req.body);

        // Extraire les données du corps de la requête
        const { title, address, price, email, telephone, devise } = req.body;

        // Vérifier si toutes les données nécessaires sont présentes
        if (!title || !address || !price || !email || !telephone || !devise || !req.file) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log('Received file:', req.file); // Assurez-vous que req.file est correctement géré

        // Création de l'objet hotelData en incluant le chemin du fichier téléchargé
        const hotelData = {
            title,
            address,
            price,
            email,
            telephone,
            devise,
            photo: req.file.filename // Assurez-vous que req.file.filename contient le nom du fichier téléchargé
        };

        // Créer une nouvelle instance de l'hôtel en utilisant le modèle Mongoose
        const hotel = await Hotel.create(hotelData);

        if (!hotel) {
            throw new Error("Failed to create hotel");
        }

        console.log('Hotel created successfully:', hotel);

        // Répondre avec l'hôtel créé
        res.status(201).json({ message: 'Hotel created successfully', hotel });
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).json({ message: 'Failed to create hotel', error: error.message });
    }
};
exports.getAllHotels = async (req, res) => {
    try {
        console.log('Received request to get all hotels');
        const hotels = await Hotel.find();
        console.log('Hotels retrieved successfully:', hotels);
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error getting hotels:', error);
        res.status(500).json({ message: 'Failed to get hotels' });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        console.log('Received request to get hotel by ID:', req.params.id);
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ message: 'Hotel not found' });
        }
        console.log('Hotel retrieved successfully:', hotel);
        res.status(200).json(hotel);
    } catch (error) {
        console.error('Error getting hotel by ID:', error);
        res.status(500).json({ message: 'Failed to get hotel by ID' });
    }
};

exports.updateHotelById = async (req, res) => {
    try {
        console.log('Received request to update hotel by ID:', req.params.id);
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ message: 'Hotel not found' });
        }
        console.log('Hotel updated successfully:', hotel);
        res.status(200).json({ message: 'Hotel updated successfully', hotel });
    } catch (error) {
        console.error('Error updating hotel by ID:', error);
        res.status(500).json({ message: 'Failed to update hotel by ID' });
    }
};

exports.deleteHotelById = async (req, res) => {
    try {
        console.log('Received request to delete hotel by ID:', req.params.id);
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ message: 'Hotel not found' });
        }
        console.log('Hotel deleted successfully');
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error('Error deleting hotel by ID:', error);
        res.status(500).json({ message: 'Failed to delete hotel by ID' });
    }
};
