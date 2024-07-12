import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormulaService from '../services/FormulaService';

const ListFormulasComponent = () => {
    const { cursoId } = useParams();
    const [formulas, setFormulas] = useState([]);

    useEffect(() => {
        fetchFormulas();
    }, []);

    const fetchFormulas = async () => {
        try {
            const response = await FormulaService.getFormulasByCursoId(cursoId);
            setFormulas(response.data);
        } catch (error) {
            console.error('Error fetching formulas:', error);
        }
    };

    const deleteFormula = async (formulaId) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta fórmula?");
        if (confirm) {
            try {
                console.log(`Deleting formula with ID: ${formulaId}`);
                await FormulaService.deleteFormula(formulaId);
                console.log('Formula deleted successfully');
                setFormulas(formulas.filter(formula => formula.id !== formulaId));
            } catch (error) {
                console.error('Error deleting formula:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div>
            <h2>Fórmulas para el curso {cursoId}</h2>
            <Link to={`/formulas/${cursoId}/add-formula`} className="btn btn-primary mb-2">Agregar Fórmula</Link>
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
                                <Link to={`/formulas/${cursoId}/edit-formula/${formula.id}`} className="btn btn-info">Editar</Link>
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
