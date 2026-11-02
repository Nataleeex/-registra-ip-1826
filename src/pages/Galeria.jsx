
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Galeria.css";

function Galeria() {
    const [obras, setObras] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Estados para búsqueda, categoría y ordenamiento
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todas");
    const [orden, setOrden] = useState("recientes");

    const navigate = useNavigate();

    // Consultar las obras registradas en el servidor
    useEffect(() => {
        const consultarObras = async () => {
            try {
                const respuesta = await fetch("http://localhost:4000/obras");

                if (!respuesta.ok) {
                    throw new Error("No fue posible consultar las obras.");
                }

                const datos = await respuesta.json();
                setObras(datos);
            } catch (error) {
                setError("No se pudieron cargar las obras.");
            } finally {
                setCargando(false);
            }
        };

        consultarObras();
    }, []);

    // Normalizar categorías para evitar problemas con acentos
    const normalizarCategoria = (valor) => {
        return String(valor || "")
            .replace(/Ã¡/g, "á")
            .replace(/Ã©/g, "é")
            .replace(/Ã­/g, "í")
            .replace(/Ã³/g, "ó")
            .replace(/Ãº/g, "ú")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    // Obtener un icono según el tipo de archivo
    const obtenerIcono = (archivo) => {
        const extension = archivo?.split(".").pop().toLowerCase();

        const iconos = {
            pdf: "📄",
            doc: "📝",
            docx: "📝",
            jpg: "🖼️",
            jpeg: "🖼️",
            png: "🖼️",
            gif: "🖼️",
            mp4: "🎬",
            mp3: "🎵",
            zip: "📦"
        };

        return iconos[extension] || "📁";
    };

    // Aplicar búsqueda, filtro y ordenamiento
    const obrasFiltradas = useMemo(() => {
        let resultado = [...obras];

        // Buscar por título o autor
        if (busqueda.trim() !== "") {
            const texto = busqueda.toLowerCase().trim();

            resultado = resultado.filter((obra) =>
                obra.titulo?.toLowerCase().includes(texto) ||
                obra.autor?.toLowerCase().includes(texto)
            );
        }

        // Filtrar por categoría
        if (categoria !== "Todas") {
            resultado = resultado.filter(
                (obra) =>
                    normalizarCategoria(obra.categoria) ===
                    normalizarCategoria(categoria)
            );
        }

        // Ordenar por fecha de registro
        resultado.sort((a, b) => {
            const fechaA = new Date(a.fechaRegistro).getTime() || 0;
            const fechaB = new Date(b.fechaRegistro).getTime() || 0;

            return orden === "recientes"
                ? fechaB - fechaA
                : fechaA - fechaB;
        });

        return resultado;
    }, [obras, busqueda, categoria, orden]);

    return (
        <section className="galeria-container">

            <div className="galeria-encabezado">
                <div>
                    <h1>Galería de obras</h1>
                    <p>Explora las obras registradas en REGISTRA-IP.</p>
                </div>

                <span className="galeria-contador">
                    {obras.length} obras registradas
                </span>
            </div>

            {/* Controles de búsqueda y filtrado */}
            <div className="galeria-controles">

                <div className="galeria-busqueda">
                    <label htmlFor="buscar-obra">
                        Buscar obra
                    </label>

                    <input
                        id="buscar-obra"
                        type="text"
                        placeholder="Buscar por título o autor..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="galeria-filtro">
                    <label htmlFor="filtro-categoria">
                        Categoría
                    </label>

                    <select
                        id="filtro-categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="Todas">Todas las categorías</option>

                        <option value="Artística">Artística</option>
                        <option value="Literaria">Literaria</option>
                        <option value="Audiovisual">Audiovisual</option>
                        <option value="Musical">Musical</option>

                        <option value="Diseño">Diseño</option>
                        <option value="Fotografía">Fotografía</option>
                        <option value="Escritura">Escritura</option>
                        <option value="Cine">Cine</option>
                    </select>
                </div>

                <div className="galeria-orden">
                    <label htmlFor="orden-fecha">
                        Ordenar por fecha
                    </label>

                    <select
                        id="orden-fecha"
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                    >
                        <option value="recientes">Más recientes</option>
                        <option value="antiguas">Más antiguas</option>
                    </select>
                </div>

            </div>

            {cargando && (
                <p className="galeria-mensaje" role="status">
                    Cargando galería de obras...
                </p>
            )}

            {error && (
                <p className="galeria-error" role="alert">
                    {error}
                </p>
            )}

            {!cargando && !error && obrasFiltradas.length === 0 && (
                <p className="galeria-mensaje">
                    No se encontraron obras con los criterios seleccionados.
                </p>
            )}

            {!cargando && !error && obrasFiltradas.length > 0 && (
                <>
                    <p className="galeria-resultados" role="status">
                        Mostrando {obrasFiltradas.length} de {obras.length} obras
                    </p>

                    <div className="galeria-grid">
                        {obrasFiltradas.map((obra) => (
                            <article className="obra-card" key={obra.folio}>

                                <div className="obra-icono">
                                    {obtenerIcono(obra.archivo)}
                                </div>

                                <div className="obra-contenido">

                                    <span className="obra-categoria">
                                        {obra.categoria}
                                    </span>

                                    <h2>{obra.titulo}</h2>

                                    <p>
                                        <strong>Autor:</strong> {obra.autor}
                                    </p>

                                    <p className="obra-folio">
                                        {obra.folio}
                                    </p>

                                    <button
                                        className="obra-boton-detalle"
                                        type="button"
                                        onClick={() =>
                                            navigate(`/detalle-obra/${obra.folio}`)
                                        }
                                    >
                                        Ver detalles
                                    </button>

                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}

        </section>
    );
}

export default Galeria;
