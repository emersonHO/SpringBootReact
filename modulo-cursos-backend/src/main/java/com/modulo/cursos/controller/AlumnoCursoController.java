package com.modulo.cursos.controller;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IAlumnoCursoRepository;
import com.modulo.cursos.repository.IAlumnoRepository;
import com.modulo.cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class AlumnoCursoController {

    @Autowired
    private IAlumnoCursoRepository alumnoCursoRepository;

    @Autowired
    private IAlumnoRepository alumnoRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    @PostMapping("/cursos/{cursoId}/alumnos")
    public ResponseEntity<AlumnoCurso> asociarAlumnoConCurso(
            @PathVariable Long cursoId,
            @RequestParam Long alumnoId,
            @RequestParam String estado) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + alumnoId));

        AlumnoCurso alumnoCurso = new AlumnoCurso();
        alumnoCurso.setCurso(curso);
        alumnoCurso.setAlumno(alumno);
        alumnoCurso.setEstado(estado);

        AlumnoCurso nuevoAlumnoCurso = alumnoCursoRepository.save(alumnoCurso);
        return ResponseEntity.ok(nuevoAlumnoCurso);
    }

    @GetMapping("/cursos/{cursoId}/alumnos")
    public ResponseEntity<List<AlumnoCurso>> listarAlumnosPorCurso(@PathVariable Long cursoId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        List<AlumnoCurso> alumnosDelCurso = alumnoCursoRepository.findByCurso(curso);
        return ResponseEntity.ok(alumnosDelCurso);
    }
}
