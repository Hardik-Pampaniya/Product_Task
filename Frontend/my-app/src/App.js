// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';




function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login/>} />
          {/* <Route path="/login" element={Login} /> */}
          <Route path="/register/user" element={<Register/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
