import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FormulaService from '../services/FormulaService';

const ListFormulasComponent = () => {
    const { cursoId } = useParams();
    const [formulas, setFormulas] = useState([]);

    useEffect(() => {
        FormulaService.getFormulasByCursoId(cursoId).then(response => {
            setFormulas(response.data);
        }).catch(error => {
            console.error('Error fetching formulas:', error);
        });
    }, [cursoId]);

    const deleteFormula = (formulaId) => {
        FormulaService.deleteFormula(formulaId).then(() => {
            setFormulas(formulas.filter(formula => formula.id !== formulaId));
        }).catch(error => {
            console.error('Error deleting formula:', error);
        });
    };

    return (
        <div>
            <h2>Formulas para el curso {cursoId}</h2>
            <Link to={`/cursos/${cursoId}/formulas/add-formula`} className="btn btn-primary mb-2">Agregar Formula</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {formulas.map(formula => (
                        <tr key={formula.id}>
                            <td>{formula.nombre}</td>
                            <td>{formula.descripcion}</td>
                            <td>
                                <Link to={`/cursos/${cursoId}/formulas/edit-formula/${formula.id}`} className="btn btn-info">Editar</Link>
                                <button className="btn btn-danger" onClick={() => deleteFormula(formula.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListFormulasComponent;
