package com.modulo.cursos.controller;

import com.modulo.cursos.model.Formula;
import com.modulo.cursos.service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cursos/{cursoId}/formulas")
@CrossOrigin(origins = "*")
public class FormulaController {

    @Autowired
    private FormulaService formulaService;

    @GetMapping
    public List<Formula> getAllFormulasByCursoId(@PathVariable Long cursoId) {
        return formulaService.getAllFormulasByCursoId(cursoId);
    }

    @PostMapping
    public Formula createFormula(@PathVariable Long cursoId, @RequestBody Formula formula) {
        return formulaService.createFormula(cursoId, formula);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formula> getFormulaById(@PathVariable Long cursoId, @PathVariable Long id) {
        return formulaService.getFormulaById(cursoId, id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formula> updateFormula(@PathVariable Long cursoId, @PathVariable Long id, @RequestBody Formula formula) {
        return formulaService.updateFormula(cursoId, id, formula)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormula(@PathVariable Long cursoId, @PathVariable Long id) {
        return formulaService.deleteFormula(cursoId, id)
                .map(f -> ResponseEntity.noContent().<Void>build())
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
