
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RutaProtegida() {

  // Comprobar si existe una sesión registrada
  const usuario = localStorage.getItem("registraIpUsuario");

  // Si no existe usuario, regresar al registro
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Si existe usuario, permitir el acceso
  return <Outlet />;
}

export default RutaProtegida;
