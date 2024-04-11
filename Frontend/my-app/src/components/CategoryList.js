// CategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/get/categories');
                setCategories(response.data.categories);
                
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-page-container">
            <h1>Categories</h1>
            <ul className="category-list">
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
