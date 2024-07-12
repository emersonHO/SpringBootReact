import axios from 'axios';

const FORMULAS_BASE_URL = "https://springbootreact-7w44.onrender.com/api/v1/formulas";

class FormulasService {
  getAllFormulasByCursoId(cursoId) {
    return axios.get(`${FORMULAS_BASE_URL}/${cursoId}`);
  }

  createFormula(cursoId, formula) {
    return axios.post(`${FORMULAS_BASE_URL}/${cursoId}/add-formula`, formula);
  }

  getFormulaById(cursoId, formulaId) {
    return axios.get(`${FORMULAS_BASE_URL}/${cursoId}/edit-formula/${formulaId}`);
  }

  updateFormula(cursoId, formulaId, formula) {
    return axios.put(`${FORMULAS_BASE_URL}/${cursoId}/edit-formula/${formulaId}`, formula);
  }

  deleteFormula(cursoId, formulaId) {
    return axios.delete(`${FORMULAS_BASE_URL}/${cursoId}/edit-formula/${formulaId}`);
  }
}

export default new FormulasService();
