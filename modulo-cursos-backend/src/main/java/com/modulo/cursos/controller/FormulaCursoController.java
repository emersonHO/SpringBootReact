package com.modulo.cursos.controller;

import com.modulo.cursos.model.Formula;
import com.modulo.cursos.model.FormulaCurso;
import com.modulo.cursos.service.FormulaCursoService;
import com.modulo.cursos.service.FormulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class FormulaCursoController {

    @Autowired
    private FormulaCursoService formulaCursoService;
    @Autowired
    private FormulaService formulaService;

    @PostMapping("/cursos/{cursoId}/formulas")
    public ResponseEntity<FormulaCurso> asociarFormulaConCurso(
            @PathVariable Long cursoId,
            @RequestParam Long formulaId,
            @RequestParam String estado) {
        FormulaCurso nuevoFormulaCurso = formulaCursoService.asociarFormulaConCurso(cursoId, formulaId, estado);
        return ResponseEntity.ok(nuevoFormulaCurso);
    }

    @GetMapping("/cursos/{cursoId}/formulas")
    public ResponseEntity<List<Formula>> getFormulasByCursoId(@PathVariable Long cursoId) {
        List<Formula> formulas = formulaCursoService.getFormulasByCursoId(cursoId);
        return ResponseEntity.ok(formulas);
    }
}
