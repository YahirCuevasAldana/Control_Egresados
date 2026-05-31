import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdSave } from "react-icons/md";
import { API_URL } from "../config";
import "../styles/formulario.css";

const INIT = {
  nombre_completo:"", fecha_nacimiento:"", curp:"",
  estado_civil:"Seleccionar", sexo:"Seleccionar",
  colonia:"", codigo_postal:"", ciudad:"", estado:"", municipio:"",
  telefono_casa:"", telefono:"", telefono_fam1:"", telefono_fam2:"",
  correo_personal:"",
  no_control:"", carrera:"Seleccionar", generacion:"",
  mes_egreso:"", anio_egreso:"", // CORREGIDO: "anio_egreso" con n
  titulado:"Seleccionar", fecha_titulacion:"", posgrado:"Seleccionar",
  actividad_actual:"Seleccionar",
  nombre_empresa:"", direccion_empresa:"", estado_empresa:"",
  municipio_empresa:"", cp_empresa:"", nombre_jefe:"",
  tel_empresa:"", correo_empresa:"", puesto_jefe:"",
  puesto:"", antiguedad:"Seleccionar", condicion_trabajo:"Seleccionar",
  sector:"Seleccionar", institucion:"Seleccionar", perfil:"Seleccionar",
  nivel_jerarquico:"Seleccionar", medio_obtencion:"Seleccionar", salario:"",
  alumnos_actualizados:"Seleccionar",
};

const SEL = ["estado_civil","sexo","carrera","titulado","posgrado","actividad_actual",
             "antiguedad","condicion_trabajo","sector","institucion","perfil",
             "nivel_jerarquico","medio_obtencion","alumnos_actualizados"];

const PASOS = ["Personal y\nDomicilio","Contacto y\nAcadémico","Situación\nActual","Datos\nLaborales"];
const OPCIONALES = new Set(["cp_empresa","fecha_titulacion","codigo_postal","puesto_jefe"]);

// ── COMPONENTES EXTRAÍDOS FUERA DEL PADRE PARA EVITAR PÉRDIDA DE FOCO ──
const Input = ({ label, name, type = "text", disabled = false, req = true, form, set, errores }) => (
  <div className="campo">
    <label>{label}{req && !disabled && <span className="req">*</span>}</label>
    <input 
      type={type} 
      name={name} 
      value={form[name] ?? ""} 
      onChange={set}
      className={errores[name] ? "err" : ""} 
      disabled={disabled} 
    />
    {errores[name] && <div className="campo-error">Este campo es obligatorio</div>}
  </div>
);

const Select = ({ label, name, opts, req = true, form, set, errores }) => (
  <div className="campo">
    <label>{label}{req && <span className="req">*</span>}</label>
    <select 
      name={name} 
      value={form[name]} 
      onChange={set} 
      className={errores[name] ? "err" : ""}
    >
      <option value="Seleccionar">Seleccionar</option>
      {opts.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {errores[name] && <div className="campo-error">Selecciona una opción</div>}
  </div>
);

export default function EditarEgresado() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const [form, setForm]         = useState(INIT);
  const [errores, setErrores]   = useState({});
  const [paso, setPaso]         = useState(0);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast]       = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/egresados/${id}`)
      .then(r => r.json())
      .then(response => {
        console.log("[API Response] Egresado:", response);
        console.log("[Data Type]", typeof response);
        
        // Manejar estructura de respuesta: {success, data: {...}} o objeto directo
        const data = response.data && typeof response.data === 'object' && !Array.isArray(response.data)
          ? response.data
          : typeof response === 'object' && !Array.isArray(response)
            ? response
            : INIT;
        
        // Asegurar que todos los campos de INIT existan en data
        const norm = Object.keys(INIT).reduce((acc, key) => {
          acc[key] = data[key] !== null && data[key] !== undefined ? data[key] : INIT[key];
          return acc;
        }, {});
        
        // Establecer "Seleccionar" para campos de select si están vacíos
        SEL.forEach(k => { 
          if (!norm[k] || norm[k] === "") norm[k] = "Seleccionar"; 
        });
        
        // Convertir fechas ISO a formato YYYY-MM-DD
        if (norm.fecha_nacimiento && typeof norm.fecha_nacimiento === 'string') {
          norm.fecha_nacimiento = norm.fecha_nacimiento.split("T")[0];
        }
        if (norm.fecha_titulacion && typeof norm.fecha_titulacion === 'string') {
          norm.fecha_titulacion = norm.fecha_titulacion.split("T")[0];
        }
        
        console.log("[Normalized Data]", norm);
        setForm(norm);
        setCargando(false);
      })
      .catch(err => { 
        console.error("[Error] Fetch fallido:", err);
        alert("No se pudo cargar los datos del egresado."); 
        navigate("/egresados"); 
      });
  }, [id, navigate]);

  const trabajaActualmente =
    form.actividad_actual === "Trabaja" || form.actividad_actual === "Estudia y trabaja";

  const set = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (value && value !== "Seleccionar")
      setErrores(p => ({ ...p, [name]: false }));
  };

  const requeridosPorPaso = [
    ["nombre_completo","fecha_nacimiento","curp","estado_civil","sexo","colonia","ciudad","estado","municipio"],
    ["telefono_casa","telefono","telefono_fam1","telefono_fam2","correo_personal",
     "no_control","carrera","generacion","mes_egreso","anio_egreso","titulado","posgrado"], // CORREGIDO: "anio_egreso" con n
    ["actividad_actual"],
    trabajaActualmente
      ? ["nombre_empresa","direccion_empresa","estado_empresa","municipio_empresa",
         "nombre_jefe","tel_empresa","correo_empresa","puesto",
         "antiguedad","condicion_trabajo","sector","institucion","perfil",
         "nivel_jerarquico","medio_obtencion","salario","alumnos_actualizados"]
      : ["alumnos_actualizados"],
  ];

  const validarPaso = () => {
    const nuevos = {};
    let hay = false;
    requeridosPorPaso[paso].forEach(k => {
      if (OPCIONALES.has(k)) return;
      const v = String(form[k] ?? "").trim();
      if (!v || v === "Seleccionar") { nuevos[k] = true; hay = true; }
    });
    setErrores(p => ({ ...p, ...nuevos }));
    return !hay;
  };

  const siguiente = () => { if (validarPaso() && paso < 3) setPaso(p => p + 1); };
  const anterior   = () => setPaso(p => p - 1);

  const guardar = async () => {
    if (!validarPaso()) return;
    try {
      const res = await fetch(`${API_URL}/api/egresados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("[API Response] Actualizar egresado:", data);
      
      if (res.ok) {
        setToast("✅ Egresado actualizado");
        setTimeout(() => navigate("/egresados"), 1500);
      } else {
        setToast("❌ Error: " + (data.message || "Error desconocido"));
        setTimeout(() => setToast(""), 3000);
      }
    } catch (error) {
      console.error("[Error] Actualizar fallido:", error);
      setToast("❌ Sin conexión al servidor");
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (cargando) return (
    <div className="spinner-centro">
      <div className="spinner-border text-primary" />
      <span>Cargando datos del egresado...</span>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Editar Egresado</div>
          <div className="page-sub">N. Control: {id} — Paso {paso + 1} de 4</div>
        </div>
        <button className="btn-borde" onClick={() => navigate("/egresados")}>← Volver</button>
      </div>

      <div className="form-shell">
        <div className="pasos-bar">
          {PASOS.map((label, i) => (
            <div key={i} className={`paso${i===paso?" activo":""}${i<paso?" listo":""}`}
                 onClick={() => i < paso && setPaso(i)}>
              <div className="paso-num">{i < paso ? "✓" : i + 1}</div>
              <div className="paso-label" style={{ whiteSpace:"pre" }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="progreso-bar">
          <div className="progreso-fill" style={{ width:`${((paso+1)/4)*100}%` }} />
        </div>

        <div className="form-body">

          {paso === 0 && (
            <>
              <div className="seccion-titulo"><span className="seccion-icono">👤</span> Datos Personales</div>
              <div className="row g-3">
                <div className="col-md-6"><Input label="Nombre completo" name="nombre_completo" form={form} set={set} errores={errores} /></div>
                <div className="col-md-6"><Input label="Fecha de nacimiento" name="fecha_nacimiento" type="date" form={form} set={set} errores={errores} /></div>
                <div className="col-md-6"><Input label="CURP" name="curp" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Estado civil" name="estado_civil" opts={["Soltero","Casado","Divorciado","Viudo","Unión libre"]} form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Sexo" name="sexo" opts={["Masculino","Femenino"]} form={form} set={set} errores={errores} /></div>
              </div>
              <div className="seccion-titulo mt-4"><span className="seccion-icono">🏠</span> Domicilio</div>
              <div className="row g-3">
                <div className="col-md-5"><Input label="Colonia" name="colonia" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Ciudad" name="ciudad" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Input label="Código Postal" name="codigo_postal" req={false} form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Estado" name="estado" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Municipio" name="municipio" form={form} set={set} errores={errores} /></div>
              </div>
            </>
          )}

          {paso === 1 && (
            <>
              <div className="seccion-titulo"><span className="seccion-icono">📞</span> Contacto</div>
              <div className="row g-3">
                <div className="col-md-4"><Input label="Teléfono de casa" name="telefono_casa" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono personal" name="telefono" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Correo electrónico" name="correo_personal" type="email" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono familiar 1" name="telefono_fam1" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono familiar 2" name="telefono_fam2" form={form} set={set} errores={errores} /></div>
              </div>
              <div className="seccion-titulo mt-4"><span className="seccion-icono">🎓</span> Información Académica</div>
              <div className="row g-3">
                <div className="col-md-3"><Input label="N. Control" name="no_control" disabled form={form} set={set} errores={errores} /></div>
                <div className="col-md-5"><Select label="Carrera" name="carrera" opts={["Ingeniería en Sistemas Computacionales","Ingeniería Eléctrica","Ingeniería en Administración","Ingeniería Industrial","Ingeniería Informática","Ingeniería Mecatrónica"]} form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Generación" name="generacion" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Mes de egreso" name="mes_egreso" opts={["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]} form={form} set={set} errores={errores} /></div>
                
                {/* CORREGIDO: El name ahora apunta a anio_egreso con n */}
                <div className="col-md-3"><Input label="Año de egreso" name="anio_egreso" type="number" form={form} set={set} errores={errores} /></div>
                
                <div className="col-md-3"><Select label="Titulado" name="titulado" opts={["Si","No","En proceso"]} form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Input label="Fecha titulación" name="fecha_titulacion" type="date" req={false} form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Select label="Posgrado" name="posgrado" opts={["Ninguno","Especialidad","Diplomado","Maestría","Doctorado"]} form={form} set={set} errores={errores} /></div>
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <div className="seccion-titulo"><span className="seccion-icono">💼</span> Situación Actual</div>
              <div className="row g-3">
                <div className="col-md-6"><Select label="Actividad actual" name="actividad_actual" opts={["Trabaja","No trabaja","Estudia y trabaja","No estudia ni trabaja"]} form={form} set={set} errores={errores} /></div>
              </div>
            </>
          )}

          {paso === 3 && (
            <>
              {trabajaActualmente && (
                <>
                  <div className="seccion-titulo"><span className="seccion-icono">🏢</span> Información Empresarial</div>
                  <div className="row g-3">
                    <div className="col-md-6"><Input label="Nombre empresa / institución" name="nombre_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-6"><Input label="Dirección (calle)" name="direccion_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Estado" name="estado_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Municipio" name="municipio_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="CP empresa" name="cp_empresa" req={false} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Nombre del jefe inmediato" name="nombre_jefe" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Teléfono empresa" name="tel_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Correo empresa (RH)" name="correo_empresa" type="email" form={form} set={set} errores={errores} /></div>
                  </div>
                  <div className="seccion-titulo mt-4"><span className="seccion-icono">📊</span> Información Laboral</div>
                  <div className="row g-3">
                    <div className="col-md-4"><Input label="Puesto / Actividad" name="puesto" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Ingreso / Salario" name="salario" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Antigüedad" name="antiguedad" opts={["Menos de 1 año","1 año","2 años","3 años","Más de 3 años","Operativo"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Nivel jerárquico" name="nivel_jerarquico" opts={["Técnico","Administrativo","Supervisor","Jefe de área","Funcionario","Directivo","Empresario"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Condición de trabajo" name="condicion_trabajo" opts={["Base","Eventual","Contrato","Otro"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Sector" name="sector" opts={["Educativo","Primario","Secundario","Terciario"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Institución" name="institucion" opts={["Público","Privado","Social"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Perfil acorde a carrera" name="perfil" opts={["Si","No","Parcial"]} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Select label="Trabajo obtenido de" name="medio_obtencion" opts={["Bolsa de trabajo ITSH","Contactos personales","Residencia","Otro"]} form={form} set={set} errores={errores} /></div>
                  </div>
                </>
              )}
              <div className="seccion-titulo mt-4"><span className="seccion-icono">🔄</span> Estado de Actualización</div>
              <div className="row g-3">
                <div className="col-md-6">
                  <Select label="Estado del alumno" name="alumnos_actualizados"
                    opts={["Contactado laborando","Actualizado","No contactado ni actualizado"]} form={form} set={set} errores={errores} />
                </div>
              </div>
            </>
          )}

        </div>

        <div className="form-nav">
          <div className="form-nav-info">Paso {paso + 1} de 4</div>
          <div style={{ display:"flex", gap:10 }}>
            {paso > 0 && (
              <button className="btn-borde" onClick={anterior}><MdArrowBack /> Anterior</button>
            )}
            {paso < 3
              ? <button className="btn-naranja" onClick={siguiente}>Siguiente <MdArrowForward /></button>
              : <button className="btn-azul" onClick={guardar}><MdSave /> Guardar Cambios</button>
            }
          </div>
        </div>
      </div>

      {toast && <div className="toast-ok">{toast}</div>}
    </>
  );
}