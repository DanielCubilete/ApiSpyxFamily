import Temporadas from './components/Temporadas';
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
import PersonajeDetail from './components/personajes/PersonajeDetail';
import PersonajeForm from './components/personajes/PersonajeForm';

// Componentes de Episodios
import EpisodioList from './components/episodios/EpisodioList';
import EpisodioDetail from './components/episodios/EpisodioDetail';

// Componentes de Tomos
import TomoList from './components/tomos/TomoList';
import TomoDetail from './components/tomos/TomoDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          return (
            <Router>
              <div className="App">
                <Navbar />
                <Temporadas />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Rutas de Temporadas */}
                  <Route path="/temporadas" element={<TemporadaList />} />
                  <Route path="/temporadas/nueva" element={<TemporadaForm />} />
                  <Route path="/temporadas/editar/:id" element={<TemporadaForm />} />
                  <Route path="/temporadas/:id" element={<TemporadaDetail />} />
                  {/* Rutas de Personajes */}
                  <Route path="/personajes" element={<PersonajeList />} />
                  <Route path="/personajes/nuevo" element={<PersonajeForm />} />
                  <Route path="/personajes/editar/:id" element={<PersonajeForm />} />
                  <Route path="/personajes/:id" element={<PersonajeDetail />} />
                  {/* Rutas de Episodios */}
                  <Route path="/episodios" element={<EpisodioList />} />
                  <Route path="/episodios/:id" element={<EpisodioDetail />} />
                  {/* Rutas de Tomos */}
                  <Route path="/tomos" element={<TomoList />} />
                  <Route path="/tomos/:id" element={<TomoDetail />} />
                </Routes>
              </div>
            </Router>
          );
}

export default App;
