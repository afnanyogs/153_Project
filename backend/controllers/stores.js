const db = require('../config/db');

exports.getAllStores = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM stores');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStoreById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM stores WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Store not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStore = async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        await db.execute('INSERT INTO stores (name, address, phone) VALUES (?, ?, ?)', [name, address, phone]);
        res.status(201).json({ message: 'Store created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStore = async (req, res) => {
    const { name, address, phone } = req.body;
    try {
        await db.execute('UPDATE stores SET name = ?, address = ?, phone = ? WHERE id = ?', [name, address, phone, req.params.id]);
        res.json({ message: 'Store updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStore = async (req, res) => {
    try {
        await db.execute('DELETE FROM stores WHERE id = ?', [req.params.id]);
        res.json({ message: 'Store deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
