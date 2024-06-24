// // authMiddleware.js

// function isAuthenticated(req, res, next) {
//     // Ici, vous pouvez vérifier si l'utilisateur est authentifié
//     // Par exemple, vérifier un token JWT, la session, etc.
//     const isLoggedIn = true; // À remplacer par votre logique d'authentification

//     if (isLoggedIn) {
//         next(); // Passez à la prochaine fonction (route handler)
//     } else {
//         res.status(401).json({ message: 'Non authentifié' });
//     }
// }

// module.exports = { isAuthenticated };
