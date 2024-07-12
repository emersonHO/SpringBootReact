package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Formula;
import com.modulo.cursos.repository.IFormulaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormulaService {

    @Autowired
    private IFormulaRepository formulaRepository;

    public List<Formula> listarFormulas() {
        return formulaRepository.findAll();
    }

    public Formula saveFormula(Long cursoId, Formula formula) {
        return formulaRepository.save(formula);
    }


    public Formula listarFormulaPorId(Long id) {
        return formulaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La fórmula con ese ID no existe: " + id));
    }

    public Formula updateFormula(Long cursoId, Long formulaId, Formula formula) {
        Formula existingFormula = formulaRepository.findById(formulaId)
                .orElseThrow(() -> new ResourceNotFoundException("Fórmula no encontrada con id: " + formulaId));

        existingFormula.setCodigo(formula.getCodigo());
        existingFormula.setDescripcion(formula.getDescripcion());
        existingFormula.setFormula(formula.getFormula());
        existingFormula.setFuncionId(formula.getFuncionId());
        existingFormula.setEstado(formula.getEstado());

        return formulaRepository.save(existingFormula);
    }

    public void eliminarFormula(Long id) {
        Formula formula = formulaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La fórmula con ese ID no existe: " + id));
        formulaRepository.delete(formula);
    }
}
