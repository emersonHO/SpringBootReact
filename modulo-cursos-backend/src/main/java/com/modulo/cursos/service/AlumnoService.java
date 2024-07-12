package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IAlumnoCursoRepository;
import com.modulo.cursos.repository.IAlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlumnoService {

    @Autowired
    private IAlumnoCursoRepository alumnoCursoRepository;

    @Autowired
    private IAlumnoRepository alumnoRepository;
    @Autowired
    private CursoService cursoService;

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

    public void eliminarAlumno(Long id) {
        System.out.println("Intentando eliminar alumno con ID: " + id);
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));
        alumnoRepository.delete(alumno);
        System.out.println("Alumno con ID: " + id + " ha sido eliminado.");
    }
}

