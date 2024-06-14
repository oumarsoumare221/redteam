const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importez le contrôleur d'utilisateur

// Routes pour les utilisateurs
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);


module.exports = router;
