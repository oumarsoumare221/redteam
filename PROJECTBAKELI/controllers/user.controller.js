const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in the database
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Successful authentication
        res.status(200).json({ message: "Connexion réussie.", user });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const { password, ...otherData } = req.body;

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ ...otherData, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ message: error.message });
    }
};
