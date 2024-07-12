package com.modulo.cursos.controller;

import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        Map<String, Boolean> response = alumnoService.eliminarAlumno(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/alumnos/exportar")
    public ResponseEntity<String> exportarAlumnosCSV() {
        try {
            String csvData = alumnoService.exportAlumnosToCSV();
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=alumnos.csv")
                    .body(csvData);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body("Error al exportar archivo CSV: " + e.getMessage());
        }
    }

    @PostMapping("/alumnos/importar")
    public ResponseEntity<String> importarAlumnosCSV(@RequestParam("file") MultipartFile file) {
        try {
            alumnoService.importAlumnosFromCSV(file);
            return ResponseEntity.ok("Archivo CSV importado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar archivo CSV: " + e.getMessage());
        }
    }
}
