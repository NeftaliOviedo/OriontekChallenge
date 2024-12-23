import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import AddressesPage from './pages/AddressesPage';
import { Container, CssBaseline } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="App">
          <Routes>
            <Route index path='/clientes' element={<ClientsPage />} />
            <Route path="/direcciones/:clientId" element={<AddressesPage />} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;