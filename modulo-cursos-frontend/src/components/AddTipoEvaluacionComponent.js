// src/components/AddTipoEvaluacionComponent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TipoEvaluacionService from '../services/TipoEvaluacionService';

const AddTipoEvaluacionComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (id) {
            TipoEvaluacionService.getTipoEvaluacionById(id).then(response => {
                const tipoEvaluacion = response.data;
                setNombre(tipoEvaluacion.nombre);
                setDescripcion(tipoEvaluacion.descripcion);
            });
        }
    }, [id]);

    const saveOrUpdateTipoEvaluacion = (e) => {
        e.preventDefault();

        const tipoEvaluacion = { nombre, descripcion };

        if (id) {
            TipoEvaluacionService.updateTipoEvaluacion(id, tipoEvaluacion).then(() => {
                navigate('/tipoevaluacion');
            });
        } else {
            TipoEvaluacionService.createTipoEvaluacion(tipoEvaluacion).then(() => {
                navigate('/tipoevaluacion');
            });
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Editar Tipo de Evaluación' : 'Añadir Tipo de Evaluación'}</h2>
            <form>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                    />
                </div>
                <button className="btn btn-primary" onClick={saveOrUpdateTipoEvaluacion}>Guardar</button>
            </form>
        </div>
    );
};

export default AddTipoEvaluacionComponent;
