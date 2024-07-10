import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormulaService from '../services/FormulaService';

const AddFormulaComponent = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();
    const { cursoId, formulaId } = useParams();

    useEffect(() => {
        if (formulaId) {
            FormulaService.getFormulasByCursoId(cursoId).then(response => {
                const formula = response.data.find(f => f.id === parseInt(formulaId));
                setNombre(formula.nombre);
                setDescripcion(formula.descripcion);
            }).catch(error => {
                console.error('Error fetching formula:', error);
            });
        }
    }, [cursoId, formulaId]);

    const saveOrUpdateFormula = (e) => {
        e.preventDefault();
        const formula = { nombre, descripcion };

        if (formulaId) {
            FormulaService.updateFormula(formulaId, formula).then(() => {
                navigate(`/cursos/${cursoId}/formulas`);
            }).catch(error => {
                console.error('Error updating formula:', error);
            });
        } else {
            FormulaService.createFormula(cursoId, formula).then(() => {
                navigate(`/cursos/${cursoId}/formulas`);
            }).catch(error => {
                console.error('Error creating formula:', error);
            });
        }
    };

    return (
        <div>
            <h2>{formulaId ? 'Editar Formula' : 'Agregar Formula'}</h2>
            <form onSubmit={saveOrUpdateFormula}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default AddFormulaComponent;
