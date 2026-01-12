CREATE DATABASE IF NOT EXISTS sparepart_db;
USE sparepart_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') DEFAULT 'User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spareparts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    price DECIMAL(15, 2),
    stock INT DEFAULT 0,
    category_id INT,
    store_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- Initial Admin Data (password is 'admin123' bcrypt hashed)
INSERT INTO users (username, password, role) VALUES 
('admin', '$2a$10$X.fO0P.wI8b7w9H.E/V1O.8G0H4U.v8e9n.e2v1o8p.V.r8g0h4U', 'Admin'),
('user', '$2a$10$X.fO0P.wI8b7w9H.E/V1O.8G0H4U.v8e9n.e2v1o8p.V.r8g0h4U', 'User');

-- Initial Categories
INSERT INTO categories (name) VALUES ('Mesin'), ('Kaki-kaki'), ('Interior'), ('Eksterior'), ('Kelistrikan');
