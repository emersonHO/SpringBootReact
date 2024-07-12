// src/components/ListTipoEvaluacionComponent.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TipoEvaluacionService from '../services/TipoEvaluacionService';

const ListTipoEvaluacionComponent = () => {
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]);

    useEffect(() => {
        TipoEvaluacionService.getAllTiposEvaluacion().then(response => {
            setTiposEvaluacion(response.data);
        });
    }, []);

    const deleteTipoEvaluacion = (id) => {
        TipoEvaluacionService.deleteTipoEvaluacion(id).then(() => {
            setTiposEvaluacion(tiposEvaluacion.filter(tipoEvaluacion => tipoEvaluacion.id !== id));
        });
    };

    return (
        <div className="container">
            <h2>Tipos de Evaluación</h2>
            <Link to="/tipoevaluacion/add" className="btn btn-primary">Añadir Tipo de Evaluación</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposEvaluacion.map(tipoEvaluacion => (
                        <tr key={tipoEvaluacion.id}>
                            <td>{tipoEvaluacion.nombre}</td>
                            <td>{tipoEvaluacion.descripcion}</td>
                            <td>
                                <Link to={`/tipoevaluacion/edit/${tipoEvaluacion.id}`} className="btn btn-info">Editar</Link>
                                <button onClick={() => deleteTipoEvaluacion(tipoEvaluacion.id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTipoEvaluacionComponent;
