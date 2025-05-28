const { Cart, Product } = require('../models');

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Vérifier si produit existe
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    // Vérifier si produit déjà dans panier
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      // Met à jour la quantité
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer le panier d’un utilisateur
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }]
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un produit du panier
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) return res.status(404).json({ message: 'Produit non trouvé dans le panier' });

    await cartItem.destroy();
    res.json({ message: 'Produit retiré du panier' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Modifier la quantité d'un produit dans le panier
exports.updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) return res.status(404).json({ message: 'Produit non trouvé dans le panier' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

