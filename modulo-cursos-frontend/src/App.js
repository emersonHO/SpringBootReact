import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListCursosComponent from './components/ListCursosComponent';
import AddCursoComponent from './components/AddCursoComponent';
import CursoDetailsComponent from './components/CursoDetailsComponent';
import SidebarComponent from './components/SidebarComponent';
import FormulasComponent from './components/FormulasComponent';
import CalendarioComponent from './components/CalendarioComponent';
import ListAlumnosComponent from './components/ListAlumnosComponent'; // Importa el nuevo componente
import AddAlumnoComponent from './components/AddAlumnoComponent';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <HeaderComponent />
        <div className="main-content">
          <SidebarComponent />
          <div className="content-area">
            <Routes>
              <Route exact path="/" element={<HomeComponent />} />
              <Route path="/cursos" element={<ListCursosComponent />} />
              <Route path="/cursos/:id" element={<CursoDetailsComponent />} />
              <Route path="/add-curso" element={<AddCursoComponent />} />
              <Route path="/edit-curso/:id" element={<AddCursoComponent />} />
              <Route path="/formulas" element={<FormulasComponent />} />
              <Route path="/calendario" element={<CalendarioComponent />} />
              <Route path="/cursos/:cursoId/alumnos" element={<ListAlumnosComponent />} />
              <Route path="/cursos/:cursoId/alumnos/add-alumno" element={<AddAlumnoComponent />} />
              <Route path="/cursos/:cursoId/alumnos/edit-alumno/:alumnoId" element={<AddAlumnoComponent />} />
            </Routes>
          </div>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
