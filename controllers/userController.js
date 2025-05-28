const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secretkey'; 

// Inscription
exports.register = async (req, res) => {
  try {
    const { name, email, password, adresse } = req.body;

    // Vérifier si email existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hash du password
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hash, adresse });

    res.status(201).json({ message: 'Utilisateur créé', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });

    res.json({ message: 'Connecté', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
