import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componentes comunes
import Navbar from './components/Navbar';
import Home from './components/Home';

// Componentes de Temporadas
import TemporadaList from './components/temporadas/TemporadaList';
import TemporadaDetail from './components/temporadas/TemporadaDetail';
import TemporadaForm from './components/temporadas/TemporadaForm';

// Componentes de Personajes
import PersonajeList from './components/personajes/PersonajeList';

// Componentes de Episodios
import EpisodioList from './components/episodios/EpisodioList';

// Componentes de Tomos
import TomoList from './components/tomos/TomoList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rutas de Temporadas */}
          <Route path="/temporadas" element={<TemporadaList />} />
          <Route path="/temporadas/nueva" element={<TemporadaForm />} />
          <Route path="/temporadas/:id" element={<TemporadaDetail />} />
          <Route path="/temporadas/editar/:id" element={<TemporadaForm />} />
          
          {/* Rutas de Personajes */}
          <Route path="/personajes" element={<PersonajeList />} />
          
          {/* Rutas de Episodios */}
          <Route path="/episodios" element={<EpisodioList />} />
          
          {/* Rutas de Tomos */}
          <Route path="/tomos" element={<TomoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
