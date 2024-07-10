package com.modulo.cursos.repository;

import com.modulo.cursos.model.Formula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFormulaRepository extends JpaRepository<Formula, Long> {
    List<Formula> findByCursoId(Long cursoId);
}
