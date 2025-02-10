const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerDocs = require('./config/swaggerConfig');
const verifyToken = require("./firebaseAdmin");  

dotenv.config();

const app = express();

// Cors Middleware
app.use(cors());

// JSON Middleware
app.use(express.json());

// Rotas
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes); 
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// Swagger
swaggerDocs(app);

// Rota principal
app.get('/', (req, res) => {
  res.send('API running');
});

// Rota protegida para teste
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Usuário autenticado!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));