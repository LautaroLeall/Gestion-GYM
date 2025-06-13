import { useRef, useEffect } from 'react';
import Horariosgym from './Horariosgym';
import Form from './Form';
import PartnersTable from './PartnersTable';
import '../styles/Carousel.css';

const Carousel = ({
    vista,
    agregarSocio,
    socioEditado,
    actualizarSocio,
    modoEdicion,
    cancelarEdicion,
    socios,
    eliminarSocio,
    editarSocio
}) => {
    const formRef = useRef(null);
    const tablaRef = useRef(null);

    useEffect(() => {
        if (vista === 'formulario') {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (vista === 'tabla') {
            tablaRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [vista]);

    // Función para que el Form llame y haga scroll a la tabla
    const scrollToTabla = () => {
        tablaRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="contenedor-carousel">
            <section className="parallax-1">
                <div className="parallax-inner">
                    <h1 className="title-img">Bienvenidos a Nuestro Gimnasio</h1>
                </div>
            </section>

            <section>
                <Horariosgym />
            </section>

            <section className="parallax-2">
                <div className="parallax-inner">
                    <h1 className="title-img">Registrar Turnos</h1>
                </div>
            </section>

            <section className="form" ref={formRef}>
                <Form
                    agregarSocio={agregarSocio}
                    socioEditado={socioEditado}
                    actualizarSocio={actualizarSocio}
                    modoEdicion={modoEdicion}
                    cancelarEdicion={cancelarEdicion}
                    socios={socios}
                    scrollToTabla={scrollToTabla}
                />
            </section>

            <section className="parallax-3">
                <div className="parallax-inner">
                    <h1 className="title-img">Ver Turnos</h1>
                </div>
            </section>

            <section className="table" ref={tablaRef}>
                <PartnersTable
                    socios={socios}
                    eliminarSocio={eliminarSocio}
                    editarSocio={editarSocio}
                />
            </section>
        </section>
    );
};

export default Carousel;


