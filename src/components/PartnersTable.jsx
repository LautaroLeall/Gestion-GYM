const PartnersTable = ({ socios, eliminarSocio, editarSocio }) => {
    return (
        <table className="table table-striped mt-4">
            <thead className="table-dark">
                <tr>
                    <th>Nombre y Apellido</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Clase</th>
                    <th>Horario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {socios.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center">No hay turnos cargados.</td>
                    </tr>
                ) : (
                    socios.map((socio, index) => (
                        <tr key={index}>
                            <td>{socio.nombreApellido}</td>
                            <td>{socio.telefono}</td>
                            <td>{socio.email}</td>
                            <td>{socio.clase}</td>
                            <td>{socio.horario}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editarSocio(index)}
                                >
                                    <i className="bi bi-pencil-square"></i> Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarSocio(index)}
                                >
                                    <i className="bi bi-trash"></i> Eliminar
                                </button>

                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default PartnersTable;
