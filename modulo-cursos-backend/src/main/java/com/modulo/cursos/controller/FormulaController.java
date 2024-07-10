package com.modulo.cursos.controller;

import com.modulo.cursos.model.Formula;
import com.modulo.cursos.service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class FormulaController {

    @Autowired
    private FormulaService formulaService;

    @GetMapping("/cursos/{cursoId}/formulas")
    public List<Formula> getAllFormulasByCursoId(@PathVariable Long cursoId) {
        return formulaService.getAllFormulasByCursoId(cursoId);
    }

    @PostMapping("/cursos/{cursoId}/formulas")
    public Formula createFormula(@PathVariable Long cursoId, @RequestBody Formula formula) {
        formula.setCursoId(cursoId);
        return formulaService.createFormula(formula);
    }

    @PutMapping("/formulas/{id}")
    public Formula updateFormula(@PathVariable Long id, @RequestBody Formula formulaDetails) {
        return formulaService.updateFormula(id, formulaDetails);
    }

    @DeleteMapping("/formulas/{id}")
    public void deleteFormula(@PathVariable Long id) {
        formulaService.deleteFormula(id);
    }
}