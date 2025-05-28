const { Order, Cart, Product } = require('../models');

// Créer une commande depuis le panier d’un utilisateur
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    // Récupérer les produits du panier
    const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    // Calculer le total
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);

    // Créer la commande
    const order = await Order.create({ userId, total, status: 'en_attente' });

    // Vider le panier
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ message: 'Commande créée', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les commandes d’un utilisateur
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une commande par son ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le statut d’une commande
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Statut mis à jour', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
