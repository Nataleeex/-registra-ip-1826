import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generarCertificado } from "../utils/generarCertificado";

function DetalleObra() {
  const { folio } = useParams();
  const navigate = useNavigate();

  const [obra, setObra] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const consultarObra = async () => {
      try {
        const respuesta = await fetch("http://localhost:4000/obras");

        if (!respuesta.ok) {
          throw new Error("No fue posible consultar las obras.");
        }

        const obras = await respuesta.json();

        const obraEncontrada = obras.find(
          (elemento) => elemento.folio === folio
        );

        if (!obraEncontrada) {
          setError("No se encontró la obra solicitada.");
        } else {
          setObra(obraEncontrada);
        }

      } catch (error) {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    consultarObra();
  }, [folio]);

  if (cargando) {
    return <p>Consultando información de la obra...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="registro-container">
      <div className="registro-card">

        <h2>Detalle de la obra</h2>

        <p><strong>Título:</strong> {obra.titulo}</p>
        <p><strong>Autor:</strong> {obra.autor}</p>
        <p><strong>Categoría:</strong> {obra.categoria}</p>
        <p><strong>Descripción:</strong> {obra.descripcion || "Sin descripción"}</p>
        <p><strong>Fecha de registro:</strong> {new Date(obra.fechaRegistro).toLocaleDateString("es-MX")}</p>
        <p><strong>Folio:</strong> {obra.folio}</p>

        <button
          type="button"
          onClick={() => generarCertificado(obra)}
        >
          Descargar certificado PDF
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Volver al inicio
        </button>

      </div>
    </div>
  );
}

export default DetalleObra;