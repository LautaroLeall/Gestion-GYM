import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SobreNosotros from '../components/SobreNosotros';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';

const AppRoutes = (props) => {
    const {
        socios,
        agregarSocio,
        eliminarSocio,
        editarSocio,
        actualizarSocio,
        cancelarEdicion,
        modoEdicion,
        socioEditado,
    } = props;

    // Para no repetir tanto el mismo bloque
    const renderCarousel = (vista) => (
        <Carousel
            vista={vista}
            socios={socios}
            agregarSocio={agregarSocio}
            eliminarSocio={eliminarSocio}
            editarSocio={editarSocio}
            actualizarSocio={actualizarSocio}
            cancelarEdicion={cancelarEdicion}
            modoEdicion={modoEdicion}
            socioEditado={socioEditado}
        />
    );

    return (
        <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={renderCarousel("inicio")} />
                    <Route path="/formulario" element={renderCarousel("formulario")} />
                    <Route path="/tabla" element={renderCarousel("tabla")} />
                    <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
