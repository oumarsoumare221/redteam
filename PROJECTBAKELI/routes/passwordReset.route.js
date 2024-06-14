// routes/passwordReset.route.js

const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

// Route pour afficher le formulaire de réinitialisation de mot de passe
router.get('/reset-password', passwordResetController.showResetPasswordForm);

// Route pour soumettre le formulaire de réinitialisation de mot de passe
router.post('/reset-password', passwordResetController.processResetPasswordRequest);

module.exports = router;
