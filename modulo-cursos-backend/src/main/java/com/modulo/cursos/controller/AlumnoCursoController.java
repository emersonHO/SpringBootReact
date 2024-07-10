package com.modulo.cursos.controller;

import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.service.AlumnoCursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class AlumnoCursoController {

    @Autowired
    private AlumnoCursoService alumnoCursoService;

    @PostMapping("/cursos/{cursoId}/alumnos")
    public ResponseEntity<AlumnoCurso> asociarAlumnoConCurso(
            @PathVariable Long cursoId,
            @RequestParam Long alumnoId,
            @RequestParam String estado) {
        AlumnoCurso nuevoAlumnoCurso = alumnoCursoService.asociarAlumnoConCurso(cursoId, alumnoId, estado);
        return ResponseEntity.ok(nuevoAlumnoCurso);
    }
    @GetMapping("/cursos/{cursoId}/alumnos")
    public ResponseEntity<List<Alumno>> getAlumnosByCursoId(@PathVariable Long cursoId) {
        List<Alumno> alumnos = alumnoCursoService.getAlumnosByCursoId(cursoId);
        return ResponseEntity.ok(alumnos);
    }
}
