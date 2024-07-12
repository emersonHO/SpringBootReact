import React, { useState, useEffect, useCallback } from 'react';
import AlumnoService from '../services/AlumnoService';
import { Link, useParams } from 'react-router-dom';

const ListAlumnosComponent = () => {
    const { cursoId } = useParams();
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
        try {
            await AlumnoService.deleteAlumno(alumnoId);
            fetchAlumnos();
        } catch (error) {
            console.error('Error deleting alumno:', error);
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
                                <button className="btn btn-danger" onClick={() => deleteAlumno(alumno.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <label htmlFor="fileUpload" className="btn btn-success">
                    Importar Alumnos CSV
                    <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={handleFileUpload} accept=".csv" />
                </label>
                {/* <button className="btn btn-success" onClick={handleExportAlumnos}>Exportar Alumnos CSV</button> */}
                
            </div>
            <a href='http://localhost:8080/api/v1/alumnos/exportar' target='_blank'>Exportar </a>
        </div>
    );
};

export default ListAlumnosComponent;
