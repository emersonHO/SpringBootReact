package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IAlumnoRepository;
import com.modulo.cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class CursoService {

    @Autowired
    private ICursoRepository cursoRepository;

    @Autowired
    private IAlumnoRepository alumnoRepository;

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Curso guardarCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    public Curso listarCursoPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + id));
    }

    public Curso actualizarCurso(Long id, Curso cursoRequest) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + id));

        curso.setCiclo(cursoRequest.getCiclo());
        curso.setCodigo(cursoRequest.getCodigo());
        curso.setEstado(cursoRequest.getEstado());
        curso.setNombre(cursoRequest.getNombre());
        curso.setModalidad(cursoRequest.getModalidad());
        curso.setDepartamento_id(cursoRequest.getDepartamento_id());
        curso.setInstitucion_id(cursoRequest.getInstitucion_id());
        curso.setNum_creditos(cursoRequest.getNum_creditos());
        curso.setTipo(cursoRequest.getTipo());
        curso.setSumilla(cursoRequest.getSumilla());
        curso.setNum_horas_campo(cursoRequest.getNum_horas_campo());
        curso.setNum_horas_laboratorio(cursoRequest.getNum_horas_laboratorio());
        curso.setNum_horas_practica(cursoRequest.getNum_horas_practica());
        curso.setNum_horas_teoria(cursoRequest.getNum_horas_teoria());
        curso.setPeriodo_academico_id(cursoRequest.getPeriodo_academico_id());
        curso.setPlan_estudios_id(cursoRequest.getPlan_estudios_id());
        curso.setDia(cursoRequest.getDia());
        curso.setHora_inicio(cursoRequest.getHora_inicio());
        curso.setHora_fin(cursoRequest.getHora_fin());
        return cursoRepository.save(curso);
    }

    public Map<String, Boolean> eliminarCurso(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + id));

        cursoRepository.delete(curso);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public List<Alumno> listarAlumnosPorCursoId(Long cursoId) {
        return alumnoRepository.findByCursoId(cursoId);
    }
}
