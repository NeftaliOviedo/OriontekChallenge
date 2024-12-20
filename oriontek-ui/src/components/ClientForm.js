import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const ClientForm = ({ setClients, clientToEdit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (clientToEdit._id) {
      setFormData({ ...clientToEdit });
    }
  }, [clientToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientToEdit._id) {
      axios
        .put(`http://localhost:5100/api/clients/${clientToEdit._id}`, formData)
        .then((response) => setClients(response.data))
        .catch((error) => console.error(error));
      return;
    }
    axios
      .post("http://localhost:5100/api/clients", formData)
      .then((response) => setClients((prev) => [...prev, response.data]))
      .catch((error) => console.error(error));
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
      <Button type="submit" variant="contained" color="primary" sx={{margin:2}}>
        {clientToEdit._id ? "Editar" :'Añadir'} Cliente
      </Button>
      <Button variant="outlined" color="primary" onClick={()=>setFormData({ name: "", email: "", phone: "" })}>
       Limpiar
      </Button>
    </Box>
  );
};

export default ClientForm;
