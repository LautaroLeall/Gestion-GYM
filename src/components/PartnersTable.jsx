import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const PartnersTable = ({ socios, eliminarSocio, editarSocio }) => {

    const confirmarEliminacion = (index) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Este turno se eliminará permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarSocio(index);
                Swal.fire(
                    'Eliminado',
                    'El turno fue eliminado exitosamente.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="d-flex flex-column align-items-center bg-secondary">
            <table className="table table-striped  bg-dark p-4 rounded bg-light w-75 my-5">
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
                                        onClick={() => confirmarEliminacion(index)}
                                    >
                                        <i className="bi bi-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PartnersTable;

