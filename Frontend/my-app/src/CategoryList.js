// CategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
