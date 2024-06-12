import axios from 'axios';

const ALUMNO_API_BASE_URL = "http://localhost:8080/api/v1/alumnos";
const CURSO_ALUMNOS_API_BASE_URL = "http://localhost:8080/api/v1/cursos";

class AlumnoService {
    getAlumnos() {
        return axios.get(ALUMNO_API_BASE_URL);
    }

    createAlumno(alumno) {
        return axios.post(ALUMNO_API_BASE_URL, alumno);
    }

    getAlumnoById(alumnoId) {
        return axios.get(`${ALUMNO_API_BASE_URL}/${alumnoId}`);
    }

    updateAlumno(alumnoId, alumno) {
        return axios.put(`${ALUMNO_API_BASE_URL}/${alumnoId}`, alumno);
    }

    deleteAlumno(alumnoId) {
        return axios.delete(`${ALUMNO_API_BASE_URL}/${alumnoId}`);
    }

    getAllAlumnosByCursoId(cursoId) {
        return axios.get(`${CURSO_ALUMNOS_API_BASE_URL}/${cursoId}/alumnos`);
    }

    asociarAlumnoConCurso(cursoId, alumnoId, estado) {
        return axios.post(`${CURSO_ALUMNOS_API_BASE_URL}/${cursoId}/alumnos`, null, {
            params: {
                alumnoId: alumnoId,
                estado: estado
            }
        });
    }
}

const instance = new AlumnoService();
export default instance;
