package com.modulo.cursos.controller;

import com.modulo.cursos.model.TipoEvaluacion;
import com.modulo.cursos.service.TipoEvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tipoevaluacion")
@CrossOrigin(origins = "*")
public class TipoEvaluacionController {

    @Autowired
    private TipoEvaluacionService tipoEvaluacionService;

    @GetMapping
    public List<TipoEvaluacion> getAllTiposEvaluacion() {
        return tipoEvaluacionService.getAllTiposEvaluacion();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoEvaluacion> getTipoEvaluacionById(@PathVariable Long id) {
        TipoEvaluacion tipoEvaluacion = tipoEvaluacionService.getTipoEvaluacionById(id);
        return ResponseEntity.ok(tipoEvaluacion);
    }

    @PostMapping
    public TipoEvaluacion createTipoEvaluacion(@RequestBody TipoEvaluacion tipoEvaluacion) {
        return tipoEvaluacionService.createTipoEvaluacion(tipoEvaluacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoEvaluacion> updateTipoEvaluacion(@PathVariable Long id, @RequestBody TipoEvaluacion tipoEvaluacionDetails) {
        TipoEvaluacion updatedTipoEvaluacion = tipoEvaluacionService.updateTipoEvaluacion(id, tipoEvaluacionDetails);
        return ResponseEntity.ok(updatedTipoEvaluacion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoEvaluacion(@PathVariable Long id) {
        tipoEvaluacionService.deleteTipoEvaluacion(id);
        return ResponseEntity.noContent().build();
    }
}
