import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdSave, MdPerson, MdHome, MdPhone, MdSchool, MdWork, MdBusiness, MdAssignment, MdRefresh } from "react-icons/md";
import { API_URL } from "../config";
import "../styles/formulario.css";

const INIT = {
  // Personal
  nombre_completo:"", fecha_nacimiento:"", curp:"",
  estado_civil:"Seleccionar", sexo:"Seleccionar",
  // Domicilio
  colonia:"", codigo_postal:"", ciudad:"", estado:"", municipio:"",
  // Contacto
  telefono_casa:"", telefono:"", telefono_fam1:"", telefono_fam2:"",
  correo_personal:"",
  // Académico
  no_control:"", carrera:"Seleccionar", generacion:"",
  mes_egreso:"", año_egreso:"",
  titulado:"Seleccionar", fecha_titulacion:"", posgrado:"Seleccionar",
  // Situación
  actividad_actual:"Seleccionar",
  // Empresa
  nombre_empresa:"", direccion_empresa:"", estado_empresa:"",
  municipio_empresa:"", cp_empresa:"", nombre_jefe:"",
  tel_empresa:"", correo_empresa:"", puesto_jefe:"",
  // Laboral
  puesto:"", antiguedad:"Seleccionar", condicion_trabajo:"Seleccionar",
  sector:"Seleccionar", institucion:"Seleccionar", perfil:"Seleccionar",
  nivel_jerarquico:"Seleccionar", medio_obtencion:"Seleccionar", salario:"",
  alumnos_actualizados:"Seleccionar",
};

const PASOS = ["Personal y\nDomicilio","Contacto y\nAcadémico","Situación\nActual","Datos\nLaborales"];

const OPCIONALES = new Set(["cp_empresa","fecha_titulacion","codigo_postal","puesto_jefe"]);

// ── COMPONENTES EXTRAÍDOS FUERA DEL PADRE PARA EVITAR PÉRDIDA DE FOCO ──
const Input = ({ label, name, type = "text", req = true, form, set, errores, ...rest }) => (
  <div className="campo">
    <label>{label}{req && <span className="req">*</span>}</label>
    <input 
      type={type} 
      name={name} 
      value={form[name]} 
      onChange={set}
      className={errores[name] ? "err" : ""} 
      {...rest} 
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


export default function AgregarEgresado() {
  const navigate = useNavigate();
  const [form, setForm]       = useState(INIT);
  const [errores, setErrores] = useState({});
  const [paso, setPaso]       = useState(0);
  const [toast, setToast]     = useState("");

  const trabajaActualmente =
    form.actividad_actual === "Trabaja" || form.actividad_actual === "Estudia y trabaja";

  const set = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (value && value !== "Seleccionar")
      setErrores(p => ({ ...p, [name]: false }));
  };

  // Campos requeridos por paso
  const requeridosPorPaso = [
    // Paso 0 — Personal y domicilio
    ["nombre_completo","fecha_nacimiento","curp","estado_civil","sexo","colonia","ciudad","estado","municipio"],
    // Paso 1 — Contacto y académico
    ["telefono_casa","telefono","telefono_fam1","telefono_fam2","correo_personal",
     "no_control","carrera","generacion","mes_egreso","año_egreso","titulado","posgrado"],
    // Paso 2 — Situación actual
    ["actividad_actual"],
    // Paso 3 — Laboral (solo si trabaja)
    trabajaActualmente
      ? ["nombre_empresa","direccion_empresa","estado_empresa","municipio_empresa",
         "nombre_jefe","tel_empresa","correo_empresa","puesto",
         "antiguedad","condicion_trabajo","sector","institucion","perfil",
         "nivel_jerarquico","medio_obtencion","salario","alumnos_actualizados"]
      : ["alumnos_actualizados"],
  ];

  const validarPaso = () => {
    const campos = requeridosPorPaso[paso];
    const nuevos = {};
    let hay = false;
    campos.forEach(k => {
      if (OPCIONALES.has(k)) return;
      const v = String(form[k] ?? "").trim();
      if (!v || v === "Seleccionar") { nuevos[k] = true; hay = true; }
    });
    setErrores(p => ({ ...p, ...nuevos }));
    return !hay;
  };

  const siguiente = () => {
    if (!validarPaso()) return;
    if (paso < 3) setPaso(p => p + 1);
  };

  const anterior = () => setPaso(p => p - 1);

  const guardar = async () => {
    if (!validarPaso()) return;
    try {
      const res = await fetch(`${API_URL}/api/egresados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("[API Response] Crear egresado:", data);
      
      if (res.ok) {
        setToast("Egresado guardado con éxito");
        setTimeout(() => navigate("/egresados"), 1500);
      } else {
        setToast("Error: " + (data.message || "Error desconocido"));
        setTimeout(() => setToast(""), 3000);
      }
    } catch (error) {
      console.error("[Error] Guardar fallido:", error);
      setToast("No se pudo conectar con el servidor");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const pct = ((paso + 1) / 4) * 100;

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Registrar Egresado</div>
          <div className="page-sub">Paso {paso + 1} de 4 — {PASOS[paso].replace("\n"," ")}</div>
        </div>
        <button className="btn-borde" onClick={() => navigate("/egresados")}>
          ← Volver
        </button>
      </div>

      <div className="form-shell">
        {/* Barra de pasos */}
        <div className="pasos-bar">
          {PASOS.map((label, i) => (
            <div key={i} className={`paso${i === paso ? " activo" : ""}${i < paso ? " listo" : ""}`}
                 onClick={() => i < paso && setPaso(i)}>
              <div className="paso-num">{i < paso ? "✔" : i + 1}</div>
              <div className="paso-label" style={{ whiteSpace: "pre" }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="progreso-bar">
          <div className="progreso-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="form-body">

          {/* ── PASO 0: Personal y Domicilio ── */}
          {paso === 0 && (
            <div key="paso-0">
              <div className="seccion-titulo"><span className="seccion-icono"><MdPerson /></span> Datos Personales</div>
              <div className="row g-3">
                <div className="col-md-6"><Input label="Nombre completo" name="nombre_completo" form={form} set={set} errores={errores} /></div>
                <div className="col-md-6"><Input label="Fecha de nacimiento" name="fecha_nacimiento" type="date" form={form} set={set} errores={errores} /></div>
                <div className="col-md-6"><Input label="CURP" name="curp" style={{ textTransform:"uppercase" }} form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Estado civil" name="estado_civil" opts={["Soltero","Casado","Divorciado","Viudo","Unión libre"]} form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Sexo" name="sexo" opts={["Masculino","Femenino"]} form={form} set={set} errores={errores} /></div>
              </div>

              <div className="seccion-titulo mt-4"><span className="seccion-icono"><MdHome /></span> Domicilio</div>
              <div className="row g-3">
                <div className="col-md-5"><Input label="Colonia" name="colonia" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Ciudad" name="ciudad" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Input label="Código Postal" name="codigo_postal" req={false} form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Estado" name="estado" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Municipio" name="municipio" form={form} set={set} errores={errores} /></div>
              </div>
            </div>
          )}

          {/* ── PASO 1: Contacto y Académico ── */}
          {paso === 1 && (
            <div key="paso-1">
              <div className="seccion-titulo"><span className="seccion-icono"><MdPhone /></span> Contacto</div>
              <div className="row g-3">
                <div className="col-md-4"><Input label="Teléfono de casa" name="telefono_casa" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono personal" name="telefono" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Correo electrónico" name="correo_personal" type="email" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono familiar 1 (mamá/papá/hermano)" name="telefono_fam1" form={form} set={set} errores={errores} /></div>
                <div className="col-md-4"><Input label="Teléfono familiar 2" name="telefono_fam2" form={form} set={set} errores={errores} /></div>
              </div>

              <div className="seccion-titulo mt-4"><span className="seccion-icono"><MdSchool /></span> Información Académica</div>
              <div className="row g-3">
                <div className="col-md-3"><Input label="N. Control" name="no_control" form={form} set={set} errores={errores} /></div>
                <div className="col-md-5">
                  <Select label="Carrera" name="carrera" opts={[
                    "Ingeniería en Sistemas Computacionales",
                    "Ingeniería Eléctrica","Ingeniería en Administración",
                    "Ingeniería Industrial","Ingeniería Informática","Ingeniería Mecatrónica"
                  ]} form={form} set={set} errores={errores} />
                </div>
                <div className="col-md-4"><Input label="Generación" name="generacion" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3">
                  <Select label="Mes de egreso" name="mes_egreso" opts={[
                    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
                    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                  ]} form={form} set={set} errores={errores} />
                </div>
                <div className="col-md-3"><Input label="Año de egreso" name="año_egreso" type="number" form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Select label="Titulado" name="titulado" opts={["Si","No","En proceso"]} form={form} set={set} errores={errores} /></div>
                <div className="col-md-3"><Input label="Fecha de titulación" name="fecha_titulacion" type="date" req={false} form={form} set={set} errores={errores} /></div>
                <div className="col-md-4">
                  <Select label="Posgrado" name="posgrado" opts={["Ninguno","Especialidad","Diplomado","Maestría","Doctorado"]} form={form} set={set} errores={errores} />
                </div>
              </div>
            </div>
          )}

          {/* ── PASO 2: Situación Actual ── */}
          {paso === 2 && (
            <div key="paso-2">
              <div className="seccion-titulo"><span className="seccion-icono"><MdWork /></span> Situación Actual</div>
              <div className="row g-3">
                <div className="col-md-6">
                  <Select label="Actividad actual" name="actividad_actual"
                    opts={["Trabaja","No trabaja","Estudia y trabaja","No estudia ni trabaja"]} form={form} set={set} errores={errores} />
                </div>
              </div>

              {!trabajaActualmente && (
                <div style={{ marginTop: 24, padding: "20px", background: "#f0f4fa",
                  borderRadius: 10, color: "#64748b", fontSize: 13 }}>
                  Si el egresado trabaja, en el siguiente paso podrás ingresar los datos de su empresa.
                </div>
              )}

              {trabajaActualmente && (
                <div style={{ marginTop: 16, padding: "14px 18px", background: "#dcfce7",
                  borderRadius: 10, color: "#15803d", fontSize: 13, fontWeight: 500 }}>
                  El siguiente paso te pedirá los datos de la empresa y la información laboral.
                </div>
              )}
            </div>
          )}

          {/* ── PASO 3: Datos Laborales ── */}
          {paso === 3 && (
            <div key="paso-3">
              {trabajaActualmente && (
                <>
                  <div className="seccion-titulo"><span className="seccion-icono"><MdBusiness /></span> Información Empresarial</div>
                  <div className="row g-3">
                    <div className="col-md-6"><Input label="Nombre de la empresa / institución" name="nombre_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-6"><Input label="Dirección (calle)" name="direccion_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Estado" name="estado_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Municipio" name="municipio_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="CP empresa" name="cp_empresa" req={false} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Nombre del jefe inmediato" name="nombre_jefe" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Puesto del jefe" name="puesto_jefe" req={false} form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Teléfono empresa (RH/ext.)" name="tel_empresa" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-6"><Input label="Correo empresa (Recursos Humanos)" name="correo_empresa" type="email" form={form} set={set} errores={errores} /></div>
                  </div>

                  <div className="seccion-titulo mt-4"><span className="seccion-icono"><MdAssignment /></span> Información Laboral</div>
                  <div className="row g-3">
                    <div className="col-md-4"><Input label="Puesto / Actividad del egresado" name="puesto" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4"><Input label="Ingreso / Salario" name="salario" form={form} set={set} errores={errores} /></div>
                    <div className="col-md-4">
                      <Select label="Antigüedad" name="antiguedad"
                        opts={["Menos de 1 año","1 año","2 años","3 años","Más de 3 años","Operativo"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Nivel jerárquico" name="nivel_jerarquico"
                        opts={["Técnico","Administrativo","Supervisor","Jefe de área","Funcionario","Directivo","Empresario"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Condición de trabajo" name="condicion_trabajo"
                        opts={["Base","Eventual","Contrato","Otro"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Sector" name="sector"
                        opts={["Educativo","Primario","Secundario","Terciario"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Institución" name="institucion"
                        opts={["Público","Privado","Social"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Perfil acorde a carrera" name="perfil"
                        opts={["Si","No","Parcial"]} form={form} set={set} errores={errores} />
                    </div>
                    <div className="col-md-4">
                      <Select label="Trabajo obtenido de" name="medio_obtencion"
                        opts={["Bolsa de trabajo ITSH","Contactos personales","Residencia","Otro"]} form={form} set={set} errores={errores} />
                    </div>
                  </div>
                </>
              )}

              <div className="seccion-titulo mt-4"><span className="seccion-icono"><MdRefresh /></span> Estado de Actualización</div>
              <div className="row g-3">
                <div className="col-md-6">
                  <Select label="Estado del alumno" name="alumnos_actualizados"
                    opts={["Contactado laborando","Actualizado","No contactado ni actualizado"]} form={form} set={set} errores={errores} />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Nav del wizard */}
        <div className="form-nav">
          <div className="form-nav-info">Paso {paso + 1} de 4</div>
          <div style={{ display:"flex", gap:10 }}>
            {paso > 0 && (
              <button className="btn-borde" onClick={anterior}>
                <MdArrowBack /> Anterior
              </button>
            )}
            {paso < 3 ? (
              <button className="btn-naranja" onClick={siguiente}>
                Siguiente <MdArrowForward />
              </button>
            ) : (
              <button className="btn-azul" onClick={guardar}>
                <MdSave /> Guardar Egresado
              </button>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast-ok">{toast}</div>}
    </>
  );
}