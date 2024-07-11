import React, { useEffect, useState } from "react";
import CursoService from "../services/CursoService";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import '../styles/ListCursosComponent.css';

export const FormulasComponent = () => {
    const [cursos, setCursos] = useState([]);
    const [dropdownId, setDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        listarCursos();
    }, []);

    const listarCursos = () => {
        CursoService.getAllCursos().then(response => {
            setCursos(response.data);
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
        navigate(`/cursos/${cursoId}/formulas`);
    };

    return (
        <div className="container">
            <h2 className='text-center'>Lista de cursos para agregar fórmulas:</h2>
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
                                    <Link className="dropdown-item" to={`/cursos/${curso.id}/formulas/add-formula`} onClick={(e) => e.stopPropagation()}>Agregar Fórmula</Link>
                                    <Link className="dropdown-item" to={`/cursos/${curso.id}/formulas`} onClick={(e) => e.stopPropagation()}>Ver Fórmulas</Link>
                                    <button className="dropdown-item" onClick={() => {
                                        // Eliminar curso o cualquier otra acción
                                        setDropdownId(null);
                                    }}>Eliminar</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormulasComponent;
