
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Layout from "./components/Layout";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import RegistrarObra from "./pages/RegistrarObra";
import DetalleObra from "./pages/DetalleObra";
import Galeria from "./pages/Galeria";
import RutaProtegida from "./components/RutaProtegida";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Página de registro */}
          <Route path="/" element={<Registro />} />

          {/* Rutas protegidas */}
          <Route element={<RutaProtegida />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/registrar-obra"
              element={<RegistrarObra />}
            />

            <Route
              path="/detalle-obra/:folio"
              element={<DetalleObra />}
            />

            <Route
              path="/galeria"
              element={<Galeria />}
            />

          </Route>

          {/* Redirección de rutas inexistentes */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
