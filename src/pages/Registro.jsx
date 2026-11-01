
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoCreador, setTipoCreador] = useState("Diseñador");
  const [errores, setErrores] = useState([]);

  const manejarRegistro = (e) => {
    e.preventDefault();

    const nuevosErrores = [];

    if (nombre.trim() === "") {
      nuevosErrores.push("El nombre es obligatorio.");
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.trim() === "") {
      nuevosErrores.push("El correo electrónico es obligatorio.");
    } else if (!expresionCorreo.test(correo)) {
      nuevosErrores.push("Ingresa un correo electrónico válido.");
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const usuario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      tipoCreador: tipoCreador
    };

    localStorage.setItem(
      "registraIpUsuario",
      JSON.stringify(usuario)
    );

    setErrores([]);
    navigate("/dashboard");
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2>Registro de creadores</h2>

        <p className="registro-description">
          Completa tus datos para formar parte de nuestra comunidad creativa.
        </p>

        <form onSubmit={manejarRegistro} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>

            <input
              id="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              aria-invalid={errores.some((error) =>
                error.includes("nombre")
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>

            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              aria-invalid={errores.some((error) =>
                error.includes("correo")
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoCreador">Tipo de creador</label>

            <select
              id="tipoCreador"
              value={tipoCreador}
              onChange={(e) => setTipoCreador(e.target.value)}
            >
              <option value="Diseñador">Diseñador</option>
              <option value="Fotógrafo">Fotógrafo</option>
              <option value="Escritor">Escritor</option>
              <option value="Cineasta">Cineasta</option>
            </select>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="error-container"
          >
            {errores.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>

          <button type="submit" className="registro-button">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
