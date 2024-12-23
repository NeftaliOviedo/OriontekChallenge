import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Address } from "../models/types";

interface AddressFormProps {
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  clientId: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  setAddresses,
  clientId,
}) => {
  const [formData, setFormData] = useState<Address>({
    street: "",
    city: "",
    state: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Address[]>(
        `http://localhost:5010/api/addresses/${clientId}/create`,
        formData
      );
      setAddresses(response.data);
      setFormData({ street: "", city: "", state: "" });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      mt={2}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
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
