const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function setup() {
    const config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
    };

    try {
        const connection = await mysql.createConnection(config);
        console.log('Successfully connected to MySQL server.');

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'sparepart_db'}`);
        console.log(`Database "${process.env.DB_NAME || 'sparepart_db'}" ready.`);

        await connection.query(`USE ${process.env.DB_NAME || 'sparepart_db'}`);

        // Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('Admin', 'User') DEFAULT 'User',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table "users" ready.');

        // Create other tables
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS stores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address TEXT,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tables "categories" and "stores" ready.');

        // Check/Insert Admin (password: admin123)
        const [rows] = await connection.query('SELECT * FROM users WHERE username = "admin"');
        if (rows.length === 0) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hashedPassword, 'Admin']);
            console.log('Default Admin user created (admin / admin123).');
        } else {
            console.log('Admin user already exists.');
        }

        console.log('DATABASE SETUP COMPLETED SUCCESSFULLY!');
        await connection.end();
    } catch (error) {
        console.error('ERROR DURING SETUP:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('\n>>> MOHON NYALAKAN MYSQL DI XAMPP TERLEBIH DAHULU! <<<');
        }
    }
}

setup();
