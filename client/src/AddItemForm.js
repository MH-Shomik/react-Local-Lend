import React, { useState } from 'react';
import axios from 'axios';

// We pass the fetchItems function down as a prop
function AddItemForm({ onAddItem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!name) {
            alert('Please enter an item name.');
            return;
        }
        try {
            const newItem = { name, description };
            await axios.post('http://localhost:5001/api/items', newItem);
            onAddItem(); // Call the passed-in function to refresh the list
            setName(''); // Clear the form
            setDescription('');
        } catch (err) {
            console.error('Error adding item:', err);
            alert('Failed to add item.');
        }
    };

    return (
        <div className="form-container">
            <h3>Add a New Item to Lend</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item Name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Item Description"
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItemForm;