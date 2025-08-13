// Import required packages
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// --- SERVER SETUP ---
const app = express();
const PORT = 5001; // We'll use port 5001 for our backend

// --- MIDDLEWARE ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow server to accept JSON data

// --- DATABASE CONNECTION ---
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'locallend',
    password: 'mehedisk321', // <--- !! REPLACE THIS !!
    port: 5432,
});

// --- API ROUTES ---
// Create a new item
app.post("/api/items", async (req, res) => {
    try {
        // We get the name and description from the request's body
        const { name, description } = req.body;
        // For now, we'll hardcode the owner_id to 1 (alice)
        // In the future, this would come from the logged-in user
        const ownerId = 1;

        const newItem = await pool.query(
            "INSERT INTO items (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description, ownerId]
        );

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Get all items
app.get("/api/items", async (req, res) => {
    try {
        const allItems = await pool.query(
            `SELECT item_id, name, description, is_borrowed, username as owner_name
             FROM items
             JOIN users ON items.owner_id = users.user_id`
        );
        res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// --- START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});