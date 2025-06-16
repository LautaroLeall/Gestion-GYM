import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4 d-flex justify-content-around">
            <h1 className="navbar-brand" id="logo" onClick={() => navigate('/')}>
                <span>GYM</span>NASIO
            </h1>

            <div className="gap-3 d-flex">
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
        </nav>
    );
};

export default NavBar;

