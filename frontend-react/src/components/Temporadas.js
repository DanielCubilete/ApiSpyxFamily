import React, { useEffect, useState } from 'react';

function Temporadas() {
  const [temporadas, setTemporadas] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/temporadas`;
    fetch(url)
      .then(response => response.json())
      .then(data => setTemporadas(data.data)) // si tu backend devuelve {data: [...]}
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Temporadas</h2>
      <ul>
        {temporadas.map(t => (
          <li key={t._id}>{t.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Temporadas;
