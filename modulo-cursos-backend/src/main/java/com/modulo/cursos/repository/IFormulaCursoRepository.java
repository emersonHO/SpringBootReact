package com.modulo.cursos.repository;

import com.modulo.cursos.model.FormulaCurso;
import com.modulo.cursos.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFormulaCursoRepository extends JpaRepository<FormulaCurso, Long> {
    List<FormulaCurso> findByCurso(Curso curso);
}
