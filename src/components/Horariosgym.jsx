import '../styles/HorariosGym.css';

const HorariosGym = () => {
  return (
    <>
      <div className="containers-text bg-dark">
        <div className="mission-section">
          <h2 className="mision-title">NUESTRA MISION</h2>
          <p className="text-light">
            Ofrecer un espacio integral para el bienestar físico y emocional, brindando herramientas, clases y acompañamiento personalizado que promuevan un estilo de vida saludable, activo y equilibrado.
          </p>
          <div className="services-grid">
            <div className="service-item">
              <h3>MUSCULACION</h3>
              <p className="text-light">
                Trabajamos fuerza, resistencia y tonificación muscular con rutinas personalizadas y acompañamiento profesional. Ideal para quienes buscan mejorar su composición corporal y rendimiento físico.
              </p>
            </div>
            <div className="service-item">
              <h3>CROSSFIT</h3>
              <p className="text-light">
                Entrenamientos funcionales de alta intensidad, diseñados para mejorar la fuerza, velocidad, agilidad y capacidad cardiovascular. ¡Superá tus límites en comunidad!
              </p>
            </div>
            <div className="service-item">
              <h3>ZUMBA</h3>
              <p className="text-light">
                Clases llenas de ritmo y energía para quemar calorías mientras te divertís. Ideal para mejorar la coordinación, el ánimo y la resistencia cardiovascular.
              </p>
            </div>
            <div className="service-item">
              <h3>FUNCIONAL</h3>
              <p className="text-light">
                Entrenamiento dinámico que imita movimientos de la vida real para mejorar fuerza, equilibrio, coordinación y postura. ¡Perfecto para todos los niveles!quid.
              </p>
            </div>
          </div>
        </div>

        <div className="attention-section">
          <h2 className="horarios-title">HORARIOS DE ATENCIÓN</h2>
          <div className="schedule-item">
            <span className="schedule-day">LUNES</span>
            <span>08:00 - 21:00</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-day">MARTES</span>
            <span>08:00 - 21:00</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-day">MIERCOLES</span>
            <span>08:00 - 21:00</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-day">JUEVES</span>
            <span>08:00 - 21:00</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-day">VIERNES</span>
            <span>08:00 - 21:00</span>
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

export default HorariosGym