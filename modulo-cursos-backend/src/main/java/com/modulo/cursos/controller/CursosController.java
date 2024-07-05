package com.modulo.cursos.controller;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class CursosController {

    @Autowired
    private ICursoRepository cursoRepository;

    @GetMapping("/cursos")
    public List<Curso> listarCursos(){
        return cursoRepository.findAll();
    }

    @PostMapping("/cursos")
    public Curso guardarCuso(@RequestBody Curso curso){
        return cursoRepository.save(curso);
    }

    @GetMapping("/cursos/{id}")
    public ResponseEntity<Curso> listarCursoPorId(@PathVariable Long id){
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: "+id));
        return ResponseEntity.ok(curso);
    }

    @PutMapping("/cursos/{id}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable Long id, @RequestBody Curso cursoRequest){
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: "+id));

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
        Curso cursoActualizado = cursoRepository.save(curso);
        return ResponseEntity.ok(cursoActualizado);
    }

    @DeleteMapping("/cursos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCurso (@PathVariable Long id){
        Curso curso = cursoRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: "+id));

        cursoRepository.delete(curso);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
