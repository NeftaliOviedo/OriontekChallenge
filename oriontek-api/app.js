
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const clientRoutes = require('./routes/clientRoutes');
const addressRoutes = require('./routes/addressRoutes');
const { connectDB } = require('./utils/database');

// Load environment variables
dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/addresses', addressRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});