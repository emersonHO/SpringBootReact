import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormulaService from '../services/FormulaService';

const AddFormulaComponent = () => {
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [formula, setFormula] = useState('');
    const [funcionid, setFuncionid] = useState('');
    const [estado, setEstado] = useState('');
    const [usapesos, setUsapesos] = useState('');
    const [restarmenor, setRestarmenor] = useState('');
    const [restamayor, setRestamayor] = useState('');
    const [nummayor, setNummayor] = useState('');
    const [copiamenor, setCopiamenor] = useState('');
    const [copiaprimero, setCopiaprimero] = useState('');
    const [copiamayor, setCopiamayor] = useState('');
    const [redondeo, setRedondeo] = useState('');

    const navigate = useNavigate();
    const { cursoId, formulaId } = useParams();

    useEffect(() => {
        if (formulaId) {
            FormulaService.getFormulasByCursoId(cursoId).then(response => {
                const formula = response.data.find(f => f.id === parseInt(formulaId));
                setCodigo(formula.codigo);
                setDescripcion(formula.descripcion);
                setFormula(formula.formula);
                setFuncionid(formula.funcionid);
                setEstado(formula.estado);
                setUsapesos(formula.usapesos);
                setRestarmenor(formula.restarmenor);
                setRestamayor(formula.restamayor);
                setNummayor(formula.nummayor);
                setCopiamenor(formula.copiamenor);
                setCopiaprimero(formula.copiaprimero);
                setCopiamayor(formula.copiamayor);
                setRedondeo(formula.redondeo);
            }).catch(error => {
                console.error('Error fetching formula:', error);
            });
        }
    }, [cursoId, formulaId]);

    const saveOrUpdateFormula = (e) => {
        e.preventDefault();
        const formula = {
            codigo, descripcion, formula, funcionid, estado, usapesos, restarmenor,
            restamayor, nummayor, copiamenor, copiaprimero, copiamayor, redondeo
        };

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
            <h2>{formulaId ? 'Editar Fórmula' : 'Agregar Fórmula'}</h2>
            <form onSubmit={saveOrUpdateFormula}>
                <div className="form-group">
                    <label>Código</label>
                    <input type="text" className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Fórmula</label>
                    <input type="text" className="form-control" value={formula} onChange={(e) => setFormula(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Función ID</label>
                    <input type="number" className="form-control" value={funcionid} onChange={(e) => setFuncionid(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Estado</label>
                    <input type="text" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Usa Pesos</label>
                    <input type="number" className="form-control" value={usapesos} onChange={(e) => setUsapesos(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Restar Menor</label>
                    <input type="number" className="form-control" value={restarmenor} onChange={(e) => setRestarmenor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Restar Mayor</label>
                    <input type="number" className="form-control" value={restamayor} onChange={(e) => setRestamayor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Num Mayor</label>
                    <input type="number" className="form-control" value={nummayor} onChange={(e) => setNummayor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Copia Menor</label>
                    <input type="number" className="form-control" value={copiamenor} onChange={(e) => setCopiamenor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Copiq Primero</label>
                    <input type="number" className="form-control" value={copiaprimero} onChange={(e) => setCopiaprimero(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Copiq Mayor</label>
                    <input type="number" className="form-control" value={copiamayor} onChange={(e) => setCopiamayor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Redondeo</label>
                    <input type="number" className="form-control" value={redondeo} onChange={(e) => setRedondeo(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default AddFormulaComponent;
