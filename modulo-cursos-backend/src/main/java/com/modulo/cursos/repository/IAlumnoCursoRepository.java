package com.modulo.cursos.repository;

import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAlumnoCursoRepository extends JpaRepository<AlumnoCurso, Long> {
    List<AlumnoCurso> findByCurso(Curso curso);
}
