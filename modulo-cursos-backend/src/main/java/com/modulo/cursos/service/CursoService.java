package com.modulo.cursos.service;

import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private ICursoRepository cursoRepository;

    // Método para registrar un nuevo curso
    public Curso registrarCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    // Método para actualizar un curso existente
    public Curso actualizarCurso(Long id, Curso cursoDetalles) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con el id: " + id));

        curso.setCod_asignatura(cursoDetalles.getCod_asignatura());
        curso.setNombre_asignatura(cursoDetalles.getNombre_asignatura());
        curso.setTipo_asignatura(cursoDetalles.getTipo_asignatura());
        curso.setArea_estudios(cursoDetalles.getArea_estudios());
        curso.setNumero_semanas(cursoDetalles.getNumero_semanas());
        curso.setHoras_semanales(cursoDetalles.getHoras_semanales());
        curso.setSemestre_academico(cursoDetalles.getSemestre_academico());
        curso.setCiclo(cursoDetalles.getCiclo());
        curso.setCreditos(cursoDetalles.getCreditos());
        curso.setModalidad(cursoDetalles.getModalidad());
        curso.setPrerequisitos(cursoDetalles.getPrerequisitos());
        curso.setSumilla(cursoDetalles.getSumilla());
        curso.setEvaluacion_aprendizaje(cursoDetalles.getEvaluacion_aprendizaje());
        curso.setDia(cursoDetalles.getDia());
        curso.setHora_inicio(cursoDetalles.getHora_inicio());
        curso.setHora_fin(cursoDetalles.getHora_fin());
        curso.setCodigo_plan(cursoDetalles.getCodigo_plan());

        return cursoRepository.save(curso);
    }

    // Método para obtener un curso por su id
    public Curso obtenerCursoPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con el id: " + id));
    }

    // Método para obtener todos los cursos
    public List<Curso> obtenerTodosLosCursos() {
        return cursoRepository.findAll();
    }

    // Método para eliminar un curso
    public void eliminarCurso(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con el id: " + id));
        cursoRepository.delete(curso);
    }
}