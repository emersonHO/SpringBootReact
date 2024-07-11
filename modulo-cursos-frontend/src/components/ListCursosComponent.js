import React, { useEffect, useState } from "react";
import CursoService from "../services/CursoService";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import '../styles/ListCursosComponent.css'; // Archivo CSS para los estilos personalizados

export const ListCursosComponent = () => {
    const [cursos, setCursos] = useState([]);
    const [dropdownId, setDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        listarCursos();
    }, []);

    const listarCursos = () => {
        CursoService.getAllCursos().then(response => {
            setCursos(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const deleteCurso = (cursoId) => {
        CursoService.deleteCurso(cursoId).then((response) => {
            listarCursos();
        }).catch(error => {
            console.log(error);
        });
    };

    const toggleDropdown = (cursoId) => {
        if (dropdownId === cursoId) {
            setDropdownId(null);
        } else {
            setDropdownId(cursoId);
        }
    };

    const getInitials = (name) => {
        if (!name) return ''; // Handle case where name is undefined or null
    
        return name.split(' ').map(word => word[0]).join('');
    };
    

    const handleCardClick = (cursoId) => {
        navigate(`/cursos/${cursoId}`);
    };

    return (
        <div className="container">
            <h2 className='text-center'>Lista de cursos disponibles:</h2>
            <div className="card-deck">
                {cursos.map(curso => (
                    <div key={curso.id} className="card curso-card" onClick={() => handleCardClick(curso.id)}>
                        <div className="card-body curso-card-body">
                            <div className="initials-box">{getInitials(curso.nombre)}</div>
                            <p className="card-text">{curso.nombre}</p>
                            <p className="card-text">{curso.ciclo} / {curso.horario}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-light" onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(curso.id);
                                }}><BsThreeDotsVertical />
                            </button>
                            {dropdownId === curso.id && (
                                <div className="dropdown-menu show" aria-labelledby={`dropdownMenuButton-${curso.id}`}>
                                    <Link className="dropdown-item" to={`/edit-curso/${curso.id}`} onClick={(e) => e.stopPropagation()}>Actualizar</Link>
                                    <Link to={`/cursos/${curso.id}/alumnos`} className="dropdown-item" onClick={(e) => e.stopPropagation()}>Registro de alumnos</Link>
                                    <button className="dropdown-item" onClick={() => {
                                        deleteCurso(curso.id);
                                        setDropdownId(null);
                                    }}>Eliminar</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="card curso-card">
                    <Link to='/add-curso' className="btn btn-primary curso-card-body d-flex justify-content-center align-items-center">
                        <BsPlus size={30} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListCursosComponent;
