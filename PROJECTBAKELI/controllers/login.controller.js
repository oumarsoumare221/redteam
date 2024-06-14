// const User = require('../models/user.model');
// const bcrypt = require('bcrypt');

// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur non trouvé." });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Mot de passe incorrect." });
//         }

//         res.status(200).json({ message: "Connexion réussie.", user });
//     } catch (error) {
//         console.error("Erreur lors de la connexion :", error);
//         res.status(500).json({ message: "Erreur lors de la connexion." });
//     }
// };
