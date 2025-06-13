import React from 'react'
import Horariosgym from './Horariosgym'
const Carousel = () => {
  return (
    <>
    <section className='contenedor-carousel'>
        <section className="parallax-1">
            <div className="parallax-inner">
                <h1>Bienvenidos a Nuestro Gimnasio</h1>
            </div>
        </section>
        
      <Horariosgym />
        <section className="parallax-2">
            <div className="parallax-inner">
                <h1>Registar Turnos</h1>
            </div>
        </section>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minima fuga debitis quasi eius aliquid
            sapiente? Cumque blanditiis quibusdam, ex totam aliquam provident alias culpa, sit illo, eum doloribus
            doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit voluptatum
            aperiam pariatur numquam praesentium recusandae, ipsa at iusto eveniet, distinctio sunt dolore nemo veniam
            maiores vitae deserunt cum ducimus.</p>
        <section className="parallax-3">
            <div className="parallax-inner">
                <h1>Ver Turnos</h1>
            </div>
        </section>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minima fuga debitis quasi eius aliquid
            sapiente? Cumque blanditiis quibusdam, ex totam aliquam provident alias culpa, sit illo, eum doloribus
            doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit voluptatum
            aperiam pariatur numquam praesentium recusandae, ipsa at iusto eveniet, distinctio sunt dolore nemo veniam
            maiores vitae deserunt cum ducimus.</p>
    </section>
    </>
  )
}

export default Carousel
