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
const checkoutRoutes = require('./routes/checkoutRoutes'); 

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://groove-store-t1s5.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes); 
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);


swaggerDocs(app);

app.get('/', (req, res) => {
  res.send('API running');
});

// Test Route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "User", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));