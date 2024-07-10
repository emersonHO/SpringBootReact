package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.repository.IAlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlumnoService {

    @Autowired
    private IAlumnoRepository alumnoRepository;

    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    public Alumno guardarAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno listarAlumnoPorId(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));
    }

    public Alumno actualizarAlumno(Long id, Alumno alumnoRequest) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));

        alumno.setCodigo(alumnoRequest.getCodigo());
        alumno.setNombres(alumnoRequest.getNombres());
        alumno.setApellidos(alumnoRequest.getApellidos());
        alumno.setEmail(alumnoRequest.getEmail());
        alumno.setEstado(alumnoRequest.getEstado());
        alumno.setEspecialidad_id(alumnoRequest.getEspecialidad_id());
        alumno.setUsuario_id(alumnoRequest.getUsuario_id());

        return alumnoRepository.save(alumno);
    }

    public Map<String, Boolean> eliminarAlumno(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));

        alumnoRepository.delete(alumno);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

