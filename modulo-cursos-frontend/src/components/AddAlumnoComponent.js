import React, { useEffect, useState } from "react";
import AlumnoService from "../services/AlumnoService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddAlumnoComponent = () => {
    const [codigo, setCodigo] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [especialidad_id, setEspecialidad_id] = useState('');
    const navigate = useNavigate();
    const { cursoId, alumnoId } = useParams();

    const saveOrUpdateAlumno = async (e) => {
        e.preventDefault();
        const alumno = { codigo, nombres, apellidos, email, especialidad_id, estado };
        
        try {
            if (alumnoId) {
                await AlumnoService.updateAlumno(alumnoId, alumno);
            } else {
                const response = await AlumnoService.createAlumno(alumno);
                await AlumnoService.asociarAlumnoConCurso(cursoId, response.data.id, estado);
            }
            navigate(`/cursos/${cursoId}/alumnos`);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (alumnoId) {
            AlumnoService.getAlumnoById(alumnoId).then((response) => {
                setCodigo(response.data.codigo);
                setNombres(response.data.nombres);
                setApellidos(response.data.apellidos);
                setEmail(response.data.email);
                setEstado(response.data.estado);
                setEspecialidad_id(response.data.especialidad_id);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [alumnoId]);

    const title = () => {
        return alumnoId ? <h2 className="text-center">Actualizar Alumno</h2> : <h2 className="text-center">Registrar Alumno</h2>;
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Código</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el código del alumno"
                                        name="codigo"
                                        className="form-control"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}                                
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Nombres</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el nombre del alumno"
                                        name="nombres"
                                        className="form-control"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}                                
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el apellido del alumno"
                                        name="apellidos"
                                        className="form-control"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}                                
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Digite el email del alumno"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}                                
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">ID de especialidad</label>
                                    <input
                                        type="text"
                                        placeholder="Digite el ID de la especialidad"
                                        name="especialidad_id"
                                        className="form-control"
                                        value={especialidad_id}
                                        onChange={(e) => setEspecialidad_id(e.target.value)}                                
                                    />
                                </div>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateAlumno(e)}>Guardar</button>
                                <Link to={`/cursos/${cursoId}/alumnos`} className="btn btn-danger ms-2">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAlumnoComponent;
