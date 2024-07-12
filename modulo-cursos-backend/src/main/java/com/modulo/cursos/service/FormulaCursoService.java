package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Formula;
import com.modulo.cursos.model.FormulaCurso;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IFormulaCursoRepository;
import com.modulo.cursos.repository.IFormulaRepository;
import com.modulo.cursos.repository.ICursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FormulaCursoService {

    @Autowired
    private IFormulaCursoRepository formulaCursoRepository;

    @Autowired
    private IFormulaRepository formulaRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    public FormulaCurso asociarFormulaConCurso(Long cursoId, Long formulaId, String estado) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        Formula formula = formulaRepository.findById(formulaId)
                .orElseThrow(() -> new ResourceNotFoundException("La fórmula con ese ID no existe: " + formulaId));

        FormulaCurso formulaCurso = new FormulaCurso();
        formulaCurso.setCurso(curso);
        formulaCurso.setFormula(formula);
        formulaCurso.setEstado(estado);

        return formulaCursoRepository.save(formulaCurso);
    }

    public List<Formula> getFormulasByCursoId(Long cursoId) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("El curso con ese ID no existe: " + cursoId));

        List<FormulaCurso> formulaCursos = formulaCursoRepository.findByCurso(curso);
        List<Formula> formulas = new ArrayList<>();
        for (FormulaCurso formulaCurso : formulaCursos) {
            formulas.add(formulaCurso.getFormula());
        }
        return formulas;
    }
}
