const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');  
const productRoutes = require('./routes/ProductRoute');
const userRoutes = require('./routes/UserRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base réussie');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Base de données synchronisée');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Erreur de connexion ou synchronisation :', err);
  });
