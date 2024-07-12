package com.modulo.cursos.controller;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.service.AlumnoService;
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
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping("/alumnos")
    public List<Alumno> listarAlumnos() {
        return alumnoService.listarAlumnos();
    }

    @PostMapping("/alumnos")
    public Alumno guardarAlumno(@RequestBody Alumno alumno) {
        return alumnoService.guardarAlumno(alumno);
    }

    @GetMapping("/alumnos/{id}")
    public ResponseEntity<Alumno> listarAlumnoPorId(@PathVariable Long id) {
        Alumno alumno = alumnoService.listarAlumnoPorId(id);
        return ResponseEntity.ok(alumno);
    }

    @PutMapping("/alumnos/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumnoRequest) {
        Alumno alumnoActualizado = alumnoService.actualizarAlumno(id, alumnoRequest);
        return ResponseEntity.ok(alumnoActualizado);
    }

    @DeleteMapping("/alumnos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarAlumno(@PathVariable Long id) {
        try {
            alumnoService.eliminarAlumno(id);
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
