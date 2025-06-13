import React from 'react'
import '/Horariosgym.css'
const Horariosgym = () => {
  return (
    <>
       <div className="containers-text">
            <div className="mission-section">
                <h2>NUESTRA MISION</h2>
                <p>Ofrecer un servicio de calidad de herramientas para el bien estar y el cuidado personal.</p>
    
                <div className="services-grid">
                    <div className="service-item">
                        <h3>MFRAGANCIAS EXCLUSIVAS</h3>
                        <p>Descubre nuestras fragancias exclusivas y únicas, creadas con los ingredientes más selectos y de alta calidad.</p>
                        <ul>
                          <li>Ingredientes naturales y orgánicos</li>
                          <li>Concentración de fragancia del 20%</li>
                          <li>Botellas de vidrio reciclado</li>
                        </ul>
                      </div>
                    <div className="service-item">
                        <h3>PERFUMES PERSONALIZADOS </h3>
                        <p>Crea tu propio perfume personalizado con nuestra herramienta de creación de fragancias en línea.
                          Elige entre más de 100 ingredientes y crea una fragancia única que se adapte a tus gustos y preferencias.
                        </p>
                    </div>
                    <div className="service-item">
                        <h3>REGALOS PERFUMADOS</h3>
                        <p>Encuentra el regalo perfecto para tus seres queridos con nuestras fragancias y productos perfumados.</p>
                    </div>
                    <div className="service-item">
                        <h3>ATENCIÓN AL CLIENTE</h3>
                        <p>Nuestro equipo de atención al cliente está aquí para ayudarte con cualquier pregunta o inquietud que tengas.
                          Contáctanos por teléfono, correo electrónico o chat en línea.
                        </p>
                    
                    </div>
                </div>
            </div>
    
            <div className="attention-section">
                <h2>HORARIOS DE ATENCIÓN</h2>
                <p className="phone">Tel: +54 9 11 2345-6789</p>
                <div className="schedule-item">
                    <span className="schedule-day">LUNES </span>
                    <span>07:00 - 21:00</span>
                </div>
                <div className="schedule-item">
                  <span className="schedule-day">MARTES</span>
                  <span>07:00 - 21:00</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-day">MIERCOLES</span>
                <span>07:00 - 21:00</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-day">JUEVES</span>
              <span>07:00 - 21:00</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-day">VIERNES</span>
            <span>07:00 - 21:00</span>
        </div>
                <div className="schedule-item">
                    <span className="schedule-day">SÁBADOS</span>
                    <span>09:00 - 16:00</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Horariosgym