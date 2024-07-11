package com.modulo.cursos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "alumno")

public class Alumno{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombres")
    private String nombres;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "email")
    private String email;

    @Column(name = "estado")
    private String estado;

    @Column(name = "especialidad_id")
    private long especialidad_id;

    @Column(name = "usuario_id")
    private long usuario_id;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;
}
