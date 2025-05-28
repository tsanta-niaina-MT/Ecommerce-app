const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/:userId/create', orderController.createOrder); // créer une commande
router.get('/user/:userId', orderController.getOrders); // voir commandes d’un utilisateur
router.get('/details/:orderId', orderController.getOrderById); // voir détails commande
router.put('/:orderId/status', orderController.updateOrderStatus); // mettre à jour statut commande

module.exports = router;
