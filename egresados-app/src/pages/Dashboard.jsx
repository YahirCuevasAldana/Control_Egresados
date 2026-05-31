import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import { MdPeople, MdVerified, MdWork, MdWarning } from "react-icons/md";
import { API_URL } from "../config";
import "../styles/dashboard.css";

Chart.register(...registerables);

const COLORES = ["#0a1f44","#f97316","#16a34a","#dc2626","#7c3aed","#0891b2","#d97706","#db2777"];

const LOGO = "https://www.huauchinango.tecnm.mx/wp-content/uploads/2020/08/cropped-Logo_ITSH-300x300.png";

// Altura fija compartida para todas las gráficas
const CHART_HEIGHT = 260;

export default function Dashboard() {
  const navigate  = useNavigate();
  const [data, setData]         = useState([]);
  const [cargando, setCargando] = useState(true);
  const [logoErr, setLogoErr]   = useState(false);

  const rCarrera   = useRef(null); const iCarrera   = useRef(null);
  const rTitulado  = useRef(null); const iTitulado  = useRef(null);
  const rActividad = useRef(null); const iActividad = useRef(null);
  const rMedio     = useRef(null); const iMedio     = useRef(null);
  const rSector    = useRef(null); const iSector    = useRef(null);
  const rNivel     = useRef(null); const iNivel     = useRef(null);
  const rCondicion = useRef(null); const iCondicion = useRef(null);
  const rEstado    = useRef(null); const iEstado    = useRef(null);
  const rPosgrado  = useRef(null); const iPosgrado  = useRef(null);
  const rPerfil    = useRef(null); const iPerfil    = useRef(null);
  const rAntiguedad= useRef(null); const iAntiguedad= useRef(null);
  const rSexo      = useRef(null); const iSexo      = useRef(null);

useEffect(() => {
  fetch(`${API_URL}/api/egresados`)
    .then(r => r.json())
    .then(response => {
      console.log("Respuesta API:", response);

      setData(
        response.success && Array.isArray(response.data)
          ? response.data
          : []
      );

      setCargando(false);
    })
    .catch(error => {
      console.error("Error al cargar egresados:", error);
      setData([]);
      setCargando(false);
    });
}, []);
  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;
    const contar = campo => data.reduce((acc, e) => {
      const v = e[campo] || "Sin datos";
      acc[v] = (acc[v] || 0) + 1; return acc;
    }, {});

    // maintainAspectRatio: false → respeta el alto del contenedor
    const opts = (type, labels, values, extra = {}) => ({
      type,
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: COLORES,
          ...(type === "bar" ? { borderRadius: 6, label: "Egresados" } : { borderWidth: 0 }),
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,   // ← clave para altura uniforme
        plugins: {
          legend: {
            display: type !== "bar",
            position: "bottom",
            labels: { font: { size: 11, family: "Poppins" }, padding: 14, boxWidth: 12 },
          },
        },
        ...(type === "bar" ? {
          scales: {
            x: { ticks: { font: { size: 10, family: "Poppins" } } },
            y: { beginAtZero: true, ticks: { font: { family: "Poppins" } } },
          },
          plugins: { legend: { display: false } },
        } : {}),
        ...extra,
      },
    });

    const porCarrera   = contar("carrera");
    const porTitulado  = contar("titulado");
    const porActividad = contar("actividad_actual");

    iCarrera.current?.destroy();
    iTitulado.current?.destroy();
    iActividad.current?.destroy();

    iCarrera.current   = new Chart(rCarrera.current,   opts("bar",      Object.keys(porCarrera),   Object.values(porCarrera)));
    iTitulado.current  = new Chart(rTitulado.current,  opts("doughnut", Object.keys(porTitulado),  Object.values(porTitulado),  { cutout: "60%" }));
    iActividad.current = new Chart(rActividad.current, opts("pie",      Object.keys(porActividad), Object.values(porActividad)));

    const porMedio      = contar("medio_obtencion");
    const porSector     = contar("sector");
    const porNivel      = contar("nivel_jerarquico");
    const porCondicion  = contar("condicion_trabajo");
    const porEstado     = contar("estado_empresa");
    const porPosgrado   = contar("posgrado");
    const porPerfil     = contar("perfil");
    const porAntiguedad = contar("antiguedad");
    const porSexo       = contar("sexo");

    iMedio.current?.destroy();
    iSector.current?.destroy();
    iNivel.current?.destroy();
    iCondicion.current?.destroy();
    iEstado.current?.destroy();
    iPosgrado.current?.destroy();
    iPerfil.current?.destroy();
    iAntiguedad.current?.destroy();
    iSexo.current?.destroy();

    iMedio.current      = new Chart(rMedio.current,      opts("doughnut", Object.keys(porMedio),      Object.values(porMedio),      { cutout: "60%" }));
    iSector.current     = new Chart(rSector.current,     opts("pie",      Object.keys(porSector),     Object.values(porSector)));
    iNivel.current      = new Chart(rNivel.current,      opts("bar",      Object.keys(porNivel),      Object.values(porNivel)));
    iCondicion.current  = new Chart(rCondicion.current,  opts("doughnut", Object.keys(porCondicion),  Object.values(porCondicion),  { cutout: "60%" }));
    iEstado.current     = new Chart(rEstado.current,     opts("bar",      Object.keys(porEstado),     Object.values(porEstado)));
    iPosgrado.current   = new Chart(rPosgrado.current,   opts("pie",      Object.keys(porPosgrado),   Object.values(porPosgrado)));
    iPerfil.current     = new Chart(rPerfil.current,     opts("doughnut", Object.keys(porPerfil),     Object.values(porPerfil),     { cutout: "60%" }));
    iAntiguedad.current = new Chart(rAntiguedad.current, opts("bar",      Object.keys(porAntiguedad), Object.values(porAntiguedad)));
    iSexo.current       = new Chart(rSexo.current,       opts("pie",      Object.keys(porSexo),       Object.values(porSexo)));

  }, [data]);

 const lista = Array.isArray(data) ? data : [];

const total = lista.length;

const titulados = lista.filter(
  e => e.titulado === "Si"
).length;

const trabajando = lista.filter(
  e => ["Trabaja", "Estudia y trabaja"].includes(e.actividad_actual)
).length;

const sinActiv = lista.filter(
  e => e.actividad_actual === "No estudia ni trabaja"
).length;

  const stats = [
    { label: "Total Egresados", value: total,      color: "#0a1f44", bg: "#e0e9f8", icon: <MdPeople /> },
    { label: "Titulados",        value: titulados,  color: "#16a34a", bg: "#dcfce7", icon: <MdVerified /> },
    { label: "Laborando",        value: trabajando, color: "#f97316", bg: "#fff7ed", icon: <MdWork /> },
    { label: "Sin Actividad",    value: sinActiv,   color: "#dc2626", bg: "#fee2e2", icon: <MdWarning /> },
  ];

  // Wrapper con altura responsive para gráficas
  const CanvasBox = ({ canvasRef }) => (
    <div style={{ position: "relative", width: "100%", height: CHART_HEIGHT }}>
      <canvas ref={canvasRef} />
    </div>
  );

  // Componente logo reutilizable
  const LogoBox = ({ size = 52, radius = 14 }) => (
    <div style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: "#0a1f44",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 14px rgba(10,31,68,.2)",
      flexShrink: 0,
    }}>
      {logoErr
        ? <span style={{ color: "white", fontWeight: 800, fontSize: 12 }}>ITSH</span>
        : <img src={LOGO} alt="ITSH" onError={() => setLogoErr(true)}
               style={{ width: "100%", objectFit: "contain", padding: 4 }} />}
    </div>
  );

  return (
    <>
      {/* Header con logo */}
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)" }}>
          <LogoBox size={52} radius={14} />
          <div>
            <div className="page-title">Panel de Control</div>
            <div className="page-sub">Sistema de Seguimiento de Egresados — ITSH</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map(({ label, value, color, bg, icon }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon" style={{ background: bg, color }}>
              <span>{icon}</span>
            </div>
            <div>
              <div className="stat-info-label">{label}</div>
              <div className="stat-info-value" style={{ color }}>
                {cargando ? "—" : value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="quick-grid">
        {[
          { icon: "👥", titulo: "Ver Egresados",      desc: "Busca, edita o elimina registros", ruta: "/egresados" },
          { icon: "➕", titulo: "Registrar Egresado", desc: "Nuevo registro completo",           ruta: "/agregar"   },
        ].map(({ icon, titulo, desc, ruta }) => (
          <div className="quick-card" key={ruta} onClick={() => navigate(ruta)}>
            <div className="quick-icon">{icon}</div>
            <div>
              <div className="quick-titulo">{titulo}</div>
              <div className="quick-desc">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      {cargando ? (
        <div className="spinner-centro">
          <div className="spinner-border text-primary" />
          <span>Cargando estadísticas...</span>
        </div>
      ) : !data.length ? (
        <div style={{ textAlign: "center", padding: "clamp(30px, 5vw, 50px) 0", color: "#64748b" }}>
          No hay datos. Agrega egresados para ver las estadísticas.
        </div>
      ) : (
        <>
          {/* FILA 1 — Carrera, Titulación, Actividad */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Egresados por Carrera</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rCarrera} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Titulación</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rTitulado} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Actividad Actual</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rActividad} />
              </div>
            </div>
          </div>

          {/* FILA 2 — Empleo, Sector, Nivel */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">¿Cómo obtuvieron su empleo?</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rMedio} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Sector Laboral</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rSector} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Nivel Jerárquico</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rNivel} />
              </div>
            </div>
          </div>

          {/* FILA 3 — Condición, Estado empresa, Posgrado */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Condición de Trabajo</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rCondicion} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Estado donde Trabajan</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rEstado} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Posgrado</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rPosgrado} />
              </div>
            </div>
          </div>

          {/* FILA 4 — Perfil, Antigüedad, Sexo */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Trabajo acorde al Perfil</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rPerfil} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Antigüedad Laboral</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rAntiguedad} />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-header">
                <div className="chart-card-dot" />
                <span className="chart-card-titulo">Distribución por Sexo</span>
              </div>
              <div className="chart-card-body">
                <CanvasBox canvasRef={rSexo} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}