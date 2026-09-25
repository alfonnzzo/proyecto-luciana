import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const miCiudadLinks = [
  { to: '/reportes', label: 'Reportes Formosa', icon: 'bi-file-earmark-text' },
  { to: '/foro', label: 'Foros Vecinales', icon: 'bi-people' },
  { to: '/alertas', label: 'Alertas', icon: 'bi-bell' },
  { to: '/avisos', label: 'Avisos Municipales', icon: 'bi-megaphone' },
]

function BrandLogo() {
  return (
    <NavLink to="/" className="brand-logo">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <circle cx="15" cy="15" r="14" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeWidth="1.5" />
        <path
          d="M15 6c-4 4.6-6.5 8.3-6.5 11.6a6.5 6.5 0 0 0 13 0C21.5 14.3 19 10.6 15 6Z"
          fill="#ffffff"
        />
      </svg>
      SaludCom
    </NavLink>
  )
}

function AppNavbar() {
  const { auth, login, logout } = useApp()
  const showAdminLink = auth.isAuthenticated && auth.role === 'municipio'

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top glass-panel-strong"
        style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
      >
        <div className="container">
        <BrandLogo />

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mainOffcanvas"
          aria-controls="mainOffcanvas"
          aria-label="Abrir menú"
        >
          <i className="bi bi-list fs-2 text-dark" aria-hidden="true"></i>
        </button>

        {/* Navegación desktop */}
        <div className="d-none d-lg-flex align-items-center gap-4 mx-auto">
          <NavLink to="/" end className="nav-link fw-semibold text-dark">
            Inicio
          </NavLink>

          <div className="dropdown">
            <button
              className="nav-link fw-semibold text-dark bg-transparent border-0 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mi Ciudad
            </button>
            <ul className="dropdown-menu p-2">
              {miCiudadLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="dropdown-item rounded-3 d-flex align-items-center gap-2">
                    <i className={`bi ${link.icon} text-primary`} aria-hidden="true"></i>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/retos" className="nav-link fw-semibold text-dark">
            Recompensas Vecino
          </NavLink>
          <NavLink to="/noticias" className="nav-link fw-semibold text-dark">
            Noticias Formoseñas
          </NavLink>
          {showAdminLink && (
            <NavLink to="/admin" className="nav-link fw-semibold text-dark">
              Panel Municipio
            </NavLink>
          )}
        </div>

        <div className="d-none d-lg-block">
          <SessionArea auth={auth} login={login} logout={logout} />
        </div>
      </div>
    </nav>

      {/* Menú mobile (offcanvas), fuera del <nav> para que no quede siempre visible en desktop */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mainOffcanvas">
        <div className="offcanvas-header">
          <BrandLogo />
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          <NavLink to="/" end className="nav-link fw-semibold text-dark" data-bs-dismiss="offcanvas">
            Inicio
          </NavLink>
          <p className="text-uppercase small fw-bold text-primary mb-1 mt-2">Mi Ciudad</p>
          {miCiudadLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-link fw-semibold text-dark ps-2"
              data-bs-dismiss="offcanvas"
            >
              <i className={`bi ${link.icon} me-2`} aria-hidden="true"></i>
              {link.label}
            </NavLink>
          ))}
          <hr />
          <NavLink to="/retos" className="nav-link fw-semibold text-dark" data-bs-dismiss="offcanvas">
            Recompensas Vecino
          </NavLink>
          <NavLink to="/noticias" className="nav-link fw-semibold text-dark" data-bs-dismiss="offcanvas">
            Noticias Formoseñas
          </NavLink>
          {showAdminLink && (
            <NavLink to="/admin" className="nav-link fw-semibold text-dark" data-bs-dismiss="offcanvas">
              Panel Municipio
            </NavLink>
          )}
          <hr />
          <SessionArea auth={auth} login={login} logout={logout} />
        </div>
      </div>
    </>
  )
}

function SessionArea({ auth, login, logout }) {
  if (auth.isAuthenticated) {
    return (
      <div className="dropdown">
        <button
          className="btn btn-brand-outline d-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle fs-5" aria-hidden="true"></i>
          <span className="d-none d-xl-inline">{auth.nombre}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end p-2">
          <li>
            <span className="dropdown-item-text small text-muted">
              Sesión: {auth.role === 'municipio' ? 'Municipio' : 'Vecino'}
            </span>
          </li>
          <li>
            <button className="dropdown-item rounded-3" type="button" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-brand-outline btn-sm"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Iniciar Sesión | Registrarse
      </button>
      {/* TODO backend: reemplazar este selector por el formulario real de login/registro */}
      <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: '220px' }}>
        <li className="small text-muted mb-2">Acceso de demostración</li>
        <li className="d-grid gap-2">
          <button className="btn btn-brand btn-sm" type="button" onClick={() => login('vecino')}>
            Entrar como Vecino
          </button>
          <button className="btn btn-brand-dark btn-sm" type="button" onClick={() => login('municipio')}>
            Entrar como Municipio
          </button>
        </li>
      </ul>
    </div>
  )
}

export default AppNavbar
