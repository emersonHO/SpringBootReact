package com.modulo.cursos.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "curso")
public class Curso{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "ciclo")
    private String ciclo;

    @Column(name = "estado")
    private String estado;

    @Column(name = "sumilla")
    private String sumilla;

    @Column(name = "modalidad")
    private String modalidad;

    @Column(name = "num_horas_teoria")
    private int num_horas_teoria;

    @Column(name = "num_horas_practica")
    private int num_horas_practica;

    @Column(name = "num_horas_laboratorio")
    private int num_horas_laboratorio;

    @Column(name = "num_horas_campo")
    private int num_horas_campo;

    @Column(name = "num_creditos")
    private int num_creditos;

    @Column(name = "periodo_academico_id")
    private long periodo_academico_id;

    @Column(name = "plan_estudios_id")
    private long plan_estudios_id;

    @Column(name = "institucion_id")
    private long institucion_id;

    @Column(name = "departamento_id")
    private long departamento_id;

}
