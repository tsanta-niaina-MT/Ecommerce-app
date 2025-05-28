const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Liste tous les produits (avec filtres / tri en query params)
router.get('/', productController.getAll);

// Créer un produit
router.post('/', productController.create);

// Récupérer un produit par ID
router.get('/:id', productController.getOne);

// Mettre à jour un produit
router.put('/:id', productController.update);

// Supprimer un produit
router.delete('/:id', productController.delete);

module.exports = router;
