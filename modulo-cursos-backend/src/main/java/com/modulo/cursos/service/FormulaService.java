package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.model.Formula;
import com.modulo.cursos.repository.ICursoRepository;
import com.modulo.cursos.repository.IFormulaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormulaService {
    @Autowired
    private IFormulaRepository formulaRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    public List<Formula> getAllFormulasByCursoId(Long cursoId) {
        return formulaRepository.findByCursoId(cursoId);
    }

    public Formula createFormula(Long cursoId, Formula formula) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso not found"));
        formula.setCurso(curso);
        return formulaRepository.save(formula);
    }

    public Optional<Formula> getFormulaById(Long cursoId, Long formulaId) {
        if (!cursoRepository.existsById(cursoId)) {
            throw new ResourceNotFoundException("Curso not found");
        }
        return formulaRepository.findByIdAndCursoId(formulaId, cursoId);
    }

    public Optional<Formula> updateFormula(Long cursoId, Long formulaId, Formula formulaDetails) {
        if (!cursoRepository.existsById(cursoId)) {
            throw new ResourceNotFoundException("Curso not found");
        }

        return formulaRepository.findById(formulaId).map(formula -> {
            formula.setCodigo(formulaDetails.getCodigo());
            formula.setDescripcion(formulaDetails.getDescripcion());
            formula.setFormula(formulaDetails.getFormula());
            formula.setFuncionid(formulaDetails.getFuncionid());
            formula.setEstado(formulaDetails.getEstado());
            formula.setUsapesos(formulaDetails.getUsapesos());
            formula.setRestarmenor(formulaDetails.getRestarmenor());
            formula.setRestamayor(formulaDetails.getRestamayor());
            formula.setNummayor(formulaDetails.getNummayor());
            formula.setCopiamenor(formulaDetails.getCopiamenor());
            formula.setCopiaprimero(formulaDetails.getCopiaprimero());
            formula.setCopiamayor(formulaDetails.getCopiamayor());
            formula.setRedondeo(formulaDetails.getRedondeo());
            return formulaRepository.save(formula);
        });
    }

    public Optional<Void> deleteFormula(Long cursoId, Long formulaId) {
        if (!cursoRepository.existsById(cursoId)) {
            throw new ResourceNotFoundException("Curso not found");
        }

        return formulaRepository.findByIdAndCursoId(formulaId, cursoId).map(formula -> {
            formulaRepository.delete(formula);
            return null;
        });
    }
}
