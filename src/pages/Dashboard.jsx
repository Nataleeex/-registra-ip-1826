
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("registraIpUsuario") || "null"
  );

  const [obras, setObras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const consultarObras = async () => {
      try {
        const respuesta = await fetch("http://localhost:4000/obras");

        if (!respuesta.ok) {
          throw new Error("Error al consultar las obras");
        }

        const datos = await respuesta.json();
        setObras(datos);

      } catch (error) {
        setError("No se pudieron cargar las obras registradas.");
      } finally {
        setCargando(false);
      }
    };

    consultarObras();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("registraIpUsuario");
    navigate("/", { replace: true });
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h2>¡Bienvenido, {usuario.nombre}!</h2>

        <p className="dashboard-description">
          Tu registro se realizó correctamente.
          Ahora formas parte de nuestra comunidad creativa.
        </p>

        <div className="dashboard-info">
          <p>
            <strong>Correo electrónico:</strong> {usuario.correo}
          </p>

          <p>
            <strong>Tipo de creador:</strong> {usuario.tipoCreador}
          </p>
        </div>

        <hr />

        <h3>Mis obras registradas</h3>

        {cargando && <p>Cargando obras...</p>}

        {error && <p>{error}</p>}

        {!cargando && !error && obras.length === 0 && (
          <p>Aún no tienes obras registradas.</p>
        )}

        {!cargando && obras.map((obra) => (
          <div key={obra.folio} className="dashboard-info">
            <h4>{obra.titulo}</h4>

            <p>
              <strong>Folio:</strong> {obra.folio}
            </p>

            <button
              type="button"
              onClick={() => navigate(`/detalle-obra/${obra.folio}`)}
            >
              Ver detalle y certificado
            </button>
          </div>
        ))}

        <button
          className="logout-button"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>

      </div>
    </div>
  );
}

export default Dashboard;
