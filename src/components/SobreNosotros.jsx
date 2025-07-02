import React from 'react';
import '../styles/SobreNosotros.css';
import sobreNosotros from '/public/sobre-nosotros.jpg';

const SobreNosotros = () => {
    return (
        <div className="producto-container d-flex align-items-center text-light my-5 mx-5">

            <div className="detalles d-flex flex-column gap-2 rounded-5 p-3">
                <div className="title text-center">
                    <h1 className="title">GONZALO MARTINEZ</h1>
                </div>
                <div className="info">
                    <p>Estudiante de Desarrollo y Calidad de Software en la Universidad del Norte Santo Tomás de Aquino.</p>
                </div>

                <div className="title-aboutMy text-center">
                    <h4 className="title-secondary">SOBRE MÍ</h4>
                </div>
                <div className="aboutMy">
                    <p>
                        Soy una persona proactiva,comprometida y responsable en mis proyectos de vida.
                        <br />
                        Soy capas de desarollar tareas grupales potenciando habilidades individuales.
                        <br />
                        Busco adquirir experencia y formacion en un ambito laboral de
                        respeto y cooperacion.
                        <br />
                        Actualmente estoy en constante capacitacion y formacion en la toma de decisiones
                        basadas en datos para la identificacion de oportunidades de mejora,tendencia y prediccion de actos futuros que
                        puedan ayudar e impulsar el crecimiento y el desaollo en las diversas areas de la empresa.
                    </p>
                </div>

                <div className="title-redes text-center">
                    <h4 className="title-secondary">REDES SOCIALES</h4>
                </div>
                <div className="redes d-flex flex-wrap justify-content-center gap-5">
                    <a href="https://www.linkedin.com/in/gonzalo-martinez-8576b7329/" className="text-center" target="_blank">
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="https://github.com/GonzaloMartinezz" className="text-center" target="_blank">
                        <i className="bi bi-github"></i>
                    </a>
                    <a href="https://www.instagram.com/gonchi_martinezz/" className="text-center" target="_blank">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="galeria">
                <div className="imagen-principal">
                    <img src={sobreNosotros} alt="imagen-logo" />
                </div>
            </div>

            <div className="detalles d-flex flex-column gap-2 rounded-5 p-3">
                <div className="title text-center">
                    <h1 className="title">LAUTARO LEAL</h1>
                </div>
                <div className="info">
                    <p>Estudiante de Desarrollo y Calidad de Software en la Universidad del Norte Santo Tomás de Aquino.</p>
                </div>

                <div className="title-aboutMy text-center">
                    <h4 className="title-secondary">SOBRE MÍ</h4>
                </div>
                <div className="aboutMy">
                    <p>
                        Programador trainee de 20 años, apasionado por la tecnología y el aprendizaje constante.
                        <br />
                        Estudiante de Desarrollo y Calidad de Software en la UNSTA.
                        <br />
                        Me defino como un emprendedor en formación, con interés en proyectos reales que impliquen trabajo en equipo, desafíos técnicos y mejora continua.
                        <br />
                        Con experiencia en metodologías ágiles como SCRUM, destaco por mi enfoque analítico, comunicación efectiva y compromiso con la calidad.
                    </p>
                </div>

                <div className="title-redes text-center">
                    <h4 className="title-secondary">REDES SOCIALES</h4>
                </div>
                <div className="redes d-flex flex-wrap justify-content-center gap-5">
                    <a href="https://www.linkedin.com/in/lauldp/" className="text-center" target="_blank">
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="https://github.com/LautaroLeall" className="text-center" target="_blank">
                        <i className="bi bi-github"></i>
                    </a>
                    <a href="https://www.instagram.com/lautaro_leall/" className="text-center" target="_blank">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default SobreNosotros;