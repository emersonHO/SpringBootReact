import axios from 'axios';

const FORMULA_API_BASE_URL = "https://springbootreact-7w44.onrender.com/api/v1/cursos";

class FormulaService {
    getFormulasByCursoId(cursoId) {
        return axios.get(`${FORMULA_API_BASE_URL}/${cursoId}/formulas`);
    }

    createFormula(cursoId, formula) {
        return axios.post(`${FORMULA_API_BASE_URL}/${cursoId}/formulas`, formula);
    }

    updateFormula(formulaId, formula) {
        return axios.put(`https://springbootreact-7w44.onrender.com/api/v1/formulas/${formulaId}`, formula);
    }

    deleteFormula(formulaId) {
        return axios.delete(`https://springbootreact-7w44.onrender.com/api/v1/formulas/${formulaId}`);
    }
}

export default new FormulaService();
