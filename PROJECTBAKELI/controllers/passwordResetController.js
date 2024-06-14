const User = require('../models/User'); // Assurez-vous d'importer votre modèle User
const { generateResetToken } = require('../utils/passwordUtils'); // Importez votre fonction pour générer le token de réinitialisation

exports.processResetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    try {
        // Vérifier si l'utilisateur avec cet e-mail existe dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet e-mail.' });
        }

        // Générer et sauvegarder un token de réinitialisation de mot de passe pour cet utilisateur
        const resetToken = generateResetToken(); // Fonction pour générer le token

        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 heure d'expiration du token

        await user.save();

        // Envoyer l'e-mail de réinitialisation de mot de passe ici (à implémenter)

        res.status(200).json({ message: 'Instructions de réinitialisation envoyées par e-mail.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
};

exports.showResetPasswordForm = (req, res) => {
    // Code pour afficher le formulaire de réinitialisation de mot de passe
    // Vous pouvez renvoyer une vue HTML ou utiliser un template engine comme Handlebars, EJS, etc.
    res.render('resetPasswordForm');
};
