-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2026 a las 19:41:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_egresados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_laboral`
--

CREATE TABLE `detalle_laboral` (
  `id_detalle` int(11) NOT NULL,
  `no_control` varchar(30) NOT NULL,
  `posgrado` varchar(50) DEFAULT NULL,
  `actividad_actual` varchar(100) DEFAULT NULL,
  `nombre_empresa` varchar(150) DEFAULT NULL,
  `direccion_empresa` varchar(200) DEFAULT NULL,
  `municipio_empresa` varchar(100) DEFAULT NULL,
  `estado_empresa` varchar(100) DEFAULT NULL,
  `cp_empresa` varchar(20) DEFAULT NULL,
  `tel_empresa` varchar(30) DEFAULT NULL,
  `correo_empresa` varchar(150) DEFAULT NULL,
  `antiguedad` varchar(50) DEFAULT NULL,
  `nivel_jerarquico` varchar(50) DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `condicion_trabajo` varchar(50) DEFAULT NULL,
  `sector` varchar(50) DEFAULT NULL,
  `institucion` varchar(50) DEFAULT NULL,
  `perfil` varchar(30) DEFAULT NULL,
  `medio_obtencion` varchar(100) DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `puesto` varchar(150) DEFAULT NULL,
  `nombre_jefe` varchar(150) DEFAULT NULL,
  `puesto_jefe` varchar(150) DEFAULT NULL,
  `alumnos_actualizados` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_laboral`
--

INSERT INTO `detalle_laboral` (`id_detalle`, `no_control`, `posgrado`, `actividad_actual`, `nombre_empresa`, `direccion_empresa`, `municipio_empresa`, `estado_empresa`, `cp_empresa`, `tel_empresa`, `correo_empresa`, `antiguedad`, `nivel_jerarquico`, `salario`, `condicion_trabajo`, `sector`, `institucion`, `perfil`, `medio_obtencion`, `carrera`, `puesto`, `nombre_jefe`, `puesto_jefe`, `alumnos_actualizados`) VALUES
(2, 'F45367828', 'Diplomado', 'No trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seleccionar', 'Seleccionar', NULL, 'Seleccionar', 'Seleccionar', 'Seleccionar', 'Seleccionar', 'Seleccionar', 'Ingeniería Eléctrica', NULL, NULL, NULL, NULL),
(3, '2025001', 'Ninguno', 'Trabaja', 'SoftTech Solutions', 'Av Juárez 120', 'Tulancingo', 'Hidalgo', '43600', '7751110001', 'rh@softtech.com', '1 año', 'Administrativo', 12000.00, 'Contrato', 'Terciario', 'Privado', 'Si', 'Bolsa de trabajo ITSH', 'Ingeniería en Sistemas Computacionales', NULL, NULL, NULL, NULL),
(4, '2025002', 'Maestría', 'Estudia y trabaja', 'Industria MX', 'Av Hidalgo 90', 'Pachuca', 'Hidalgo', '42000', '7712220002', 'rh@industria.com', '2 años', 'Supervisor', 15000.00, 'Base', 'Secundario', 'Privado', 'Si', 'Contactos personales', 'Ingeniería Industrial', NULL, NULL, NULL, NULL),
(5, '2025003', 'Ninguno', 'No trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería Informática', NULL, NULL, NULL, NULL),
(6, '2025004', 'Diplomado', 'Estudia y trabaja', 'CFE', 'Zona Centro', 'Tulancingo', 'Hidalgo', '43600', '7753330003', 'rh@cfe.com', '3 años', 'Técnico', 18000.00, 'Base', 'Terciario', 'Público', 'Si', 'Residencia', 'Ingeniería Eléctrica', NULL, NULL, NULL, NULL),
(7, '2025005', 'Especialidad', 'Trabaja', 'Robotics MX', 'Parque Industrial', 'Pachuca', 'Hidalgo', '42083', '7714440004', 'rh@robotics.com', '1 año', 'Operativo', 14000.00, 'Contrato', 'Secundario', 'Privado', 'Parcial', 'Bolsa de trabajo ITSH', 'Ingeniería Mecatrónica', NULL, NULL, NULL, NULL),
(8, '2020006', 'Ninguno', 'Trabaja', 'SoftTech', 'Av Principal 123', 'Tulancingo', 'Hidalgo', '43600', '7751112222', 'rh@softtech.com', '1 año', 'Supervisor', 15000.00, 'Contrato', 'Terciario', 'Privado', 'Si', 'Bolsa de trabajo ITSH', 'Ingeniería en Sistemas Computacionales', NULL, NULL, NULL, NULL),
(9, '2020007', 'Diplomado', 'Estudia y trabaja', 'Industrias MX', 'Calle Reforma 20', 'Pachuca', 'Hidalgo', '42090', '7715552222', 'rh@indmx.com', '2 años', 'Administrativo', 17000.00, 'Base', 'Secundario', 'Privado', 'Parcial', 'Contactos personales', 'Ingeniería Industrial', NULL, NULL, NULL, NULL),
(10, '2020008', 'Ninguno', 'No trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería Informática', NULL, NULL, NULL, NULL),
(11, '2020009', 'Maestría', 'Trabaja', 'Automation SA', 'Zona Industrial', 'Puebla', 'Puebla', '72000', '2224445555', 'rh@automation.com', '3 años', 'Jefe de área', 25000.00, 'Base', 'Secundario', 'Privado', 'Si', 'Residencia', 'Ingeniería Mecatrónica', NULL, NULL, NULL, NULL),
(12, '2020010', 'Ninguno', 'No estudia ni trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería en Administración', NULL, NULL, NULL, NULL),
(13, '2020011', 'Maestría', 'Trabaja', 'Grupo Industrial MX', 'Parque Industrial 10', 'Pachuca', 'Hidalgo', '42090', '7712223333', 'rh@grupomx.com', '3 años', 'Supervisor', 22000.00, 'Base', 'Secundario', 'Privado', 'Si', 'Bolsa de trabajo ITSH', 'Ingeniería Industrial', NULL, NULL, NULL, NULL),
(14, '2020012', 'Ninguno', 'No trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería Informática', NULL, NULL, NULL, NULL),
(15, '2020013', 'Especialidad', 'Trabaja', 'Robotics Tech', 'Av Tecnológica 200', 'Puebla', 'Puebla', '72000', '2225554444', 'rh@robotics.com', '2 años', 'Técnico', 18000.00, 'Contrato', 'Secundario', 'Privado', 'Parcial', 'Residencia', 'Ingeniería Mecatrónica', NULL, NULL, NULL, NULL),
(16, '2020014', 'Diplomado', 'Estudia y trabaja', 'CodeFactory', 'Blvd Central 88', 'Tulancingo', 'Hidalgo', '43600', '7754442211', 'rh@codefactory.com', '1 año', 'Administrativo', 14000.00, 'Eventual', 'Terciario', 'Privado', 'Si', 'Contactos personales', 'Ingeniería en Sistemas Computacionales', NULL, NULL, NULL, NULL),
(17, '2020015', 'Ninguno', 'No estudia ni trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería en Administración', NULL, NULL, NULL, NULL),
(18, '2020016', 'Diplomado', 'Trabaja', 'Net Solutions', 'Av Juárez 55', 'Tulancingo', 'Hidalgo', '43600', '7751110000', 'rh@netsolutions.com', '1 año', 'Administrativo', 16000.00, 'Contrato', 'Terciario', 'Privado', 'Si', 'Bolsa de trabajo ITSH', 'Ingeniería en Sistemas Computacionales', NULL, NULL, NULL, NULL),
(19, '2020017', 'Ninguno', 'No trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería Industrial', NULL, NULL, NULL, NULL),
(20, '2020018', 'Especialidad', 'Estudia y trabaja', 'Digital Soft', 'Blvd Hidalgo 100', 'Pachuca', 'Hidalgo', '42084', '7712229999', 'rh@digitalsoft.com', '2 años', 'Supervisor', 19000.00, 'Base', 'Terciario', 'Privado', 'Parcial', 'Contactos personales', 'Ingeniería Informática', NULL, NULL, NULL, NULL),
(21, '2020019', 'Maestría', 'Trabaja', 'Automatización del Centro', 'Zona Industrial 5', 'Puebla', 'Puebla', '72010', '2226665555', 'rh@automatizacion.com', '4 años', 'Jefe de área', 28000.00, 'Base', 'Secundario', 'Privado', 'Si', 'Residencia', 'Ingeniería Mecatrónica', NULL, NULL, NULL, NULL),
(22, '2020020', 'Ninguno', 'No estudia ni trabaja', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ingeniería en Administración', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id_direccion` int(11) NOT NULL,
  `no_control` varchar(30) NOT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`id_direccion`, `no_control`, `colonia`, `municipio`, `estado`, `ciudad`, `codigo_postal`) VALUES
(2, 'F45367828', 'PERALES', 'TENANGO', 'DURANGO', 'ZARAGOZA', '76543'),
(3, '2025001', 'Centro', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43600'),
(4, '2025002', 'Napateco', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43629'),
(5, '2025003', 'La Morena', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43625'),
(6, '2025004', 'Jaltepec', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43650'),
(7, '2025005', 'Rojo Gómez', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43680'),
(8, '2020006', 'Centro', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43600'),
(9, '2020007', 'La Morena', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43625'),
(10, '2020008', 'Jardines', 'Pachuca', 'Hidalgo', 'Pachuca', '42080'),
(11, '2020009', 'Centro', 'Huauchinango', 'Puebla', 'Huauchinango', '73160'),
(12, '2020010', 'Morelos', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43640'),
(13, '2020011', 'Centro', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43600'),
(14, '2020012', 'Napateco', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43629'),
(15, '2020013', 'San Nicolás', 'Pachuca', 'Hidalgo', 'Pachuca', '42083'),
(16, '2020014', 'Centro', 'Huauchinango', 'Puebla', 'Huauchinango', '73176'),
(17, '2020015', 'Rojo Gómez', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43650'),
(18, '2020016', 'Centro', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43600'),
(19, '2020017', 'San Rafael', 'Pachuca', 'Hidalgo', 'Pachuca', '42082'),
(20, '2020018', 'La Villita', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43635'),
(21, '2020019', 'El Paraíso', 'Huauchinango', 'Puebla', 'Huauchinango', '73170'),
(22, '2020020', 'Jaltepec', 'Tulancingo', 'Hidalgo', 'Tulancingo', '43647');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresado`
--

CREATE TABLE `egresado` (
  `id_egresado` int(11) NOT NULL,
  `no_control` varchar(30) NOT NULL,
  `nombre_completo` varchar(150) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(20) NOT NULL,
  `sexo` varchar(30) DEFAULT NULL,
  `estado_civil` varchar(50) DEFAULT NULL,
  `correo_personal` varchar(150) DEFAULT NULL,
  `generacion` varchar(30) DEFAULT NULL,
  `mes_egreso` varchar(30) DEFAULT NULL,
  `anio_egreso` int(11) DEFAULT NULL,
  `titulado` varchar(30) DEFAULT NULL,
  `fecha_titulacion` date DEFAULT NULL,
  `url_foto` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `egresado`
--

INSERT INTO `egresado` (`id_egresado`, `no_control`, `nombre_completo`, `fecha_nacimiento`, `curp`, `sexo`, `estado_civil`, `correo_personal`, `generacion`, `mes_egreso`, `anio_egreso`, `titulado`, `fecha_titulacion`, `url_foto`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(2, 'F45367828', 'MANUEL', '2016-03-09', 'AAAOL98GHSMGGY09', 'Masculino', 'Viudo', 'nerisolis@gmail.com', '2024', '11', 2025, 'En proceso', '2026-05-26', NULL, '2026-05-22 16:04:59', '2026-05-22 16:04:59'),
(3, '2025001', 'Juan Pérez García', '2001-03-12', 'JPGA010312HDFRRNA1', 'Masculino', 'Soltero', 'juan@gmail.com', '2020-2024', 'Junio', 2024, 'Si', '2025-02-15', NULL, '2026-05-29 14:25:46', '2026-05-29 14:25:46'),
(4, '2025002', 'María López Hernández', '2000-08-20', 'MLHA000820MDFRRNA2', 'Femenino', 'Soltero', 'maria@gmail.com', '2019-2023', 'Diciembre', 2023, 'En proceso', NULL, NULL, '2026-05-29 14:25:46', '2026-05-29 14:25:46'),
(5, '2025003', 'Carlos Ramírez Torres', '1999-11-10', 'CRTA991110HDFRRNA3', 'Masculino', 'Casado', 'carlos@gmail.com', '2018-2022', 'Junio', 2022, 'No', NULL, NULL, '2026-05-29 14:25:46', '2026-05-29 14:25:46'),
(6, '2025004', 'Fernanda Cruz Morales', '2001-02-01', 'FCMA010201MDFRRNA4', 'Femenino', 'Soltero', 'fernanda@gmail.com', '2020-2024', 'Junio', 2024, 'Si', '2025-01-20', NULL, '2026-05-29 14:25:46', '2026-05-29 14:25:46'),
(7, '2025005', 'Luis Hernández Soto', '2000-05-14', 'LHSO000514HDFRRNA5', 'Masculino', 'Soltero', 'luis@gmail.com', '2019-2023', 'Diciembre', 2023, 'En proceso', NULL, NULL, '2026-05-29 14:25:46', '2026-05-29 14:25:46'),
(8, '2020006', 'Daniela Cruz Mendoza', '2001-06-14', 'CUMD010614MPLRNN06', 'Femenino', 'Soltero', 'daniela.cruz@gmail.com', '2020-2024', 'Junio', 2024, 'Si', NULL, NULL, '2026-05-29 14:28:50', '2026-05-29 14:28:50'),
(9, '2020007', 'Miguel Ángel Pérez', '2000-09-10', 'PEAM000910HPLRRG07', 'Masculino', 'Soltero', 'miguel.perez@gmail.com', '2019-2023', 'Diciembre', 2023, 'En proceso', NULL, NULL, '2026-05-29 14:28:50', '2026-05-29 14:28:50'),
(10, '2020008', 'Fernanda López Ruiz', '2001-01-18', 'LORF010118MPLPRN08', 'Femenino', 'Casado', 'fernanda.lopez@gmail.com', '2020-2024', 'Julio', 2024, 'Si', NULL, NULL, '2026-05-29 14:28:50', '2026-05-29 14:28:50'),
(11, '2020009', 'Eduardo Sánchez Torres', '1999-11-30', 'SATE991130HPLNRS09', 'Masculino', 'Soltero', 'eduardo.sanchez@gmail.com', '2018-2022', 'Junio', 2022, 'No', NULL, NULL, '2026-05-29 14:28:50', '2026-05-29 14:28:50'),
(12, '2020010', 'Valeria Jiménez Castro', '2002-03-25', 'JICV020325MPLMTR10', 'Femenino', 'Soltero', 'valeria.jimenez@gmail.com', '2021-2025', 'Junio', 2025, 'En proceso', NULL, NULL, '2026-05-29 14:28:50', '2026-05-29 14:28:50'),
(13, '2020011', 'Carlos Ramírez Soto', '2000-02-11', 'RASC000211HPLMTR11', 'Masculino', 'Casado', 'carlos.ramirez@gmail.com', '2019-2023', 'Junio', 2023, 'Si', NULL, NULL, '2026-05-29 14:39:17', '2026-05-29 14:39:17'),
(14, '2020012', 'Mariana Torres Díaz', '2001-12-08', 'TODM011208MPLRRS12', 'Femenino', 'Soltero', 'mariana.torres@gmail.com', '2020-2024', 'Diciembre', 2024, 'En proceso', NULL, NULL, '2026-05-29 14:39:17', '2026-05-29 14:39:17'),
(15, '2020013', 'Jorge Castillo Vega', '1999-04-20', 'CAVJ990420HPLSRG13', 'Masculino', 'Soltero', 'jorge.castillo@gmail.com', '2018-2022', 'Junio', 2022, 'No', NULL, NULL, '2026-05-29 14:39:17', '2026-05-29 14:39:17'),
(16, '2020014', 'Paola Hernández Ruiz', '2002-08-15', 'HERP020815MPLRZN14', 'Femenino', 'Soltero', 'paola.hernandez@gmail.com', '2021-2025', 'Julio', 2025, 'Si', NULL, NULL, '2026-05-29 14:39:17', '2026-05-29 14:39:17'),
(17, '2020015', 'Ricardo Morales Luna', '2000-10-01', 'MOLR001001HPLRNC15', 'Masculino', 'Divorciado', 'ricardo.morales@gmail.com', '2019-2023', 'Enero', 2023, 'Si', NULL, NULL, '2026-05-29 14:39:17', '2026-05-29 14:39:17'),
(18, '2020016', 'Andrea Flores Mejía', '2001-07-21', 'FOMA010721MPLRJA16', 'Femenino', 'Soltero', 'andrea.flores@gmail.com', '2020-2024', 'Junio', 2024, 'Si', NULL, NULL, '2026-05-29 14:41:15', '2026-05-29 14:41:15'),
(19, '2020017', 'Luis Alberto Gómez', '1999-05-18', 'GOAL990518HPLMRB17', 'Masculino', 'Casado', 'luis.gomez@gmail.com', '2018-2022', 'Diciembre', 2022, 'No', NULL, NULL, '2026-05-29 14:41:15', '2026-05-29 14:41:15'),
(20, '2020018', 'Sofía Navarro Pérez', '2002-01-10', 'NAPS020110MPLRRF18', 'Femenino', 'Soltero', 'sofia.navarro@gmail.com', '2021-2025', 'Julio', 2025, 'En proceso', NULL, NULL, '2026-05-29 14:41:15', '2026-05-29 14:41:15'),
(21, '2020019', 'Fernando Ortega Ruiz', '2000-09-27', 'OERF000927HPLRTN19', 'Masculino', 'Soltero', 'fernando.ortega@gmail.com', '2019-2023', 'Junio', 2023, 'Si', NULL, NULL, '2026-05-29 14:41:15', '2026-05-29 14:41:15'),
(22, '2020020', 'Karen Martínez Silva', '2001-11-05', 'MASK011105MPLRVR20', 'Femenino', 'Unión libre', 'karen.martinez@gmail.com', '2020-2024', 'Enero', 2024, 'En proceso', NULL, NULL, '2026-05-29 14:41:15', '2026-05-29 14:41:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `id_telefono` int(11) NOT NULL,
  `no_control` varchar(30) NOT NULL,
  `numero` varchar(30) DEFAULT NULL,
  `tipo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono`
--

INSERT INTO `telefono` (`id_telefono`, `no_control`, `numero`, `tipo`) VALUES
(5, 'F45367828', '7654327619', 'Personal'),
(6, 'F45367828', '7895642367', 'Casa'),
(7, 'F45367828', '7654567890', 'Familiar 1'),
(8, 'F45367828', '7789876543', 'Familiar 2'),
(9, '2025001', '7751111111', 'Personal'),
(10, '2025001', '7752222222', 'Casa'),
(11, '2025001', '7753333333', 'Familiar 1'),
(12, '2025001', '7754444444', 'Familiar 2'),
(13, '2025002', '7755555555', 'Personal'),
(14, '2025002', '7756666666', 'Casa'),
(15, '2025002', '7757777777', 'Familiar 1'),
(16, '2025002', '7758888888', 'Familiar 2'),
(17, '2025003', '7759999999', 'Personal'),
(18, '2025003', '7751010101', 'Casa'),
(19, '2025003', '7752020202', 'Familiar 1'),
(20, '2025003', '7753030303', 'Familiar 2'),
(21, '2025004', '7754040890', 'Personal'),
(22, '2025004', '7755050505', 'Casa'),
(23, '2025004', '7756060606', 'Familiar 1'),
(24, '2025004', '7757070707', 'Familiar 2'),
(25, '2025005', '7758080808', 'Personal'),
(26, '2025005', '7759090909', 'Casa'),
(27, '2025005', '7751111222', 'Familiar 1'),
(28, '2025005', '7753333444', 'Familiar 2'),
(29, '2020006', '7751111111', 'Personal'),
(30, '2020006', '7751111112', 'Casa'),
(31, '2020007', '7752222222', 'Personal'),
(32, '2020007', '7752222223', 'Casa'),
(33, '2020008', '7753333333', 'Personal'),
(34, '2020008', '7753333334', 'Casa'),
(35, '2020009', '7754444444', 'Personal'),
(36, '2020009', '7754444445', 'Casa'),
(37, '2020010', '7755555555', 'Personal'),
(38, '2020010', '7755555556', 'Casa'),
(39, '2020011', '7756661111', 'Personal'),
(40, '2020011', '7756661112', 'Casa'),
(41, '2020012', '7757772222', 'Personal'),
(42, '2020012', '7757772223', 'Casa'),
(43, '2020013', '7758883333', 'Personal'),
(44, '2020013', '7758883334', 'Casa'),
(45, '2020014', '7759994444', 'Personal'),
(46, '2020014', '7759994445', 'Casa'),
(47, '2020015', '7751234567', 'Personal'),
(48, '2020015', '7757654321', 'Casa'),
(49, '2020016', '7753211111', 'Personal'),
(50, '2020016', '7753211112', 'Casa'),
(51, '2020017', '7716542222', 'Personal'),
(52, '2020017', '7716542223', 'Casa'),
(53, '2020018', '7759873333', 'Personal'),
(54, '2020018', '7759873334', 'Casa'),
(55, '2020019', '2224448888', 'Personal'),
(56, '2020019', '2224448889', 'Casa'),
(57, '2020020', '7758889999', 'Personal'),
(58, '2020020', '7758889998', 'Casa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'admin', 'admin123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_laboral`
--
ALTER TABLE `detalle_laboral`
  ADD PRIMARY KEY (`id_detalle`),
  ADD UNIQUE KEY `no_control` (`no_control`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `no_control` (`no_control`);

--
-- Indices de la tabla `egresado`
--
ALTER TABLE `egresado`
  ADD PRIMARY KEY (`id_egresado`),
  ADD UNIQUE KEY `no_control` (`no_control`),
  ADD UNIQUE KEY `curp` (`curp`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`id_telefono`),
  ADD KEY `no_control` (`no_control`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_laboral`
--
ALTER TABLE `detalle_laboral`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `egresado`
--
ALTER TABLE `egresado`
  MODIFY `id_egresado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `telefono`
--
ALTER TABLE `telefono`
  MODIFY `id_telefono` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_laboral`
--
ALTER TABLE `detalle_laboral`
  ADD CONSTRAINT `detalle_laboral_ibfk_1` FOREIGN KEY (`no_control`) REFERENCES `egresado` (`no_control`) ON DELETE CASCADE;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`no_control`) REFERENCES `egresado` (`no_control`) ON DELETE CASCADE;

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`no_control`) REFERENCES `egresado` (`no_control`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

select * from control_egresados.egresado;

