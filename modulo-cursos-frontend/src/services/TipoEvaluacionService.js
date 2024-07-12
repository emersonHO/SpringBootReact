// src/services/TipoEvaluacionService.js
import axios from 'axios';

const TIPO_EVALUACION_API_BASE_URL = "https://springbootreact-7w44.onrender.com/api/v1/tipoevaluacion";

class TipoEvaluacionService {
    getAllTiposEvaluacion() {
        return axios.get(TIPO_EVALUACION_API_BASE_URL);
    }

    createTipoEvaluacion(tipoEvaluacion) {
        return axios.post(TIPO_EVALUACION_API_BASE_URL, tipoEvaluacion);
    }

    getTipoEvaluacionById(tipoEvaluacionId) {
        return axios.get(`${TIPO_EVALUACION_API_BASE_URL}/${tipoEvaluacionId}`);
    }

    updateTipoEvaluacion(tipoEvaluacionId, tipoEvaluacion) {
        return axios.put(`${TIPO_EVALUACION_API_BASE_URL}/${tipoEvaluacionId}`, tipoEvaluacion);
    }

    deleteTipoEvaluacion(tipoEvaluacionId) {
        return axios.delete(`${TIPO_EVALUACION_API_BASE_URL}/${tipoEvaluacionId}`);
    }
}

export default new TipoEvaluacionService();
