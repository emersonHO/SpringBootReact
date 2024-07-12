import React, { useState, useEffect, useCallback } from 'react';
import AlumnoService from '../services/AlumnoService';
import { Link, useParams } from 'react-router-dom';

const ListAlumnosComponent = () => {
    const { cursoId } = useParams();
    const [dropdownId, setDropdownId] = useState(null);
    const [alumnos, setAlumnos] = useState([]);

    const fetchAlumnos = useCallback(async () => {
        try {
            const response = await AlumnoService.getAllAlumnosByCursoId(cursoId);
            setAlumnos(response.data);
            console.log(alumnos);
        } catch (error) {
            console.error('Error fetching alumnos:', error);
        }
    }, [cursoId]);

    useEffect(() => {
        fetchAlumnos();
    }, [fetchAlumnos]);

    const deleteAlumno = async (alumnoId) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar este alumno?");
        if (confirm) {
            try {
                console.log(`Deleting alumno with ID: ${alumnoId}`);
                await AlumnoService.deleteAlumno(alumnoId);
                console.log('Alumno deleted successfully');
                fetchAlumnos(); // Vuelve a cargar la lista después de eliminar
            } catch (error) {
                console.error('Error deleting alumno:', error.response ? error.response.data : error.message);
            }
        }
    };

      const toggleDropdown = (alumnoId) => {
        if (dropdownId === alumnoId) {
            setDropdownId(null);
        } else {
            setDropdownId(alumnoId);
        }
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            await AlumnoService.importarAlumnosCSV(formData);
            fetchAlumnos();
            alert('Archivo CSV importado correctamente.');
        } catch (error) {
            console.error('Error importing CSV file:', error);
            alert('Error al importar archivo CSV.');
        }
    };

    const handleExportAlumnos = async () => {
        try {
            const response = await AlumnoService.exportarAlumnosCSV();
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'alumnos.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting alumnos:', error);
        }
    };

    return (
        <div>
            <h2>Listado de Alumnos</h2>
            <Link to={`/cursos/${cursoId}/alumnos/add-alumno`} className="btn btn-primary mb-2">Agregar Alumno</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno => (
                        <tr key={alumno.id}>
                            <td>{alumno.id}</td>
                            <td>{alumno.nombres}</td>
                            <td>{alumno.apellidos}</td>
                            <td>{alumno.email}</td>
                            <td>
                                <Link to={`/cursos/${cursoId}/alumnos/edit-alumno/${alumno.id}`} className="btn btn-info">Editar</Link>
                                <button className="btn btn-danger" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAlumno(alumno.id);
                                    setDropdownId(null);
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
               <label htmlFor="fileUpload" className="btn btn-success btn-lg">
              Importar Alumnos CSV
                 <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={handleFileUpload} accept=".csv" />
                 </label>
                <a href='http://localhost:8080/api/v1/alumnos/exportar' className="btn btn-success btn-lg" target='_blank' rel="noopener noreferrer">
                 Exportar Alumnos CSV
                </a>
</div>
            
        </div>
    );
};

export default ListAlumnosComponent;
