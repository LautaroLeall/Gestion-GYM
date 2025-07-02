import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/PartnersTable.css';

const PartnersTable = ({ socios, eliminarSocio, editarSocio, scrollToForm }) => {

    const confirmarEliminacion = (id) => {
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
                eliminarSocio(id);
                Swal.fire('Eliminado', 'El turno fue eliminado exitosamente.', 'success');
            }
        });
    };

    // Función para editar y hacer scroll al formulario
    const handleEditar = (id) => {
        editarSocio(id);
        scrollToForm();  // Scroll suave al formulario
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <table className="table table-dark p-4 rounded w-75 my-5 border border-dark align-middle text-center">
                <thead>
                    <tr className="border">
                        <th className="border">Nombre y Apellido</th>
                        <th className="border">Teléfono</th>
                        <th className="border">Email</th>
                        <th className="border">Clase</th>
                        <th className="border">Horario</th>
                        <th className="border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {socios.length === 0 ? (
                        <tr className="border">
                            <td colSpan="7">No hay turnos cargados.</td>
                        </tr>
                    ) : (
                        socios.map((socio) => (
                            <tr className="border" key={socio.id}>
                                <td className="border">{socio.nombreApellido}</td>
                                <td className="border">{socio.telefono}</td>
                                <td className="border">{socio.email}</td>
                                <td className="border">{socio.clase}</td>
                                <td className="border">{socio.horario}</td>
                                <td className="border">
                                    {/* Usamos la función handleEditar para editar y hacer scroll */}
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(socio.id)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => confirmarEliminacion(socio.id)}>
                                        Eliminar
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
