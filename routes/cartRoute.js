const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCart); // voir panier d’un utilisateur
router.post('/:userId/add', cartController.addToCart); // ajouter produit
router.put('/:userId/update', cartController.updateCartItem); // modifier quantité
router.delete('/:userId/remove/:productId', cartController.removeFromCart); // retirer produit

module.exports = router;
