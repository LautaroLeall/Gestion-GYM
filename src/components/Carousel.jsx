import { useRef, useEffect } from 'react';
import HorariosGym from './HorariosGym';
import Form from './Form';
import PartnersTable from './PartnersTable';
import '../styles/Carousel.css';

// Componente principal llamado Carousel
const Carousel = ({
    vista,               // Prop para saber si debe mostrarse el formulario o la tabla
    agregarSocio,        // Función para agregar un nuevo socio
    socioEditado,        // Objeto con los datos del socio que se está editando
    actualizarSocio,     // Función para actualizar un socio existente
    modoEdicion,         // Booleano que indica si estamos en modo edición
    cancelarEdicion,     // Función para cancelar la edición
    socios,              // Array de todos los socios
    eliminarSocio,       // Función para eliminar un socio
    editarSocio          // Función para cargar los datos del socio a editar
}) => {
    const formRef = useRef(null); // Referencia al formulario, usada para hacer scroll
    const tablaRef = useRef(null); // Referencia a la tabla, usada para hacer scroll

    // useEffect que se ejecuta cada vez que cambia la vista
    // Si vista es 'formulario', hace scroll hacia el formulario
    // Si vista es 'tabla', hace scroll hacia la tabla
    useEffect(() => {
        if (vista === 'formulario') {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (vista === 'tabla') {
            tablaRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [vista]);

    // Función para hacer scroll hacia la tabla desde el formulario
    const scrollToTabla = () => {
        tablaRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Función para hacer scroll hacia el formulario desde la tabla
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Renderizado del componente
    return (
        <section className="contenedor-carousel"> {/* Contenedor principal del carrusel */}

            {/* Sección con efecto parallax de bienvenida */}
            <section className="parallax-1">
                <div className="parallax-inner">
                    <h1 className="title-img">Bienvenidos a Nuestro Gimnasio</h1>
                </div>
            </section>

            {/* Sección de horarios del gimnasio */}
            <section>
                <HorariosGym />
            </section>

            {/* Sección con efecto parallax antes del formulario */}
            <section className="parallax-2">
                <div className="parallax-inner">
                    <h1 className="title-img">Registrar Turnos</h1>
                </div>
            </section>

            {/* Sección del formulario con referencia para hacer scroll */}
            <section className="form" ref={formRef}>
                <Form
                    agregarSocio={agregarSocio}
                    socioEditado={socioEditado}
                    actualizarSocio={actualizarSocio}
                    modoEdicion={modoEdicion}
                    cancelarEdicion={cancelarEdicion}
                    socios={socios}
                    scrollToTabla={scrollToTabla} // Permite que el formulario haga scroll hacia la tabla
                />
            </section>

            {/* Sección con efecto parallax antes de la tabla */}
            <section className="parallax-3">
                <div className="parallax-inner">
                    <h1 className="title-img">Ver Turnos</h1>
                </div>
            </section>

            {/* Sección de la tabla con referencia para hacer scroll */}
            <section className="table" ref={tablaRef}>
                <PartnersTable
                    socios={socios}
                    eliminarSocio={eliminarSocio}
                    editarSocio={editarSocio}
                    scrollToForm={scrollToForm} // Permite que la tabla haga scroll hacia el formulario
                />
            </section>
        </section>
    );
};

export default Carousel;
