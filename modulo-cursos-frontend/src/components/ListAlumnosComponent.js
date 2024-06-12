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
        </div>
    );
};

export default ListAlumnosComponent;
