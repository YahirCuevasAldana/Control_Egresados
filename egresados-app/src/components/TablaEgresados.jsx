import Navbar from "../components/Navbar";

function Egresados() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista de Egresados</h2>

        <table className="table">
          <thead>
            <tr>
              <th>No. Control</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>Juan Pérez</td>
              <td>Sistemas</td>
              <td>
                <button className="btn btn-warning btn-sm">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Egresados;