import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPerson,
  MdLock,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import "../styles/login.css";
import bgCampus from "../assets/login_tec.jpg";

const LOGO =
  "https://www.huauchinango.tecnm.mx/wp-content/uploads/2020/08/cropped-Logo_ITSH-300x300.png";

export default function Login() {
  const navigate = useNavigate();

  const [verPass, setVerPass] = useState(false);
  const [logoErr, setLogoErr] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!usuario.trim() || !password.trim()) {
      setError("Es requerido ingresar credenciales");
      return;
    }

    // Credenciales de prueba
    if (usuario === "admin" && password === "1234") {
      setError("");
      sessionStorage.setItem("sesion", "true");
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgCampus})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8, 24, 58, 0.45)",
          backdropFilter: "blur(2px)",
          zIndex: 0,
        }}
      />

      {/* Burbujas */}
      <div className="login-burbuja login-burbuja-1" />
      <div className="login-burbuja login-burbuja-2" />
      <div className="login-burbuja login-burbuja-3" />

      {/* Card */}
      <div
        className="login-card"
        style={{
          background: "rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 8px 40px rgba(8, 24, 58, 0.35)",
        }}
      >
        {/* Logo */}
        <div className="login-logo-wrap">
          <div
            className="login-logo"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 4px 20px rgba(10,31,68,0.18)",
            }}
          >
            {logoErr ? (
              <span className="login-logo-fallback">ITSH</span>
            ) : (
              <img
                src={LOGO}
                alt="Instituto Tecnológico Superior de Huauchinango"
                onError={() => setLogoErr(true)}
              />
            )}
          </div>
        </div>

        {/* Título */}
        <h1 className="login-titulo">
          Sistema de Control de Egresados
        </h1>

        <p className="login-subtitulo">
          Instituto Tecnológico Superior de Huauchinango
          <br />
          <span style={{ color: "rgba(255,255,255,0.6)" }}>
            Tecnológico Nacional de México
          </span>
        </p>

        <div className="login-divisor">
          <div
            className="login-divisor-linea"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <span
            className="login-divisor-texto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Ingresa tus credenciales
          </span>
          <div
            className="login-divisor-linea"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
        </div>

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#ff4d4d",
              textAlign: "center",
              fontSize: "12px",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        {/* Usuario */}
        <div className="login-grupo">
          <label
            className="login-label"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Usuario
          </label>

          <div className="login-input-wrap">
            <MdPerson
              className="login-input-icon"
              style={{ color: "rgba(255,255,255,0.75)" }}
            />

            <input
              className="login-input"
              placeholder="Ingresa tu usuario"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={{
                background: "transparent",
                color: "#fff",
              }}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="login-grupo">
          <label
            className="login-label"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Contraseña
          </label>

          <div className="login-input-wrap">
            <MdLock
              className="login-input-icon"
              style={{ color: "rgba(255,255,255,0.75)" }}
            />

            <input
              type={verPass ? "text" : "password"}
              className="login-input"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
              style={{
                background: "transparent",
                color: "#fff",
              }}
            />

            <button
              type="button"
              className="login-input-toggle"
              onClick={() => setVerPass((v) => !v)}
              tabIndex={-1}
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {verPass ? (
                <MdVisibilityOff />
              ) : (
                <MdVisibility />
              )}
            </button>
          </div>
        </div>

        {/* Botón */}
        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>

        <p
          className="login-pie"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          ITSH · TecNM © {new Date().getFullYear()} — Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}