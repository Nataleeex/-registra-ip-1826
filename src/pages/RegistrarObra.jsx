import { useState } from "react";
import "../App.css";

function RegistrarObra() {
    const [datos, setDatos] = useState({
        paso: 1,
        archivo: null,
        titulo: "",
        categoria: "",
        descripcion: "",
        autor: "Isaac Emmanuel Martinez Torres"
    });

    const actualizarDatos = (campo, valor) => {
        setDatos({
            ...datos,
            [campo]: valor
        });
    };

    const siguientePaso = () => {
        setDatos({
            ...datos,
            paso: datos.paso + 1
        });
    };

    const pasoAnterior = () => {
        setDatos({
            ...datos,
            paso: datos.paso - 1
        });
    };

    return (
        <div className="registrar-obra">
            <h1>Registrar nueva obra</h1>
            <p>Completa los siguientes pasos para registrar tu obra.</p>

            <div className="progreso">
                {[1, 2, 3, 4].map((numero) => (
                    <div
                        key={numero}
                        className={`circulo ${
                            datos.paso >= numero ? "activo" : ""
                        }`}
                    >
                        {numero}
                    </div>
                ))}
            </div>

            <div className="contenido-wizard">
                {datos.paso === 1 && (
                    <div className="paso-contenido">
                        <h2>Subir archivo</h2>
                        <p>Selecciona el archivo digital que deseas registrar.</p>

                        <div className="zona-archivo">
                            <input
                                type="file"
                                onChange={(e) =>
                                    actualizarDatos("archivo", e.target.files[0])
                                }
                            />
                            {datos.archivo && (
                                <p>Archivo: {datos.archivo.name}</p>
                            )}
                        </div>
                    </div>
                )}

                {datos.paso === 2 && (
                    <div className="paso-contenido">
                        <h2>Metadatos de la obra</h2>

                        <label>Título de la obra</label>
                        <input
                            type="text"
                            value={datos.titulo}
                            onChange={(e) =>
                                actualizarDatos("titulo", e.target.value)
                            }
                        />

                        <label>Categoría</label>
                        <select
                            value={datos.categoria}
                            onChange={(e) =>
                                actualizarDatos("categoria", e.target.value)
                            }
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Literaria">Literaria</option>
                            <option value="Musical">Musical</option>
                            <option value="Artística">Artística</option>
                            <option value="Audiovisual">Audiovisual</option>
                            <option value="Software">Software</option>
                        </select>

                        <label>Descripción</label>
                        <textarea
                            value={datos.descripcion}
                            onChange={(e) =>
                                actualizarDatos("descripcion", e.target.value)
                            }
                        />
                    </div>
                )}

                {datos.paso === 3 && (
                    <div className="paso-contenido">
                        <h2>Vista previa de la obra</h2>
                        <p><strong>Archivo:</strong> {datos.archivo?.name}</p>
                        <p><strong>Título:</strong> {datos.titulo}</p>
                        <p><strong>Categoría:</strong> {datos.categoria}</p>
                        <p><strong>Descripción:</strong> {datos.descripcion}</p>
                        <p><strong>Autor:</strong> {datos.autor}</p>
                    </div>
                )}

                {datos.paso === 4 && (
                    <div className="paso-contenido">
                        <h2>Confirmación</h2>
                        <p>Estás listo para registrar tu obra.</p>
                    </div>
                )}
            </div>

            <div className="botones-wizard">
                {datos.paso > 1 && (
                    <button onClick={pasoAnterior}>Atrás</button>
                )}

                {datos.paso < 4 && (
                    <button onClick={siguientePaso}>Siguiente</button>
                )}
            </div>
        </div>
    );
}

export default RegistrarObra;