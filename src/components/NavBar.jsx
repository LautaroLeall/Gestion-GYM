// src/components/Navbar.jsx
const Navbar = ({ cambiarVista }) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4">
            <span className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => cambiarVista('inicio')}>
                🏋️ Gimnasio
            </span>
            <div className="ms-auto d-flex gap-2">
                <button className="btn btn-outline-light" onClick={() => cambiarVista('formulario')}>
                    Anotarse
                </button>
                <button className="btn btn-outline-light" onClick={() => cambiarVista('tabla')}>
                    Ver turnos
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

