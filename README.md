# tampilan ![Uploading Screenshot 2026-01-12 235535.png…]()

# Car Spareparts Store Information System

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup Instructions

### 1. Database Setup
- Open your MySQL terminal or GUI (like phpMyAdmin or MySQL Workbench).
- Run the SQL commands in `schema.sql` to create the database and tables.

### 2. Backend Setup
- Go to the `backend` directory.
- Run `npm install` to install dependencies.
- Open `.env` and adjust the database credentials (`DB_USER`, `DB_PASS`, `DB_NAME`) to match your MySQL setup.
- Run `npm start` to start the backend server on `http://localhost:5000`.

### 3. Frontend Setup
- Open `frontend/index.html` directly in your browser or use a live server.

## Default Accounts
- **Admin**: `admin` / `admin123`
- **User**: `user` / `admin123`

## Features
- **Admin**: Manage stores, categories, spareparts, and users.
- **User**: Browse and search spareparts across all stores.
- **Premium Design**: Modern glassmorphism UI with responsive grid.
