import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";
import { Address } from '../models/types';


interface AddressListProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, setAddresses }) => {
  const handleDelete = async (addressId: string) => {
    try {
      await axios.delete(`http://localhost:5010/api/addresses/${addressId}/delete`);
      setAddresses((prev) => prev.filter((address) => address._id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <List>
      {addresses.map((address) => (
        <ListItem key={address._id} divider>
          <ListItemText primary={`${address.street}, ${address.city}, ${address.state}`} />
          <Button variant="contained" color="secondary" onClick={() => handleDelete(address._id!)}>
            Eliminar
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AddressList;
