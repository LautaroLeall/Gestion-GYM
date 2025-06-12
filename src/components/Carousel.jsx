function Carousel() {
    return (
        <div id="carouselGym" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselGym" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselGym" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselGym" data-bs-slide-to="2" aria-label="Slide 3" />
            </div>

            <div className="carousel-inner rounded shadow-sm">
                <div className="carousel-item active">
                    <img src="assets/gimnasio.jpg"
                        className="d-block w-100" alt="Gimnasio 1" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1579758629936-03608cc809bb?auto=format&fit=crop&w=1400&q=80"
                        className="d-block w-100" alt="Gimnasio 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1594737625785-8c046cca0839?auto=format&fit=crop&w=1400&q=80"
                        className="d-block w-100" alt="Gimnasio 3" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselGym" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselGym" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}

export default Carousel;
