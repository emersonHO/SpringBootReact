package com.modulo.cursos.controller;

import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class CursosController {

    @Autowired
    private CursoService cursoService;

    @GetMapping("/cursos")
    public List<Curso> listarCursos() {
        return cursoService.listarCursos();
    }

    @PostMapping("/cursos")
    public Curso guardarCurso(@RequestBody Curso curso) {
        return cursoService.guardarCurso(curso);
    }

    @GetMapping("/cursos/{id}")
    public ResponseEntity<Curso> listarCursoPorId(@PathVariable Long id) {
        Curso curso = cursoService.listarCursoPorId(id);
        return ResponseEntity.ok(curso);
    }

    @PutMapping("/cursos/{id}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable Long id, @RequestBody Curso cursoRequest) {
        Curso cursoActualizado = cursoService.actualizarCurso(id, cursoRequest);
        return ResponseEntity.ok(cursoActualizado);
    }

    @DeleteMapping("/cursos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCurso(@PathVariable Long id) {
        Map<String, Boolean> response = cursoService.eliminarCurso(id);
        return ResponseEntity.ok(response);
    }
}
