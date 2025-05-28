const { Product } = require('../models');

// Lister les produits, avec tri / filtre simple via query params
exports.getAll = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sortBy, order } = req.query;

    // Construire filtre
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Construire ordre
    let orderArr = [];
    if (sortBy) orderArr.push([sortBy, order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']);

    // Recherche simple sur le nom
    const where = {};
    if (search) {
      where.name = {
        [require('sequelize').Op.iLike]: `%${search}%`
      };
    }
    Object.assign(where, filter);

    const products = await Product.findAll({ where, order: orderArr });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un produit
exports.create = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const product = await Product.create({ name, category, price, description });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un produit par ID
exports.getOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un produit
exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un produit
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await product.destroy();
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
