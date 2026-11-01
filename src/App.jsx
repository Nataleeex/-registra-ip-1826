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
import RutaProtegida from "./components/RutaProtegida";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Registro />} />

          <Route element={<RutaProtegida />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/registrar-obra"
              element={<RegistrarObra />}
            />
          </Route>

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