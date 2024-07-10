package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Formula;
import com.modulo.cursos.repository.ICursoRepository;
import com.modulo.cursos.repository.IFormulaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormulaService {

    @Autowired
    private IFormulaRepository formulaRepository;

    public List<Formula> getAllFormulasByCursoId(Long cursoId) {
        return formulaRepository.findByCursoId(cursoId);
    }

    public Formula createFormula(Formula formula) {
        return formulaRepository.save(formula);
    }

    public Formula updateFormula(Long id, Formula formulaDetails) {
        Formula formula = formulaRepository.findById(id).orElseThrow(() -> new RuntimeException("Formula not found"));
        formula.setNombre(formulaDetails.getNombre());
        formula.setDescripcion(formulaDetails.getDescripcion());
        return formulaRepository.save(formula);
    }

    public void deleteFormula(Long id) {
        formulaRepository.deleteById(id);
    }
}