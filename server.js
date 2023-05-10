const express = require('express');
const mongoose = require('mongoose');
const dashboardRouter = require('./routes/dashboardRoutes');
const productsRouter = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());

//DB config
const MONGODB_URI = process.env.MONGODB_URI || require('./config').mongoDB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Check Connection
let db = mongoose.connection;
db.once('open', () => {
   console.log('Database connected successfully!')
})


// Check for DB Errors
db.on('error', (error) => {
   console.log(error);
})

// Routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/products', productsRouter);

// Define the PORT
const PORT = process.env.PORT || 5005

//Listening to port
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
})