const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/productRoutes');
const quotationRouter = require('./routes/quotationRoutes');
const invoiceRouter = require('./routes/invoiceRoutes')
const receiptRouter = require('./routes/receiptRoutes')
const salesAgentRouter = require('./routes/salesAgentRoutes')
const shopLocatorRouter = require('./routes/shopLocatorRoutes')
const inventoryRouter = require('./routes/inventoryRoutes')

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// DB config
const MONGODB_URI = process.env.MONGODB_URI || require('./config').mongoDB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check Connection
let db = mongoose.connection;
db.once('open', () => {
   console.log('Database connected successfully!');
});

// Check for DB Errors
db.on('error', (error) => {
   console.log(error);
});

// Routes
app.use('/api', productsRouter);
app.use('/api', quotationRouter); 
app.use('/api', invoiceRouter);
app.use('/api', receiptRouter);
app.use('/api', salesAgentRouter);
app.use('/api', shopLocatorRouter);
app.use('/api', inventoryRouter);

// Define the PORT
const PORT = process.env.PORT || 5005;

// Listening to port
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
});