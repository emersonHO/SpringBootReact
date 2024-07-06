import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CalendarioComponent.css';
import { FaCalendarAlt } from 'react-icons/fa';

const CalendarioComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    if (selectedDate) {
      alert(`Buscando cursos para la fecha: ${selectedDate.toLocaleDateString('es-ES')}`);
      // Aquí puedes agregar la lógica para buscar cursos en la fecha seleccionada
    } else {
      alert('Por favor, selecciona una fecha.');
    }
  };

  return (
    <div className="calendario-container">
      <h2>Calendario de Cursos</h2>
      <div className="input-container">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Digite el día deseado (dd/MM/AAAA)"
          className="date-picker"
        />
        <button className="search-button" onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default CalendarioComponent;
