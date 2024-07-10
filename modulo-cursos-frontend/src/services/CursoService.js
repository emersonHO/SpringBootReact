import axios from 'axios';

const CURSOS_BASE_REST_API_URL = "https://springbootreact-7w44.onrender.com/api/v1/cursos";

class CursoService {
  getAllCursos() {
    return axios.get(CURSOS_BASE_REST_API_URL);
  }

  createCurso(curso) {
    return axios.post(CURSOS_BASE_REST_API_URL, curso);
  }

  getCursoById(cursoId) {
    return axios.get(CURSOS_BASE_REST_API_URL + '/' + cursoId);
  }

  updateCurso(cursoId, curso) {
    return axios.put(CURSOS_BASE_REST_API_URL + '/' + cursoId, curso);
  }

  deleteCurso(cursoId) {
    return axios.delete(CURSOS_BASE_REST_API_URL + '/' + cursoId);
  }
}

// Exporta una instancia de CursoService
export default new CursoService();
