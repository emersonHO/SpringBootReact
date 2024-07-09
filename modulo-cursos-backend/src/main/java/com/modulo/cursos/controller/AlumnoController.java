package com.modulo.cursos.controller;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.repository.IAlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    private IAlumnoRepository alumnoRepository;

    @GetMapping("/alumnos")
    public List<Alumno> listarAlumnos(){
        return alumnoRepository.findAll();
    }

    @PostMapping("/alumnos")
    public Alumno guardarAlumno(@RequestBody Alumno alumno){
        return alumnoRepository.save(alumno);
    }

    @GetMapping("/alumnos/{id}")
    public ResponseEntity<Alumno> listarAlumnoPorId(@PathVariable Long id){
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: "+id));
        return ResponseEntity.ok(alumno);
    }

    @PutMapping("/alumnos/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id,@RequestBody Alumno alumnoRequest){
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese Id no existe: "+id));

        alumno.setCodigo(alumnoRequest.getCodigo());
        alumno.setNombres(alumnoRequest.getNombres());
        alumno.setApellidos(alumnoRequest.getApellidos());
        alumno.setEmail(alumnoRequest.getEmail());
        alumno.setEstado(alumnoRequest.getEstado());
        alumno.setEspecialidad_id(alumnoRequest.getEspecialidad_id());
        alumno.setUsuario_id(alumnoRequest.getUsuario_id());

        Alumno alumnoActualizado = alumnoRepository.save(alumno);
        return ResponseEntity.ok(alumnoActualizado);
    }

    @DeleteMapping("/alumnos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarAlumno (@PathVariable Long id){
        Alumno alumno = alumnoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: "+id));

        alumnoRepository.delete(alumno);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}