import React, { useState } from 'react';
import axios from 'axios';
import './SignupScreen.css';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    sleepTime: '',
    birthdate: '',
    medication: '',
    pain: '',
    financialStatus: '',
    therapyType: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (selectedImage) {
      data.append('image', selectedImage);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/dashboardscreen');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <input name="age" placeholder="Age" type="number" onChange={handleChange} />
        <input name="gender" placeholder="Gender" onChange={handleChange} />
        <input name="height" placeholder="Height (cm)" type="number" onChange={handleChange} />
        <input name="weight" placeholder="Weight (kg)" type="number" onChange={handleChange} />
        <input name="sleepTime" placeholder="Average Sleep Time (hours)" type="number" onChange={handleChange} />
        <input name="birthdate" placeholder="Birthdate (YYYY-MM-DD)" onChange={handleChange} />
        <input name="medication" placeholder="Currently taking any medication?" onChange={handleChange} />
        <input name="pain" placeholder="Any pain?" onChange={handleChange} />
        <input name="financialStatus" placeholder="Financial Status" onChange={handleChange} />
        <select name="therapyType" onChange={handleChange}>
          <option value="">Select Therapy Type</option>
          <option value="individual">Individual Therapy</option>
          <option value="couple">Couple Therapy</option>
          <option value="child_teen">Child/Teen Therapy</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }}
          />
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupScreen;
