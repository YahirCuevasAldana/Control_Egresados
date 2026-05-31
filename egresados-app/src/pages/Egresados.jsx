import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdEdit, MdDelete, MdPersonAdd } from "react-icons/md";
import { API_URL } from "../config";
import "../styles/egresados.css";

function Badge({ actividad }) {
  const m = {
    "Trabaja":               ["badge badge-trabaja",  "Trabaja"],
    "Estudia y trabaja":     ["badge badge-ambos",    "Estudia y trabaja"],
    "No estudia ni trabaja": ["badge badge-ninguno",  "Sin actividad"],
  };
  const [cls, txt] = m[actividad] ?? ["badge badge-estudia", actividad ?? "—"];
  return <span className={cls}>{txt}</span>;
}

export default function Egresados() {
  const navigate = useNavigate();
  const [lista, setLista]         = useState([]);
  const [busqueda, setBusqueda]   = useState("");
  const [carrera, setCarrera]     = useState("");
  const [cargando, setCargando]   = useState(true);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      setCargando(true);
      const r = await fetch(`${API_URL}/api/egresados`);
      setLista(await r.json());
    } catch { alert("No se pudo conectar con el servidor."); }
    finally   { setCargando(false); }
  };

  const eliminar = async (id, nombre) => {
    if (!confirm(`¿Eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return;
    await fetch(`${API_URL}/api/egresados/${id}`, { method: "DELETE" });
    setLista(p => p.filter(e => e.no_control !== id));
  };

  const carreras = [...new Set(lista.map(e => e.carrera).filter(Boolean))];

  const filtrados = lista.filter(e => {
    const nb = e.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase());
    const cr = !carrera || e.carrera === carrera;
    return nb && cr;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Egresados</div>
          <div className="page-sub">{lista.length} registros en total</div>
        </div>
        <button className="btn-naranja" onClick={() => navigate("/agregar")}>
          <MdPersonAdd style={{ fontSize: 18 }} /> Agregar Egresado
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <div className="search-wrap">
          <MdSearch className="search-icon-pos" />
          <input
            className="search-input"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <select className="search-select" value={carrera} onChange={e => setCarrera(e.target.value)}>
          <option value="">Todas las carreras</option>
          {carreras.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn-borde" onClick={() => { setBusqueda(""); setCarrera(""); }}>
          Limpiar
        </button>
      </div>

      {cargando ? (
        <div className="spinner-centro">
          <div className="spinner-border text-primary" />
          <span>Cargando egresados...</span>
        </div>
      ) : (
        <div className="tabla-wrapper">
          <div className="tabla-info">
            Mostrando <strong>{filtrados.length}</strong> de <strong>{lista.length}</strong> registros
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="egr-table">
              <thead>
                <tr>
                  <th>N. Control</th>
                  <th>Nombre Completo</th>
                  <th>Carrera</th>
                  <th>Generación</th>
                  <th>Teléfono</th>
                  <th>Titulado</th>
                  <th>Actividad</th>
                  <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length > 0 ? filtrados.map(e => (
                  <tr key={e.no_control}>
                    <td><span className="no-control-badge">{e.no_control}</span></td>
                    <td style={{ fontWeight: 500 }}>{e.nombre_completo}</td>
                    <td style={{ fontSize: 12.5 }}>{e.carrera}</td>
                    <td>{e.generacion}</td>
                    <td>{e.telefono}</td>
                    <td>
                      <span className={`badge ${
                        e.titulado === "Si" ? "badge-trabaja"
                        : e.titulado === "En proceso" ? "badge-ambos"
                        : "badge-ninguno"
                      }`}>
                        {e.titulado ?? "—"}
                      </span>
                    </td>
                    <td><Badge actividad={e.actividad_actual} /></td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button className="btn-aviso-sm me-2"
                        onClick={() => navigate(`/editar/${e.no_control}`)}>
                        <MdEdit /> Editar
                      </button>
                      <button className="btn-peligro-sm"
                        onClick={() => eliminar(e.no_control, e.nombre_completo)}>
                        <MdDelete /> Eliminar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8}>
                      <div className="tabla-vacia">
                        <div className="tabla-vacia-ico">🔍</div>
                        <div className="tabla-vacia-txt">No se encontraron egresados con esos criterios</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
