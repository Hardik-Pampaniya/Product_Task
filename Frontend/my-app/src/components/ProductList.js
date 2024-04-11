// ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ProductPage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("accessToken")
    
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    },[token,navigate])

    useEffect(() => {
        const fetchProducts = async () => {
          // console.log(token);
            try {
                const response = await axios.get('http://localhost:4000/get/products',{
                  headers: {
                    Authorization: `Bearer ${token}`  
                }
                });
                
                setProducts(response.data.products);
                if (response.status === 200) {
                  toast.success('Login Successfully');
              } else {
                  toast.error('Login failed. Please try again.');
                  console.error('Login failed:', response.data.message);
              }

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-page-container">
            <h1>Products</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPage;
