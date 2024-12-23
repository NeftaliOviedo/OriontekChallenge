import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";
import { Typography, Box, Button } from "@mui/material";
import { Address } from "../models/types";

const AddressesPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      axios
        .get<Address[]>(`http://localhost:5010/api/addresses/${clientId}`,{headers: { 'Content-Type': 'application/json' }})
        .then((response) => setAddresses(response.data))
        .catch((error) => console.error(error));
    }
  }, [clientId]);

  return (
    <Box mt={4}>
      <Button variant="outlined" onClick={() => navigate("/clientes")} sx={{ margin: 2 }}>
        Volver a Clientes
      </Button>
      <Typography variant="h4" gutterBottom>
        Direcciones
      </Typography>
      <AddressForm setAddresses={setAddresses} clientId={clientId!} />
      <AddressList addresses={addresses} setAddresses={setAddresses} />
    </Box>
  );
};

export default AddressesPage;
