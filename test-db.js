const db = require('./backend/config/db');

async function testConnection() {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log('Database Connection Success:', rows[0].result === 2);

        const [tables] = await db.execute('SHOW TABLES');
        console.log('Tables in database:', tables.map(t => Object.values(t)[0]));
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
    } finally {
        process.exit();
    }
}

testConnection();
