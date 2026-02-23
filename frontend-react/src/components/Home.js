import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="display-4">🕵️ Spy x Family Database</h1>
        <p className="lead">
          Explora el universo de Spy x Family con información completa sobre temporadas,
          episodios, personajes y tomos del manga.
        </p>
        <p className="text-muted">Frontend desarrollado con React + Hooks</p>
      </div>

      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <Link to="/temporadas" className="card-link">
              <div className="card text-center shadow-sm card-hover">
                <div className="card-body">
                  <div className="icon-large">📺</div>
                  <h5 className="card-title">Temporadas</h5>
                  <p className="card-text">Explora las temporadas del anime</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/episodios" className="card-link">
              <div className="card text-center shadow-sm card-hover">
                <div className="card-body">
                  <div className="icon-large">🎬</div>
                  <h5 className="card-title">Episodios</h5>
                  <p className="card-text">Descubre todos los episodios</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/personajes" className="card-link">
              <div className="card text-center shadow-sm card-hover">
                <div className="card-body">
                  <div className="icon-large">👥</div>
                  <h5 className="card-title">Personajes</h5>
                  <p className="card-text">Conoce a todos los personajes</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/tomos" className="card-link">
              <div className="card text-center shadow-sm card-hover">
                <div className="card-body">
                  <div className="icon-large">📖</div>
                  <h5 className="card-title">Tomos</h5>
                  <p className="card-text">Explora los tomos del manga</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
