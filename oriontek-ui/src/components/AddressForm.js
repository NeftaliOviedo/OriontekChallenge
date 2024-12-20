import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddressForm = ({ setAddresses, clientId }) => {
  const [formData, setFormData] = useState({ street: '', city: '', state: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5100/api/addresses/${clientId}`, formData);
      setAddresses((prev) => [...prev, response.data]);
      setFormData({ street: '', city: '', state: '' }); 
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Añadir Dirección
      </Typography>
      <TextField
        name="street"
        label="Calle"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.street}
        required
      />
      <TextField
        name="city"
        label="Ciudad"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.city}
        required
      />
      <TextField
        name="state"
        label="Provincia"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.state}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Añadir Dirección
      </Button>
    </Box>
  );
};

export default AddressForm;
