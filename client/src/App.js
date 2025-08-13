import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './AddItemForm'; // Import the new component
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This function is now also used by the form to refresh the list
    const fetchItems = async () => {
        setLoading(true); // Show loading indicator during refresh
        try {
            const response = await axios.get('http://localhost:5001/api/items');
            setItems(response.data);
        } catch (err) {
            setError('Failed to fetch items. Is the server running?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Local Lend</h1>
                <p>Share with your neighbors!</p>
            </header>
            <main className="App-main">
                {/* Add the form component here */}
                <AddItemForm onAddItem={fetchItems} />

                <h2>Available Items</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                <div className="items-grid">
                    {items.map(item => (
                        <div key={item.item_id} className="item-card">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <small>Owner: {item.owner_name}</small>
                            <button disabled={item.is_borrowed}>
                                {item.is_borrowed ? 'Borrowed' : 'Borrow'}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
