import axios from "axios"
import { renderToReadableStream } from "react-dom/server";

const CURSOS_BASE_REST_API_URL ="http://localhost:8080/api/v1/cursos"

class CursoService{

    getAllCursos(){
        return axios.get(CURSOS_BASE_REST_API_URL);
    }

    createCurso(curso){
        return axios.post(CURSOS_BASE_REST_API_URL, curso);
    }

    getCursoById(cursoId){
        return axios.get(CURSOS_BASE_REST_API_URL + '/' + cursoId);
    }

    updateCurso(cursoId, curso){
        return axios.put(CURSOS_BASE_REST_API_URL + '/' + cursoId, curso);
    }

    deleteCurso(cursoId){
        return axios.delete(CURSOS_BASE_REST_API_URL + '/' + cursoId);
    }
}

export default new CursoService();