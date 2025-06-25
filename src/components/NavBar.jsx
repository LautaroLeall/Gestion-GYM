import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark navbar-expand-lg mx-5 px-5">
            <h1 className="navbar-brand" id="logo" onClick={() => navigate('/')}>
                <span>GYM</span>NASIO
            </h1>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="container-btn d-flex flex-lg-row flex-column align-items-lg-center w-100">
                    <div className="container-btn d-flex gap-3 flex-column flex-lg-row align-items-lg-center w-100 justify-content-lg-center">
                        <button
                            className="btn btn-outline-secondary"
                            id="boton1"
                            onClick={() => navigate('/formulario')}
                        >
                            Registrar Turno
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            id="boton2"
                            onClick={() => navigate('/tabla')}
                        >
                            Ver los turnos
                        </button>
                    </div>
                    <h1 className="navbar-brand" id="SobreNosotros" onClick={() => navigate('/sobre-nosotros')}>
                        <span>Sobre</span>Nosotros
                    </h1>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
