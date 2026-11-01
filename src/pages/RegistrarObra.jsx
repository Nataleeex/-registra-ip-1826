
import { useState } from "react";
import "../App.css";

function RegistrarObra() {
    const [datos, setDatos] = useState({
        paso: 1,
        archivo: null,
        titulo: "",
        categoria: "",
        descripcion: "",
        autor: "Isaac Emmanuel Martinez Torres",
        enviando: false,
        folioGenerado: ""
    });

    // Actualizar los datos del formulario
    const actualizarDatos = (campo, valor) => {
        setDatos({
            ...datos,
            [campo]: valor
        });
    };

    // Validar cada paso
    const pasoValido = () => {
        if (datos.paso === 1) {
            return datos.archivo !== null;
        }

        if (datos.paso === 2) {
            return datos.titulo.trim().length >= 5 &&
                   datos.categoria !== "";
        }

        return true;
    };

    // Avanzar al siguiente paso
    const siguientePaso = () => {
        if (pasoValido()) {
            setDatos({
                ...datos,
                paso: datos.paso + 1
            });
        }
    };

    // Regresar al paso anterior
    const pasoAnterior = () => {
        setDatos({
            ...datos,
            paso: datos.paso - 1
        });
    };

    // Registrar la obra en el servidor
    const registrarObra = async () => {
        try {
            setDatos(prev => ({ ...prev, enviando: true }));

            // Consultar las obras existentes
            const respuestaObras = await fetch(
                "http://localhost:4000/obras"
            );

            if (!respuestaObras.ok) {
                throw new Error("No se pudieron consultar las obras.");
            }

            const obras = await respuestaObras.json();

            // Generar el siguiente folio
            const prefijo = "OBRA-1826-";

            const numeros = obras
                .map(obra => Number(obra.folio.replace(prefijo, "")))
                .filter(numero => Number.isInteger(numero) && numero > 0);

            const siguiente = Math.max(0, ...numeros) + 1;
            const folio = prefijo + String(siguiente).padStart(3, "0");

            // Preparar los datos para enviarlos
            const formulario = new FormData();

            formulario.append("archivo", datos.archivo);
            formulario.append("folio", folio);
            formulario.append("titulo", datos.titulo);
            formulario.append("categoria", datos.categoria);
            formulario.append("descripcion", datos.descripcion);
            formulario.append("autor", datos.autor);

            // Enviar los datos al servidor
            const respuesta = await fetch(
                "http://localhost:4000/obras",
                {
                    method: "POST",
                    body: formulario
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    resultado.mensaje || "No se pudo registrar la obra."
                );
            }

            // Guardar el folio generado
            setDatos(prev => ({
                ...prev,
                folioGenerado: resultado.obra.folio
            }));

        } catch (error) {
            alert(error.message);
        } finally {
            setDatos(prev => ({
                ...prev,
                enviando: false
            }));
        }
    };

    return (
        <div className="registrar-obra">

            <h1>Registrar nueva obra</h1>

            <p>
                Completa los siguientes pasos para registrar tu obra.
            </p>

            {/* Barra de progreso */}
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

                {/* PASO 1: SUBIR ARCHIVO */}
                {datos.paso === 1 && (
                    <div className="paso-contenido">

                        <h2>Subir archivo</h2>

                        <p>
                            Selecciona el archivo digital que deseas registrar.
                        </p>

                        <div className="zona-archivo">

                            <input
                                type="file"
                                onChange={(e) =>
                                    actualizarDatos(
                                        "archivo",
                                        e.target.files[0]
                                    )
                                }
                            />

                            {datos.archivo && (
                                <p>
                                    Archivo seleccionado: {datos.archivo.name}
                                </p>
                            )}

                        </div>

                        {!datos.archivo && (
                            <p className="mensaje-error">
                                Debes seleccionar un archivo para continuar.
                            </p>
                        )}

                    </div>
                )}

                {/* PASO 2: METADATOS */}
                {datos.paso === 2 && (
                    <div className="paso-contenido">

                        <h2>Metadatos de la obra</h2>

                        <label>Título de la obra</label>

                        <input
                            type="text"
                            placeholder="Escribe el título de tu obra"
                            value={datos.titulo}
                            onChange={(e) =>
                                actualizarDatos("titulo", e.target.value)
                            }
                        />

                        {datos.titulo.trim().length < 5 && (
                            <p className="mensaje-error">
                                El título debe tener al menos 5 caracteres.
                            </p>
                        )}

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

                        {!datos.categoria && (
                            <p className="mensaje-error">
                                Debes seleccionar una categoría.
                            </p>
                        )}

                        <label>Descripción</label>

                        <textarea
                            placeholder="Describe brevemente tu obra"
                            value={datos.descripcion}
                            onChange={(e) =>
                                actualizarDatos("descripcion", e.target.value)
                            }
                        />

                    </div>
                )}

                {/* PASO 3: VISTA PREVIA */}
                {datos.paso === 3 && (
                    <div className="paso-contenido">

                        <h2>Vista previa de la obra</h2>

                        <p>
                            Revisa que toda la información sea correcta
                            antes de continuar.
                        </p>

                        <div className="resumen-obra">

                            <p>
                                <strong>Archivo:</strong>{" "}
                                {datos.archivo?.name}
                            </p>

                            <p>
                                <strong>Título:</strong> {datos.titulo}
                            </p>

                            <p>
                                <strong>Categoría:</strong> {datos.categoria}
                            </p>

                            <p>
                                <strong>Descripción:</strong>{" "}
                                {datos.descripcion || "Sin descripción"}
                            </p>

                            <p>
                                <strong>Autor:</strong> {datos.autor}
                            </p>

                        </div>

                    </div>
                )}

                {/* PASO 4: CONFIRMACIÓN */}
                {datos.paso === 4 && (
                    <div className="paso-contenido">

                        <h2>Confirmación</h2>

                        {datos.folioGenerado ? (
                            <>
                                <h3>¡Obra registrada correctamente!</h3>

                                <p>Tu folio de registro es:</p>

                                <h2>{datos.folioGenerado}</h2>

                                <p>Tu obra se ha guardado en el sistema.</p>
                            </>
                        ) : (
                            <>
                                <p>Estás listo para registrar tu obra.</p>

                                <p>
                                    <strong>Título:</strong> {datos.titulo}
                                </p>

                                <p>
                                    <strong>Categoría:</strong> {datos.categoria}
                                </p>

                                <p>
                                    <strong>Archivo:</strong>{" "}
                                    {datos.archivo?.name}
                                </p>

                                <button
                                    onClick={registrarObra}
                                    disabled={datos.enviando}
                                >
                                    {datos.enviando
                                        ? "Registrando..."
                                        : "Confirmar registro"}
                                </button>
                            </>
                        )}

                    </div>
                )}

            </div>

            {/* Botones de navegación */}
            <div className="botones-wizard">

                {datos.paso > 1 && !datos.folioGenerado && (
                    <button onClick={pasoAnterior}>
                        Atrás
                    </button>
                )}

                {datos.paso < 4 && (
                    <button
                        onClick={siguientePaso}
                        disabled={!pasoValido()}
                    >
                        Siguiente
                    </button>
                )}

            </div>

        </div>
    );
}

export default RegistrarObra;
