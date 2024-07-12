import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormulaService from "../services/FormulaService";

const AddFormulaComponent = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [formulaValue, setFormulaValue] = useState('');
    const [funcionId, setFuncionId] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate();
    const { cursoId, formulaId } = useParams();

    useEffect(() => {
        if (formulaId) {
            FormulaService.getFormulaById(formulaId).then((response) => {
                const formula = response.data;
                setCodigo(formula.codigo);
                setDescripcion(formula.descripcion);
                setFormulaValue(formula.formula);
                setFuncionId(formula.funcionId);
                setEstado(formula.estado);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [formulaId]);

    const saveOrUpdateFormula = async (e) => {
        e.preventDefault();
        const formula = { codigo, descripcion, formula: formulaValue, funcionId, estado };

        try {
            if (formulaId) {
                await FormulaService.updateFormula(formulaId, formula);
            } else {
                await FormulaService.createFormula(cursoId, formula);
            }
            navigate(`/cursos/${cursoId}/formulas`);
        } catch (error) {
            console.log(error);
        }
    }

    const title = () => {
        return formulaId ? <h2 className="text-center">Actualizar Fórmula</h2> : <h2 className="text-center">Registrar Fórmula</h2>;
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form onSubmit={saveOrUpdateFormula}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Código</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el código de la fórmula"
                                        name="codigo"
                                        className="form-control"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        placeholder="Digite la descripción de la fórmula"
                                        name="descripcion"
                                        className="form-control"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Fórmula</label>
                                    <input
                                        type="text"
                                        placeholder="Digite la fórmula"
                                        name="formulaValue"
                                        className="form-control"
                                        value={formulaValue}
                                        onChange={(e) => setFormulaValue(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Función ID</label>
                                    <input
                                        type="number"
                                        placeholder="Digite el ID de la función"
                                        name="funcionId"
                                        className="form-control"
                                        value={funcionId}
                                        onChange={(e) => setFuncionId(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                                <Link to={`/cursos/${cursoId}/formulas`} className="btn btn-danger ms-2">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFormulaComponent;
