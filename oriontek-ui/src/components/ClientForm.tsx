import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { Client } from "../models/types";

interface ClientFormProps {
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  clientToEdit: Client | null;
}

const ClientForm: React.FC<ClientFormProps> = ({
  setClients,
  clientToEdit,
}) => {
  const { name, email, phone } = clientToEdit || {
    name: "",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState<Client>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (clientToEdit?._id) {
      setFormData({ name, email, phone });
    }
  }, [clientToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (clientToEdit?._id) {
        const response = await axios.put<Client[]>(
          `http://localhost:5010/api/clients/${clientToEdit._id}/update`,
          formData
        );
        setClients(response.data);
      } else {
        const response = await axios.post<Client[]>(
          "http://localhost:5010/api/clients/create",
          formData
        );
        setClients(response.data);
      }
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <TextField
        name="name"
        label="Nombre"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <TextField
        name="email"
        label="Correo Electrónico"
        type="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <TextField
        name="phone"
        label="Teléfono"
        type="tel"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formData.phone}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
      >
        {clientToEdit?._id ? "Editar" : "Añadir"} Cliente
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setFormData({ name: "", email: "", phone: "" })}
      >
        Limpiar
      </Button>
    </Box>
  );
};

export default ClientForm;
