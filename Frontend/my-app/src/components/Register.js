import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    hobbies: '',
    profilePic: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('firstName', formData.firstName);
      formDataWithImage.append('lastName', formData.lastName);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('password', formData.password);
      formDataWithImage.append('gender', formData.gender);
      formDataWithImage.append('hobbies', formData.hobbies);
      formDataWithImage.append('image', formData.profilePic);

      await axios.post('http://localhost:4000/register/user', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Redirect user to login page after successful registration
      navigate('/login/user');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333333' }}>Register</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="hobbies"
            placeholder="Hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          {/* Input field for image upload */}
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            accept="image/*" // Accepts only image files
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#ffffff', cursor: 'pointer' }}>Register</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Register;
  


















            