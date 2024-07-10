package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IAlumnoCursoRepository;
import com.modulo.cursos.repository.IAlumnoRepository;
import com.modulo.cursos.repository.ICursoRepository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlumnoCursoService {

    @Autowired
    private IAlumnoCursoRepository alumnoCursoRepository;

    @Autowired
    private IAlumnoRepository alumnoRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    public AlumnoCurso asociarAlumnoConCurso(Long cursoId, Long alumnoId, String estado) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + alumnoId));

        AlumnoCurso alumnoCurso = new AlumnoCurso();
        alumnoCurso.setCurso(curso);
        alumnoCurso.setAlumno(alumno);
        alumnoCurso.setEstado(estado);

        return alumnoCursoRepository.save(alumnoCurso);
    }
    
    public List<Alumno> getAlumnosByCursoId(Long cursoId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        List<AlumnoCurso> alumnoCursos = alumnoCursoRepository.findByCurso(curso);
        List<Alumno> alumnos = new ArrayList<>();
        for (AlumnoCurso alumnoCurso : alumnoCursos) {
            alumnos.add(alumnoCurso.getAlumno());
        }
        return alumnos;
    }
}

