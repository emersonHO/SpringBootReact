import React, { useState, useEffect } from 'react';
import CursoService from '../services/CursoService';
import '../styles/CalendarioComponent.css'; // Importa el archivo CSS

const CalendarioComponent = () => {
  const [fecha, setFecha] = useState('');
  const [cursos, setCursos] = useState([]);

  const fetchCursos = async () => {
    try {
      const response = await CursoService.getAllCursos();
      const diaSemana = new Date(fecha).getDay(); // Obtiene el día de la semana (0 - domingo, 6 - sábado)
      const cursosFiltrados = response.data.filter(curso => curso.dia === diaSemana);
      setCursos(cursosFiltrados);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  };

  const handleSearch = () => {
    if (fecha) {
      fetchCursos();
    }
  };

  return (
    <div className="calendario-container">
      <h1>Calendario de Cursos</h1>
      <div className="search-container">
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        {cursos.map(curso => (
          <div key={curso.id} className="curso-card">
            <h2>{curso.nombre}</h2>
            <p>Día: {[ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"][curso.dia]}</p>
            <p>Sumilla: {curso.sumilla}</p>
            <p>Hora Inicio: {curso.hora_inicio}:00</p>
            <p>Hora Fin: {curso.hora_fin}:00</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioComponent;

