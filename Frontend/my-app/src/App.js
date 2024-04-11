// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/home';




function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login/>} />
          <Route path="/login" element={Login} />
          <Route path="/register/user" element={<Register/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/categories" element={<CategoryList/>} />


          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
