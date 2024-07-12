package com.modulo.cursos.controller;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Formula;
import com.modulo.cursos.service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class FormulaController {

    @Autowired
    private FormulaService formulaService;

    @GetMapping("/formulas")
    public List<Formula> listarFormulas() {
        return formulaService.listarFormulas();
    }

    @PostMapping("/add")
    public ResponseEntity<Formula> addFormula(@PathVariable Long cursoId, @RequestBody Formula formula) {
        Formula savedFormula = formulaService.saveFormula(cursoId, formula);
        return ResponseEntity.ok(savedFormula);
    }

    @GetMapping("/formulas/{id}")
    public ResponseEntity<Formula> listarFormulaPorId(@PathVariable Long id) {
        Formula formula = formulaService.listarFormulaPorId(id);
        return ResponseEntity.ok(formula);
    }

    @PutMapping("/{formulaId}")
    public ResponseEntity<Formula> updateFormula(@PathVariable Long cursoId, @PathVariable Long formulaId, @RequestBody Formula formula) {
        Formula updatedFormula = formulaService.updateFormula(cursoId, formulaId, formula);
        return ResponseEntity.ok(updatedFormula);
    }

    @DeleteMapping("/formulas/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarFormula(@PathVariable Long id) {
        try {
            formulaService.eliminarFormula(id);
            Map<String, Boolean> response = new HashMap<>();
            response.put("eliminado", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the error and return a 500 status code
            e.printStackTrace();
            Map<String, Boolean> response = new HashMap<>();
            response.put("eliminado", Boolean.FALSE);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
