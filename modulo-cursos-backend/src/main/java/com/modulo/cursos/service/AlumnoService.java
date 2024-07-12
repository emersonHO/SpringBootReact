package com.modulo.cursos.service;

import com.modulo.cursos.exception.ResourceNotFoundException;
import com.modulo.cursos.model.Alumno;
import com.modulo.cursos.model.AlumnoCurso;
import com.modulo.cursos.model.Curso;
import com.modulo.cursos.repository.IAlumnoCursoRepository;
import com.modulo.cursos.repository.IAlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class AlumnoService {

    @Autowired
    private IAlumnoRepository alumnoRepository;

    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    public Alumno guardarAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno listarAlumnoPorId(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));
    }

    public Alumno actualizarAlumno(Long id, Alumno alumnoRequest) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));

        alumno.setCodigo(alumnoRequest.getCodigo());
        alumno.setNombres(alumnoRequest.getNombres());
        alumno.setApellidos(alumnoRequest.getApellidos());
        alumno.setEmail(alumnoRequest.getEmail());
        alumno.setEstado(alumnoRequest.getEstado());
        alumno.setEspecialidad_id(alumnoRequest.getEspecialidad_id());
        alumno.setUsuario_id(alumnoRequest.getUsuario_id());

        return alumnoRepository.save(alumno);
    }

    public Map<String, Boolean> eliminarAlumno(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El alumno con ese ID no existe: " + id));

        alumnoRepository.delete(alumno);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public String exportAlumnosToCSV() {
        List<Alumno> alumnos = alumnoRepository.findAll();
        StringWriter writer = new StringWriter();
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            String[] header = {"ID", "Codigo", "Nombres", "Apellidos", "Email", "Estado", "Especialidad_id", "Usuario_id", "Curso_id"};
            csvWriter.writeNext(header);

            for (Alumno alumno : alumnos) {
                csvWriter.writeNext(new String[]{
                        String.valueOf(alumno.getId()),
                        alumno.getCodigo(),
                        alumno.getNombres(),
                        alumno.getApellidos(),
                        alumno.getEmail(),
                        alumno.getEstado(),
                        String.valueOf(alumno.getEspecialidad_id()),
                        String.valueOf(alumno.getUsuario_id()),
                        alumno.getCurso() != null ? String.valueOf(alumno.getCurso().getId()) : ""
                });
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al exportar alumnos a CSV: " + e.getMessage());
        }
        return writer.toString();
    }

    public void importAlumnosFromCSV(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            List<String[]> records = csvReader.readAll();
            for (int i = 1; i < records.size(); i++) {
                String[] record = records.get(i);
                Alumno alumno = new Alumno();
                alumno.setCodigo(record[1]);
                alumno.setNombres(record[2]);
                alumno.setApellidos(record[3]);
                alumno.setEmail(record[4]);
                alumno.setEstado(record[5]);
                alumno.setEspecialidad_id(Long.parseLong(record[6]));
                alumno.setUsuario_id(Long.parseLong(record[7]));
                alumnoRepository.save(alumno);
            }
        } catch (IOException | NumberFormatException e) {
            throw new RuntimeException("Error al importar alumnos desde CSV: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error inesperado al importar alumnos desde CSV: " + e.getMessage());
        }
    }
}

