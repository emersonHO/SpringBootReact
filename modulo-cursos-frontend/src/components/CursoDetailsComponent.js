import React, { useEffect, useState } from "react";
import CursoService from "../services/CursoService";
import { useParams, Link } from "react-router-dom";

const CursoDetailComponent = () => {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);

    useEffect(() => {
        CursoService.getCursoById(id)
            .then(response => {
                setCurso(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="container">
            {curso && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{curso.nombre}</h5>
                        <p className="card-text">Ciclo: {curso.ciclo}</p>
                        <p className="card-text">Código: {curso.codigo}</p>
                        <p className="card-text">Modalidad: {curso.modalidad}</p>
                        <p className="card-text">Estado: {curso.estado}</p>
                        <Link to={`/edit-curso/${curso.id}`} className="btn btn-primary">Editar</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CursoDetailComponent;
