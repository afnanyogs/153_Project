const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Roomparts API is running...');
});

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const storeRoutes = require('./routes/stores');
const sparepartRoutes = require('./routes/spareparts');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/stores', storeRoutes);
app.use('/spareparts', sparepartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
