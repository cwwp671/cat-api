import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatList = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await axios.get('/cats');
                setCats(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCats();
    }, []);

    return (
        <div>
            <h2>Cats:</h2>
            <ul>
                {cats.map(cat => (
                    <li key={cat._id}>
                        <img src={`http://localhost:3000/${cat.image}`} alt={cat.name} />
                        <p>{cat.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatList;
