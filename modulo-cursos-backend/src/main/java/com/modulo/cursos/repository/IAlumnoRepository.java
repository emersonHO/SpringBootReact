package com.modulo.cursos.repository;

import com.modulo.cursos.model.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAlumnoRepository extends JpaRepository<Alumno, Long> {
    List<Alumno> findByCursoId(Long cursoId);
}