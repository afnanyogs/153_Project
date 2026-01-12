const db = require('../config/db');

exports.getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await db.execute('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Category created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await db.execute('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id]);
        res.json({ message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await db.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
