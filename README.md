Verificación y Validación
Habiendo utilizado SonarLint en un proyecto de sistema docente, específicamente en el módulo de alumnos (AddAlumnoComponent.js), se identificaron los siguientes problemas.

Problema 1
Descripción: La etiqueta <label> no tiene un atributo htmlFor que asocie el texto de la etiqueta con el control de entrada (<input>). 
Esto significa que los lectores de pantalla y otras tecnologías de accesibilidad no podrán relacionar adecuadamente el texto de la etiqueta con el campo de entrada.
Refactorización/Corrección: Añadir htmlFor en la etiqueta <label> y asegurarse de que el id del <input> coincida. Esto asegura que la etiqueta esté asociada correctamente con el campo de entrada.

Fragmento de código:

<div className="form-group mb-2">
    <label htmlFor="codigo" className="form-label">Código</label>
    <input
        type="text"
        id="codigo" // Añadido para vincular con el label
        placeholder="Digite el código del alumno"
        name="codigo"
        className="form-control"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}                                
    />
</div>


Problema 2

Descripción: El componente AddAlumnoComponent carece de validación para los tipos de datos en las propiedades, lo que puede llevar a errores en tiempo de ejecución.
Refactorización/Corrección: Añadir validación de tipos utilizando PropTypes. Esto ayuda a asegurar que las propiedades se utilicen correctamente y evita errores.
Fragmento de código:

import PropTypes from 'prop-types';
const AddAlumnoComponent = ({ cursoId }) => {
    // resto del código
}
AddAlumnoComponent.propTypes = {
    cursoId: PropTypes.string.isRequired,
};


Problema 3
Descripción: La etiqueta <label> para el campo de email no está asociada correctamente con el campo de entrada, lo que afecta la accesibilidad para personas que dependen de herramientas de asistencia.
Refactorización/Solución: Para corregir este problema de accesibilidad, se debe añadir el atributo htmlFor en la etiqueta <label> y asegurarse de que el campo <input> tenga un id correspondiente.
Fragmento de código:

<div className="form-group mb-2">
    <label htmlFor="email" className="form-label">Email</label>
    <input
        type="email"
        id="email" // Añadido para vincular con el label
        placeholder="Digite el email del alumno"
        name="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}                                
    />
</div>


REPORTE ESTÁTICO:

AddAlumnoComponent

Problema: Falta de asociación entre <label> y <input>.
Descripción: Varios campos de entrada carecían de la asociación adecuada con sus etiquetas, afectando la accesibilidad.
Corrección: Se añadió el atributo htmlFor en las etiquetas <label> y el atributo id en los <input> correspondientes para vincularlos correctamente.

Problema: Falta de validación de propiedades.
Descripción: Las propiedades del componente no estaban siendo validadas.
Corrección: Se añadió validación utilizando PropTypes para asegurar el tipo y la obligatoriedad de las propiedades.
Campo "Email"

Problema: Falta de asociación entre <label> y <input>.
Descripción: Similar a otros campos, la etiqueta no estaba asociada con el campo de entrada.
Corrección: Se implementó el mismo cambio, añadiendo htmlFor y id.
