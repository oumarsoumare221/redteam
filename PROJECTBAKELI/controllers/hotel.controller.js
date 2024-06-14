const Hotel = require('../models/hotel.model');

exports.createHotel = async (req, res) => {
    try {
        const { title, address, price, email, telephone, devise, photo } = req.body;

        // Assurez-vous de valider toutes les données nécessaires ici avant de créer l'hôtel

        if (!title || !address || !price || !email || !telephone || !devise || !photo) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const hotel = await Hotel.create({ title, address, price, email, telephone, devise, photo });
        console.log('Hotel created successfully:', hotel); // Affichage des données créées sur le terminal
        res.status(201).json({ message: 'Hotel created successfully', hotel });
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).json({ message: 'Failed to create hotel' });
    }
};

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error getting hotels:', error);
        res.status(500).json({ message: 'Failed to get hotels' });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        console.error('Error getting hotel by ID:', error);
        res.status(500).json({ message: 'Failed to get hotel by ID' });
    }
};

exports.updateHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel updated successfully', hotel });
    } catch (error) {
        console.error('Error updating hotel by ID:', error);
        res.status(500).json({ message: 'Failed to update hotel by ID' });
    }
};

exports.deleteHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error('Error deleting hotel by ID:', error);
        res.status(500).json({ message: 'Failed to delete hotel by ID' });
    }
};
