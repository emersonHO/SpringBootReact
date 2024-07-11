package com.modulo.cursos.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "formula")
public class Formula{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "curso")
    private String codigo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "formula")
    private String formula;

    @Column(name = "funcionid")
    private int funcionid;

    @Column(name = "estado")
    private String estado;

    @Column(name = "usapesos")
    private int usapesos;

    @Column(name = "restarmenor")
    private int restarmenor;

    @Column(name = "restarmayor")
    private int restamayor;

    @Column(name = "nummayor")
    private int nummayor;

    @Column(name = "copiamenor")
    private int copiamenor;

    @Column(name = "copiaprimero")
    private int copiaprimero;

    @Column(name = "copiamayor")
    private int copiamayor;

    @Column(name = "redondeo")
    private int redondeo;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;
}