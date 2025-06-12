import'/Navbar.css';
const Navbar = ({ cambiarVista }) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4 d-flex justify-content-around">
            <h1 className="navbar-brand" id="logo" onClick={() => cambiarVista('inicio')}>
               <span>GYM</span>NASIO
            </h1>
            
            <div className="gap-3 d-flex  ">
                <button className="btn btn-outline-secondary" id="boton1" onClick={() => cambiarVista('formulario')}>
                    Registrar Turno
                </button>
                <button className="btn btn-outline-secondary" id="boton2" onClick={() => cambiarVista('tabla')}>
                    Ver los turnos
                </button>
            </div>
             <h1 className="navbar-brand" id="SobreNosotros" onClick={() => cambiarVista('inicio')}>
               <span>Sobre</span>Nosotros
            </h1>
        </nav>
    );
};

export default Navbar;

