import axios from 'axios';

const FORMULA_API_BASE_URL = "https://springbootreact-7w44.onrender.com/api/v1/formulas";

class FormulaService {
    getFormulasByCursoId(cursoId) {
        return axios.get(`${FORMULA_API_BASE_URL}/curso/${cursoId}`);
    }

    createFormula(cursoId, formula) {
        return axios.post(`${FORMULA_API_BASE_URL}/curso/${cursoId}`, formula);
    }

    getFormulaById(cursoId, formulaId) {
        return axios.get(`${FORMULA_API_BASE_URL}/curso/${cursoId}/${formulaId}`);
    }

    updateFormula(cursoId, formulaId, formula) {
        return axios.put(`${FORMULA_API_BASE_URL}/curso/${cursoId}/${formulaId}`, formula);
    }

    deleteFormula(cursoId, formulaId) {
        return axios.delete(`${FORMULA_API_BASE_URL}/curso/${cursoId}/${formulaId}`);
    }
}

const instance = new FormulaService();
export default instance;
