import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const AddressList = ({ addresses, setAddresses }) => {
  const handleDelete = (addressId) => {
    axios.delete(`http://localhost:5100/api/addresses/${addressId}`)
      .then(() => setAddresses(prev => prev.filter(address => address._id !== addressId)))
      .catch(error => console.error(error));
  };

  return (
    <List>
      {addresses.map(address => (
        <ListItem key={address._id} divider>
          <ListItemText
            primary={`${address.street}, ${address.city}, ${address.state}`}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(address._id)}
          >
            Eliminar
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AddressList;