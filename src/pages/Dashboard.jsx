
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("registraIpUsuario") || "null"
  );

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
