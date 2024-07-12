package com.modulo.cursos.repository;

import com.modulo.cursos.model.TipoEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoEvaluacionRepository extends JpaRepository<TipoEvaluacion, Long> {
}
