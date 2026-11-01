
import React from "react";

function Layout({ children }) {
  return (
    <div className="app-container">

      {/*ENCABEZADO PRINCIPAL*/}
      <header className="header">

        <div className="header-content">

          {/*IDENTIDAD DE REGISTRA-IP*/}
          <div className="brand">
            <div className="brand-icon">
              R
            </div>

            <div className="brand-text">
              <h1>REGISTRA-IP</h1>
              <p>Plataforma de creadores</p>
            </div>
          </div>

          {/*NAVEGACIÓN*/}
          <nav className="navigation">
            <span>Inicio</span>
            <span>Registro</span>
          </nav>

        </div>

      </header>

      {/*CONTENIDO DE LAS PÁGINAS*/}
      <main className="main-content">
        {children}
      </main>

      {/*PIE DE PÁGINA*/}
      <footer className="footer">
        <p>REGISTRA-IP © 2026 | Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}

export default Layout;
