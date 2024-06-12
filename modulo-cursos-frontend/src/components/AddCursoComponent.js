import React, { useEffect, useState } from "react";
import CursoService from "../services/CursoService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddCursoComponent = () => {

    const [ciclo,setCiclo] = useState('');
    const [codigo,setCodigo] = useState('');
    const [departamento_id,setDepartamento_id] = useState('');
    const [estado,setEstado] = useState('');
    const [modalidad,setModalidad] = useState('');
    const [nombre,setNombre] = useState('');
    const [num_creditos,setNum_creditos] = useState('');
    const [num_horas_campo,setNum_horas_campo] = useState('');
    const [num_horas_laboratorio,setNum_horas_laboratorio] = useState('');
    const [num_horas_practica,setNum_horas_practica] = useState('');
    const [num_horas_teoria,setNum_horas_teoria] = useState('');
    const [periodo_academico_id,setPeriodo_academico_id] = useState('');
    const [sumilla,setSumilla] = useState('');
    const [tipo,setTipo] = useState('');
    const [institucion_id,setInstitucion_id] = useState('');
    const [plan_estudios_id,setPlan_estudios_id] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateCurso = (e) => {
        e.preventDefault();
        const curso = {ciclo, codigo, departamento_id, estado, modalidad, nombre, num_creditos, num_horas_campo, num_horas_laboratorio, num_horas_practica, num_horas_teoria, periodo_academico_id, sumilla, tipo, institucion_id, plan_estudios_id};
        
        if(id){
            CursoService.updateCurso(id, curso).then((response) => {
                console.log(response.data);
                navigate('/cursos');
            }).catch(error => {
                console.log(error);
            })
        } else{
            CursoService.createCurso(curso).then((response) => {
                console.log(response.data);
                navigate('/cursos');
            }).catch(error => {
                console.log(error);
            })
        }
                
    }

    useEffect(() => {
        CursoService.getCursoById(id).then((response) => {
            setCodigo(response.data.codigo);
            setNombre(response.data.nombre);
            setCiclo(response.data.ciclo);
            setDepartamento_id(response.data.departamento_id);
            setEstado(response.data.estado);
            setInstitucion_id(response.data.institucion_id);
            setModalidad(response.data.modalidad);
            setNum_creditos(response.data.num_creditos);
            setNum_horas_campo(response.data.num_horas_campo);
            setNum_horas_laboratorio(response.data.num_horas_laboratorio);
            setNum_horas_practica(response.data.num_horas_practica);
            setNum_horas_teoria(response.data.num_horas_teoria);
            setPeriodo_academico_id(response.data.periodo_academico_id);
            setPlan_estudios_id(response.data.plan_estudios_id);
            setSumilla(response.data.sumilla);
            setTipo(response.data.tipo);
        }).catch(error => {
            console.log(error);
        })
    }, [id])

    const title = () => {
        if(id){
            return <h2 className="text-center">Actualizar curso</h2>
        } else{
            return <h2 className="text-center">Agregar curso</h2>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">{title()}</h2>
                    <div className="card-body">
                        <form>
                        <div className="form-group mb-2">
                                <label className="form-label">Código</label>
                                <input
                                    type="text"
                                    placeholder="Digite el código del curso"
                                    name="codigo"
                                    className="form-control"
                                    value={ codigo }
                                    onChange={(e) => setCodigo(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Digite el nombre del curso"
                                    name="nombre"
                                    className="form-control"
                                    value={ nombre }
                                    onChange={(e) => setNombre(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Ciclo</label>
                                <input
                                    type="text"
                                    placeholder="Digite el ciclo del curso"
                                    name="ciclo"
                                    className="form-control"
                                    value={ ciclo }
                                    onChange={(e) => setCiclo(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Modalidad</label>
                                <input
                                    type="text"
                                    placeholder="Digite la modalidad del curso"
                                    name="modalidad"
                                    className="form-control"
                                    value={ modalidad }
                                    onChange={(e) => setModalidad(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Creditos</label>
                                <input
                                    type="text"
                                    placeholder="Digite los creditos del curso"
                                    name="num_creditos"
                                    className="form-control"
                                    value={ num_creditos }
                                    onChange={(e) => setNum_creditos(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Horas de Campo</label>
                                <input
                                    type="text"
                                    placeholder="Digite el número horas de campo del curso"
                                    name="num_horas_campo"
                                    className="form-control"
                                    value={ num_horas_campo }
                                    onChange={(e) => setNum_horas_campo(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Horas de laboratorio</label>
                                <input
                                    type="text"
                                    placeholder="Digite el número de horas de laboratorio del curso"
                                    name="num_horas_laboratorio"
                                    className="form-control"
                                    value={ num_horas_laboratorio }
                                    onChange={(e) => setNum_horas_laboratorio(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Horas de practica</label>
                                <input
                                    type="text"
                                    placeholder="Digite el número de horas de practica del curso"
                                    name="num_horas_practica"
                                    className="form-control"
                                    value={ num_horas_practica }
                                    onChange={(e) => setNum_horas_practica(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Horas de teoría</label>
                                <input
                                    type="text"
                                    placeholder="Digite el número de horas de teoría del curso"
                                    name="num_horas_teoria"
                                    className="form-control"
                                    value={ num_horas_teoria }
                                    onChange={(e) => setNum_horas_teoria(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Sumilla</label>
                                <input
                                    type="text"
                                    placeholder="Digite la sumilla del curso"
                                    name="sumilla"
                                    className="form-control"
                                    value={ sumilla }
                                    onChange={(e) => setSumilla(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Tipo</label>
                                <input
                                    type="text"
                                    placeholder="Digite el tipo de curso"
                                    name="tipo"
                                    className="form-control"
                                    value={ tipo }
                                    onChange={(e) => setTipo(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Estado</label>
                                <input
                                    type="text"
                                    placeholder="Digite el estado del curso"
                                    name="estado"
                                    className="form-control"
                                    value={ estado }
                                    onChange={(e) => setEstado(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ID del Departamento</label>
                                <input
                                    type="text"
                                    placeholder="Digite el ID del Departamento"
                                    name="departamento_id"
                                    className="form-control"
                                    value={ departamento_id }
                                    onChange={(e) => setDepartamento_id(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ID de Periodo Académico</label>
                                <input
                                    type="text"
                                    placeholder="Digite el ID del Periodo Académico"
                                    name="periodo_academico_id"
                                    className="form-control"
                                    value={ periodo_academico_id }
                                    onChange={(e) => setPeriodo_academico_id(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ID de Institucion</label>
                                <input
                                    type="text"
                                    placeholder="Digite el ID de la Institución"
                                    name="institucion_id"
                                    className="form-control"
                                    value={ institucion_id }
                                    onChange={(e) => setInstitucion_id(e.target.value)}                                
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ID de Plan de Estudios</label>
                                <input
                                    type="text"
                                    placeholder="Digite el ID del Plan de Estudios"
                                    name="plan_estudios_id"
                                    className="form-control"
                                    value={ plan_estudios_id }
                                    onChange={(e) => setPlan_estudios_id(e.target.value)}                                
                                />
                            </div>
                            <button className="btn btn-success" onClick={(e) => saveOrUpdateCurso(e)}>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to='/cursos' className="btn btn-danger">Cancelar</Link>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddCursoComponent;