import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Client } from "../models/types";


interface ClientListProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  onClientSelected: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, setClients, onClientSelected }) => {
  const navigate = useNavigate();

  const handleDelete = async (clientId: string) => {
    try {
      await axios.delete(`http://localhost:5010/api/clients/${clientId}/delete`);
      setClients((prev) => prev.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <List>
      {clients.map((client) => (
        <ListItem key={client._id} divider>
          <ListItemText
            primary={client.name}
            secondary={`${client.email} - ${client.phone}`}
          />
          <Button variant="outlined" onClick={() => navigate(`/direcciones/${client._id}`)}>
            Ver Direcciones
          </Button>
          <Button variant="contained" color="info" onClick={() => onClientSelected(client)} sx={{ margin: 2 }}>
            Editar
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(client._id!)}>
            Eliminar
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ClientList;
