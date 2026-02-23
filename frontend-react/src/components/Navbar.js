import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          🕵️ Spy x Family API
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/temporadas" onClick={closeNavbar}>
                📺 Temporadas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/episodios" onClick={closeNavbar}>
                🎬 Episodios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/personajes" onClick={closeNavbar}>
                👥 Personajes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tomos" onClick={closeNavbar}>
                📖 Tomos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
