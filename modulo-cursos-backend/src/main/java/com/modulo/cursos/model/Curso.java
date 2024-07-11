package com.modulo.cursos.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "curso")
public class Curso{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "cod_asignatura")
    private String cod_asignatura;

    @Column(name = "nombre_asignatura")
    private String nombre_asignatura;

    @Column(name = "tipo_asignatura")
    private String tipo_asignatura;

    @Column(name = "area_estudios")
    private String area_estudios;

    @Column(name = "numero_semanas")
    private int numero_semanas;

    @Column(name = "horas_semanales")
    private int horas_semanales;

    @Column(name = "semestre_academico")
    private String semestre_academico;

    @Column(name = "ciclo")
    private int ciclo;

    @Column(name = "creditos")
    private int creditos;

    @Column(name = "modalidad")
    private String modalidad;

    @Column(name = "prerequisitos")
    private String prerequisitos;

    @Column(name = "sumilla")
    private String sumilla;

    @Column(name = "evaluacion_aprendizaje")
    private String evaluacion_aprendizaje;

    @Column(name = "dia")
    private int dia;

    @Column(name = "hora_inicio")
    private LocalTime hora_inicio;

    @Column(name = "hora_fin")
    private LocalTime hora_fin;

    @Column(name= "codigo_plan")
    private String codigo_plan;
}
