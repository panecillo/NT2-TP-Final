-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2020 a las 06:09:26
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `instituto`
--
CREATE DATABASE IF NOT EXISTS `instituto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `instituto`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actualizardatosprofesor`
--

DROP TABLE IF EXISTS `actualizardatosprofesor`;
CREATE TABLE IF NOT EXISTS `actualizardatosprofesor` (
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `apellido` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `direccion` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `fechasolicitud` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actualizardatosprofesor`
--

INSERT INTO `actualizardatosprofesor` (`dni`, `legajo`, `nombre`, `apellido`, `direccion`, `telefono`, `email`, `fechasolicitud`) VALUES
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 1234567, 'r@yanez', NULL),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 13333, 'r@yanez', '2020-07-09 00:41:45'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 12345611, 'r@yanez', '2020-07-09 00:43:23'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567999999', 123456789, 'r@yanez333.com', '2020-07-09 00:49:00'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 123456999, 'r@yanez', '2020-07-09 00:50:17'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 12345677, 'r@yanez', '2020-07-09 00:50:38'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 2147483647, 'r@yanez', '2020-07-09 00:56:39'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 123456, 'r@yanez', '2020-07-09 00:58:04'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 567', 12345, 'r@yanez', '2020-07-09 00:59:42'),
(55000001, 1000, 'Roberto', 'Yanez', 'calle 99 56799999', 123456, 'r@yanez', '2020-07-09 01:00:14'),
(55000001, 1000, 'Roberto 2', 'Yanez 2', 'otra calle 300', 22222, 'otro@mail', '2020-07-09 01:00:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultasprofesores`
--

DROP TABLE IF EXISTS `consultasprofesores`;
CREATE TABLE IF NOT EXISTS `consultasprofesores` (
  `idConsulta` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `consulta` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `legajo` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `leida` tinyint(4) NOT NULL,
  PRIMARY KEY (`idConsulta`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `consultasprofesores`
--

INSERT INTO `consultasprofesores` (`idConsulta`, `fecha`, `apellido`, `nombre`, `consulta`, `legajo`, `dni`, `leida`) VALUES
(1, '2020-07-08 15:00:00', 'Yanez', 'Roberto', 'Consulta de prueba 1', 1000, 55000001, 1),
(2, '0000-00-00 00:00:00', 'Yanez', 'Roberto', 'consulta de prueba', 1000, 55000001, 0),
(3, '2020-07-08 21:06:25', 'Yanez', 'Roberto', 'probando el formato de fecha', 1000, 55000001, 0),
(4, '2020-07-08 21:09:22', 'Yanez', 'Roberto', 'seguimos probando', 1000, 55000001, 0),
(22, '2020-07-08 21:41:26', 'Yanez', 'Roberto', 'a ver la ultima', 1000, 55000001, 0),
(23, '2020-07-09 00:45:43', 'Yanez', 'Roberto', 'probando consulta', 1000, 55000001, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

DROP TABLE IF EXISTS `curso`;
CREATE TABLE IF NOT EXISTS `curso` (
  `idcurso` int(11) NOT NULL,
  `nombrecurso` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idcurso`, `nombrecurso`) VALUES
(100, 'Ingles Basico A'),
(110, 'Ingles Basico B'),
(120, 'Ingles Basico C'),
(200, 'Ingles Intermedio A'),
(210, 'Ingles Intermedio B'),
(300, 'Ingles Avanzado'),
(311, 'Ingles Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datoscontacto`
--

DROP TABLE IF EXISTS `datoscontacto`;
CREATE TABLE IF NOT EXISTS `datoscontacto` (
  `dni` int(11) NOT NULL,
  `direccion` varchar(50) CHARACTER SET utf8 NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 NOT NULL,
  `apellido` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `datoscontacto`
--

INSERT INTO `datoscontacto` (`dni`, `direccion`, `telefono`, `email`, `nombre`, `apellido`) VALUES
(112233, 'Tucuman 661', '45901699', 'riglesias@bancocredicoop.coop', 'RIBANCO', 'APBanco'),
(12555667, 'CALLAO2048', '1132324349', 'GUIDO2@CACERES', 'GUIDO2', 'CACERES'),
(22000001, 'Calle de prueba 1', '11111111', 'a@lumno1.com', 'Nombre1', 'Apellido1'),
(22000002, 'Calle de prueba 2', '22222222', 'a@lumno2.com', 'Nombre2', 'Apellido2'),
(22000003, 'Calle de prueba 3', '33333333', 'a@lumno3.com', 'Nombre3', 'Apellido3'),
(22000004, 'Calle de prueba 4', '44444444', 'a@lumno4.com', 'Nombre4', 'Apellido4'),
(29004601, 'Padilla 629', '1567310879', 'rn@iglesias.com', 'Rodrigo', 'Iglesias'),
(30307686, 'Alberdi 140', '11223344', 'giglesias@gmail', 'Gonzalo', 'Iglesias'),
(31000002, 'Diaz Velez 1234', '1152223434', 'carlos@mail.com', 'Juan', 'Castro'),
(31000003, 'Carabobo 1234', '1151113434', 'carlos@mail.com', 'Raul', 'Garcia'),
(31000125, 'Caracas 1234', '1151444434', 'jlian@mail.com', 'Julian', 'Garcia'),
(43104262, 'calle 23 445', '43344433', 'a@riel', 'Ariel', 'Mendez'),
(55000001, 'calle 99 567', '123456', 'r@yanez', 'Roberto', 'Yanez'),
(55000002, 'Acevedo 230', '4453245', 'un@email', 'Luz', 'Martinez'),
(55000003, 'Oyola 243', '43526525', 'a@alvarez', 'Ariadna', 'Alvarez'),
(55000004, 'Camargo 342', '65354353', 'm@perez', 'Marcela', 'Perez'),
(55000005, 'Malabia 126', '34435435', 'j@lopez', 'Juan', 'Lopez'),
(55000006, 'Corrientes 5433', '54353345', 'j@diaz', 'Julieta', 'Diaz'),
(55000007, 'Murillo 666', '453535245', 'e@rodriguez', 'Ernesto', 'Rodriguez'),
(55000008, 'Emilio Castro 223', '24454446', 'f@lopez', 'Fernando', 'Lopez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  `tipoempleado` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`legajo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`dni`, `legajo`, `tipoempleado`) VALUES
(55000001, 1000, 'Profesor'),
(55000004, 1500, 'Profesor'),
(55000005, 1700, 'Profesor'),
(55000008, 1800, 'Profesor'),
(55000002, 2000, 'Administrativo'),
(55000006, 2200, 'Administrador'),
(55000003, 3000, 'Coordinador'),
(55000007, 3500, 'Coordinador'),
(12555667, 199797, 'Coordinador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleadoslegajos`
--

DROP TABLE IF EXISTS `empleadoslegajos`;
CREATE TABLE IF NOT EXISTS `empleadoslegajos` (
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  PRIMARY KEY (`dni`,`legajo`),
  KEY `fk_empleadoslegajos_empleados` (`legajo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleadoslegajos`
--

INSERT INTO `empleadoslegajos` (`dni`, `legajo`) VALUES
(12555667, 199797),
(55000001, 1000),
(55000002, 2000),
(55000003, 3000),
(55000004, 1500),
(55000005, 1700),
(55000006, 2200),
(55000007, 3500),
(55000008, 1800);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
CREATE TABLE IF NOT EXISTS `estudiante` (
  `dni` int(11) NOT NULL,
  `idcurso` int(11) DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `fk_estudiante_curso` (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`dni`, `idcurso`) VALUES
(22000001, 100),
(22000003, 100),
(22000004, 100),
(31000125, 100),
(43104262, 100),
(112233, 110),
(31000002, 110),
(29004601, 200),
(30307686, 200),
(22000002, 300),
(31000003, 300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantenotas`
--

DROP TABLE IF EXISTS `estudiantenotas`;
CREATE TABLE IF NOT EXISTS `estudiantenotas` (
  `dni` int(11) NOT NULL,
  `nota1` int(11) DEFAULT NULL,
  `nota2` int(11) DEFAULT NULL,
  `notafinal` int(11) DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudiantenotas`
--

INSERT INTO `estudiantenotas` (`dni`, `nota1`, `nota2`, `notafinal`) VALUES
(112233, 6, NULL, NULL),
(22000001, 7, 9, NULL),
(22000002, 8, 7, 8),
(22000003, 9, 8, 9),
(22000004, 4, 7, 6),
(29004601, 10, 9, NULL),
(30307686, NULL, NULL, NULL),
(31000002, NULL, NULL, NULL),
(31000003, 0, NULL, NULL),
(31000125, 7, 8, 9),
(43104262, 8, 9, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarioscurso`
--

DROP TABLE IF EXISTS `horarioscurso`;
CREATE TABLE IF NOT EXISTS `horarioscurso` (
  `idcurso` int(11) NOT NULL,
  `fechaclase` datetime NOT NULL,
  KEY `fk_horarioscurso_curso` (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarioscurso`
--

INSERT INTO `horarioscurso` (`idcurso`, `fechaclase`) VALUES
(100, '2020-07-06 12:00:00'),
(100, '2020-07-13 12:00:00'),
(100, '2020-07-20 12:00:00'),
(100, '2020-07-27 12:00:00'),
(110, '2020-07-08 12:00:00'),
(110, '2020-07-15 12:00:00'),
(110, '2020-07-22 12:00:00'),
(110, '2020-07-29 12:00:00'),
(300, '2020-07-10 12:00:00'),
(300, '2020-07-17 12:00:00'),
(300, '2020-07-24 12:00:00'),
(300, '2020-07-31 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

DROP TABLE IF EXISTS `nivel`;
CREATE TABLE IF NOT EXISTS `nivel` (
  `idcurso` int(11) NOT NULL,
  `dificultad` char(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`idcurso`, `dificultad`) VALUES
(100, 'BASICO'),
(110, 'BASICO'),
(120, 'BASICO'),
(200, 'MEDIO'),
(210, 'MEDIO'),
(300, 'AVANZADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorescursos`
--

DROP TABLE IF EXISTS `profesorescursos`;
CREATE TABLE IF NOT EXISTS `profesorescursos` (
  `legajo` int(11) NOT NULL,
  `idcurso` int(11) NOT NULL,
  PRIMARY KEY (`legajo`,`idcurso`),
  KEY `fk_profesorescursos_curso` (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesorescursos`
--

INSERT INTO `profesorescursos` (`legajo`, `idcurso`) VALUES
(1000, 100),
(1000, 110),
(1000, 300),
(1700, 120),
(1700, 200),
(1800, 210);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sysdiagrams`
--

DROP TABLE IF EXISTS `sysdiagrams`;
CREATE TABLE IF NOT EXISTS `sysdiagrams` (
  `name` varchar(128) CHARACTER SET utf8 NOT NULL,
  `principal_id` int(11) NOT NULL,
  `diagram_id` int(11) NOT NULL AUTO_INCREMENT,
  `version` int(11) DEFAULT NULL,
  `definition` longblob DEFAULT NULL,
  PRIMARY KEY (`diagram_id`),
  UNIQUE KEY `uk_principal_name` (`principal_id`,`name`),
  KEY `ix_tmp_autoinc` (`diagram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temascurso`
--

DROP TABLE IF EXISTS `temascurso`;
CREATE TABLE IF NOT EXISTS `temascurso` (
  `idcurso` int(11) DEFAULT NULL,
  `tema` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `temascurso`
--

INSERT INTO `temascurso` (`idcurso`, `tema`) VALUES
(100, 'Introduccion al Ingles'),
(100, 'Vocabulario'),
(100, 'Tiempos verbales'),
(100, 'Repaso tiempos verbales'),
(100, 'Repaso previo evaluación'),
(100, 'Evaluacion');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleadoslegajos`
--
ALTER TABLE `empleadoslegajos`
  ADD CONSTRAINT `fk_empleadoslegajos_datoscontacto` FOREIGN KEY (`dni`) REFERENCES `datoscontacto` (`dni`),
  ADD CONSTRAINT `fk_empleadoslegajos_empleados` FOREIGN KEY (`legajo`) REFERENCES `empleados` (`legajo`);

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `fk_estudiante_curso` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`),
  ADD CONSTRAINT `fk_estudiante_datoscontacto` FOREIGN KEY (`dni`) REFERENCES `datoscontacto` (`dni`);

--
-- Filtros para la tabla `horarioscurso`
--
ALTER TABLE `horarioscurso`
  ADD CONSTRAINT `fk_horarioscurso_curso` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`);

--
-- Filtros para la tabla `nivel`
--
ALTER TABLE `nivel`
  ADD CONSTRAINT `fk_nivel_curso1` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`);

--
-- Filtros para la tabla `profesorescursos`
--
ALTER TABLE `profesorescursos`
  ADD CONSTRAINT `fk_profesorescursos_curso` FOREIGN KEY (`idcurso`) REFERENCES `curso` (`idcurso`),
  ADD CONSTRAINT `fk_profesorescursos_empleados` FOREIGN KEY (`legajo`) REFERENCES `empleados` (`legajo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
