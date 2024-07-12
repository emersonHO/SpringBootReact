package com.modulo.cursos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "formula_curso")
public class FormulaCurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "formula_id", referencedColumnName = "id")
    private Formula formula;

    @ManyToOne
    @JoinColumn(name = "curso_id", referencedColumnName = "id")
    private Curso curso;

    @Column(name = "estado")
    private String estado;
}
