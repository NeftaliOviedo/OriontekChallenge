import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressList from '../components/AddressList';
import AddressForm from '../components/AddressForm';
import { Typography, Box, Button } from '@mui/material';

const AddressesPage = () => {
  const { clientId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5100/api/addresses/${clientId}`)
      .then(response => setAddresses(response.data))
      .catch(error => console.error(error));
  }, [clientId]);

  return (
    <Box mt={4}>
      <Button variant="outlined" onClick={() => navigate('/clientes')} sx={{margin:2}}>
        Volver a Clientes
      </Button>
      <Typography variant="h4" gutterBottom>
        Direcciones
      </Typography>
      <AddressForm setAddresses={setAddresses} clientId={clientId} />
      <AddressList addresses={addresses} setAddresses={setAddresses} />
    </Box>
  );
};

export default AddressesPage;