package com.modulo.cursos.service;

import com.modulo.cursos.model.TipoEvaluacion;
import com.modulo.cursos.repository.ITipoEvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoEvaluacionService {
    @Autowired
    private ITipoEvaluacionRepository tipoEvaluacionRepository;

    public List<TipoEvaluacion> getAllTiposEvaluacion() {
        return tipoEvaluacionRepository.findAll();
    }

    public TipoEvaluacion getTipoEvaluacionById(Long id) {
        return tipoEvaluacionRepository.findById(id).orElse(null);
    }

    public TipoEvaluacion createTipoEvaluacion(TipoEvaluacion tipoEvaluacion) {
        return tipoEvaluacionRepository.save(tipoEvaluacion);
    }

    public TipoEvaluacion updateTipoEvaluacion(Long id, TipoEvaluacion tipoEvaluacionDetails) {
        TipoEvaluacion tipoEvaluacion = tipoEvaluacionRepository.findById(id).orElse(null);
        if (tipoEvaluacion != null) {
            tipoEvaluacion.setNombre(tipoEvaluacionDetails.getNombre());
            return tipoEvaluacionRepository.save(tipoEvaluacion);
        }
        return null;
    }

    public void deleteTipoEvaluacion(Long id) {
        tipoEvaluacionRepository.deleteById(id);
    }
}
