import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHouseDoor, BsBook, BsCalendar, BsCalculator } from 'react-icons/bs';
import '../styles/SidebarComponent.css';

const SidebarComponent = () => {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);

    const toggleCourses = () => {
        setIsCoursesOpen(!isCoursesOpen);
    };

    return (
        <div className="sidebar">
            <div className="user-info">
                <img src="path/to/user-icon.png" alt="Usuario" className="user-icon" />
                <div className="user-details">
                    <p>Usuario</p>
                    <p>Cargo</p>
                </div>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/"><BsHouseDoor /> Home</Link>
                </li>
                <li>
                    <div className="courses-link" onClick={toggleCourses}>
                        <BsBook /> Cursos
                    </div>
                    {isCoursesOpen && (
                        <ul className="sub-menu">
                            <li>
                                <Link to="/cursos"><BsBook/> Lista de Cursos</Link>
                            </li>
                            <li>
                                <Link to="/formulas"><BsCalculator/> Formulas</Link>
                            </li>
                            <li>
                                <Link to="/calendario"><BsCalendar /> Calendario de cursos</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link to="/"><BsHouseDoor /> Home</Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarComponent;
