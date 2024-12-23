import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientList from "../components/ClientList";
import ClientForm from "../components/ClientForm";
import { Typography, Box } from "@mui/material";
import { Client } from "../models/types";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  useEffect(() => {
    axios
      .get<Client[]>("http://localhost:5010/api/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>
      <ClientForm clientToEdit={clientToEdit} setClients={setClients} />
      <ClientList
        clients={clients}
        setClients={setClients}
        onClientSelected={(client) => setClientToEdit(client)}
      />
    </Box>
  );
};

export default ClientsPage;
