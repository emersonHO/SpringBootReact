import React, { useEffect, useState } from "react";
import CursoService from "../services/CursoService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddCursoComponent = () => {
    const [cod_asignatura, setCod_asignatura] = useState('');
    const [nombre_asignatura, setNombre_asignatura] = useState('');
    const [tipo_asignatura, setTipo_asignatura] = useState('');
    const [area_estudios, setArea_estudios] = useState('');
    const [numero_semanas, setNumero_semanas] = useState('');
    const [horas_semanales, setHoras_semanales] = useState('');
    const [semestre_academico, setSemestre_academico] = useState('');
    const [ciclo, setCiclo] = useState('');
    const [creditos, setCreditos] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [prerequisitos, setPrerequisitos] = useState('');
    const [sumilla, setSumilla] = useState('');
    const [evaluacion_aprendizaje, setEvaluacion_aprendizaje] = useState('');
    const [dia, setDia] = useState('');
    const [hora_inicio, setHora_inicio] = useState('');
    const [hora_fin, setHora_fin] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateCurso = (e) => {
        e.preventDefault();
        const curso = {
            cod_asignatura, nombre_asignatura, tipo_asignatura, area_estudios, 
            numero_semanas, horas_semanales, semestre_academico, ciclo, creditos, 
            modalidad, prerequisitos, sumilla, evaluacion_aprendizaje, dia, 
            hora_inicio, hora_fin
        };

        if (id) {
            CursoService.updateCurso(id, curso).then((response) => {
                console.log(response.data);
                navigate('/cursos');
            }).catch(error => {
                console.log(error);
            });
        } else {
            CursoService.createCurso(curso).then((response) => {
                console.log(response.data);
                navigate('/cursos');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        if (id) {
            CursoService.getCursoById(id).then((response) => {
                setCod_asignatura(response.data.cod_asignatura);
                setNombre_asignatura(response.data.nombre_asignatura);
                setTipo_asignatura(response.data.tipo_asignatura);
                setArea_estudios(response.data.area_estudios);
                setNumero_semanas(response.data.numero_semanas);
                setHoras_semanales(response.data.horas_semanales);
                setSemestre_academico(response.data.semestre_academico);
                setCiclo(response.data.ciclo);
                setCreditos(response.data.creditos);
                setModalidad(response.data.modalidad);
                setPrerequisitos(response.data.prerequisitos);
                setSumilla(response.data.sumilla);
                setEvaluacion_aprendizaje(response.data.evaluacion_aprendizaje);
                setDia(response.data.dia);
                setHora_inicio(response.data.hora_inicio);
                setHora_fin(response.data.hora_fin);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Actualizar curso</h2>;
        } else {
            return <h2 className="text-center">Agregar curso</h2>;
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{title()}</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Código de Asignatura</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el código de la asignatura"
                                        name="cod_asignatura"
                                        className="form-control"
                                        value={cod_asignatura}
                                        onChange={(e) => setCod_asignatura(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Nombre de Asignatura</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el nombre de la asignatura"
                                        name="nombre_asignatura"
                                        className="form-control"
                                        value={nombre_asignatura}
                                        onChange={(e) => setNombre_asignatura(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Tipo de Asignatura</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el tipo de asignatura"
                                        name="tipo_asignatura"
                                        className="form-control"
                                        value={tipo_asignatura}
                                        onChange={(e) => setTipo_asignatura(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Área de Estudios</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el área de estudios"
                                        name="area_estudios"
                                        className="form-control"
                                        value={area_estudios}
                                        onChange={(e) => setArea_estudios(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Número de Semanas</label>
                                    <input
                                        type="number"
                                        placeholder="Digite el número de semanas"
                                        name="numero_semanas"
                                        className="form-control"
                                        value={numero_semanas}
                                        onChange={(e) => setNumero_semanas(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Horas Semanales</label>
                                    <input
                                        type="number"
                                        placeholder="Digite las horas semanales"
                                        name="horas_semanales"
                                        className="form-control"
                                        value={horas_semanales}
                                        onChange={(e) => setHoras_semanales(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Semestre Académico</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el semestre académico"
                                        name="semestre_academico"
                                        className="form-control"
                                        value={semestre_academico}
                                        onChange={(e) => setSemestre_academico(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Ciclo</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el ciclo"
                                        name="ciclo"
                                        className="form-control"
                                        value={ciclo}
                                        onChange={(e) => setCiclo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Créditos</label>
                                    <input
                                        type="number"
                                        placeholder="Digite los créditos"
                                        name="creditos"
                                        className="form-control"
                                        value={creditos}
                                        onChange={(e) => setCreditos(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Modalidad</label>
                                    <input
                                        type="text"
                                        placeholder="Digite la modalidad"
                                        name="modalidad"
                                        className="form-control"
                                        value={modalidad}
                                        onChange={(e) => setModalidad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Prerrequisitos</label>
                                    <input
                                        type="text"
                                        placeholder="Digite los prerrequisitos"
                                        name="prerequisitos"
                                        className="form-control"
                                        value={prerequisitos}
                                        onChange={(e) => setPrerequisitos(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Sumilla</label>
                                    <input
                                        type="text"
                                        placeholder="Digite la sumilla"
                                        name="sumilla"
                                        className="form-control"
                                        value={sumilla}
                                        onChange={(e) => setSumilla(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Evaluación de Aprendizaje</label>
                                    <input
                                        type="text"
                                        placeholder="Digite la evaluación de aprendizaje"
                                        name="evaluacion_aprendizaje"
                                        className="form-control"
                                        value={evaluacion_aprendizaje}
                                        onChange={(e) => setEvaluacion_aprendizaje(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Día</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el día"
                                        name="dia"
                                        className="form-control"
                                        value={dia}
                                        onChange={(e) => setDia(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Hora de Inicio</label>
                                    <input
                                        type="time"
                                        placeholder="Digite la hora de inicio"
                                        name="hora_inicio"
                                        className="form-control"
                                        value={hora_inicio}
                                        onChange={(e) => setHora_inicio(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Hora de Fin</label>
                                    <input
                                        type="time"
                                        placeholder="Digite la hora de fin"
                                        name="hora_fin"
                                        className="form-control"
                                        value={hora_fin}
                                        onChange={(e) => setHora_fin(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdateCurso}>Guardar</button>
                                <Link to="/cursos" className="btn btn-danger">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddCursoComponent;
