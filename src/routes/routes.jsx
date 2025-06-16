import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SobreNosotros from '../components/SobreNosotros';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';

const AppRoutes = ({
    socios,
    agregarSocio,
    eliminarSocio,
    editarSocio,
    actualizarSocio,
    cancelarEdicion,
    modoEdicion,
    socioEditado,
}) => {
    return (
        <BrowserRouter>
            <div className="bg-dark">
                <NavBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Carousel
                                vista="inicio"
                                agregarSocio={agregarSocio}
                                socioEditado={socioEditado}
                                actualizarSocio={actualizarSocio}
                                modoEdicion={modoEdicion}
                                cancelarEdicion={cancelarEdicion}
                                socios={socios}
                                eliminarSocio={eliminarSocio}
                                editarSocio={editarSocio}
                            />
                        }
                    />
                    <Route
                        path="/formulario"
                        element={
                            <Carousel
                                vista="formulario"
                                agregarSocio={agregarSocio}
                                socioEditado={socioEditado}
                                actualizarSocio={actualizarSocio}
                                modoEdicion={modoEdicion}
                                cancelarEdicion={cancelarEdicion}
                                socios={socios}
                                eliminarSocio={eliminarSocio}
                                editarSocio={editarSocio}
                            />
                        }
                    />
                    <Route
                        path="/tabla"
                        element={
                            <Carousel
                                vista="tabla"
                                agregarSocio={agregarSocio}
                                socioEditado={socioEditado}
                                actualizarSocio={actualizarSocio}
                                modoEdicion={modoEdicion}
                                cancelarEdicion={cancelarEdicion}
                                socios={socios}
                                eliminarSocio={eliminarSocio}
                                editarSocio={editarSocio}
                            />
                        }
                    />
                    <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;
