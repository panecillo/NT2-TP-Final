-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2020 a las 04:32:57
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idcurso` int(11) NOT NULL,
  `nombrecurso` varchar(50) CHARACTER SET utf8 DEFAULT NULL
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

CREATE TABLE `datoscontacto` (
  `dni` int(11) NOT NULL,
  `direccion` varchar(50) CHARACTER SET utf8 NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8 NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 NOT NULL,
  `apellido` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `datoscontacto`
--

INSERT INTO `datoscontacto` (`dni`, `direccion`, `telefono`, `email`, `nombre`, `apellido`) VALUES
(112233, 'Tucuman 661', '45901699', 'riglesias@bancocredicoop.coop', 'RIBANCO', 'APBanco'),
(12555667, 'CALLAO2048', '1132324349', 'GUIDO2@CACERES', 'GUIDO2', 'CACERES'),
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

CREATE TABLE `empleados` (
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  `tipoempleado` varchar(50) CHARACTER SET utf8 NOT NULL
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

CREATE TABLE `empleadoslegajos` (
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL
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

CREATE TABLE `estudiante` (
  `dni` int(11) NOT NULL,
  `idcurso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`dni`, `idcurso`) VALUES
(30307686, NULL),
(31000002, NULL),
(31000003, NULL),
(31000125, NULL),
(43104262, NULL),
(112233, 110),
(29004601, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarioscurso`
--

CREATE TABLE `horarioscurso` (
  `idcurso` int(11) NOT NULL,
  `fechaclase` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarioscurso`
--

INSERT INTO `horarioscurso` (`idcurso`, `fechaclase`) VALUES
(100, '2020-06-18 16:00:00'),
(100, '2020-06-22 16:00:00'),
(100, '2020-06-30 16:00:00'),
(200, '2020-06-19 00:00:00'),
(210, '2020-06-22 00:00:00'),
(210, '2020-06-30 00:00:00'),
(311, '2020-07-03 15:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE `nivel` (
  `idcurso` int(11) NOT NULL,
  `dificultad` char(10) CHARACTER SET utf8 NOT NULL
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

CREATE TABLE `profesorescursos` (
  `legajo` int(11) NOT NULL,
  `idcurso` int(11) NOT NULL
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

CREATE TABLE `sysdiagrams` (
  `name` varchar(128) CHARACTER SET utf8 NOT NULL,
  `principal_id` int(11) NOT NULL,
  `diagram_id` int(11) NOT NULL,
  `version` int(11) DEFAULT NULL,
  `definition` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idcurso`);

--
-- Indices de la tabla `datoscontacto`
--
ALTER TABLE `datoscontacto`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`legajo`);

--
-- Indices de la tabla `empleadoslegajos`
--
ALTER TABLE `empleadoslegajos`
  ADD PRIMARY KEY (`dni`,`legajo`),
  ADD KEY `fk_empleadoslegajos_empleados` (`legajo`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `fk_estudiante_curso` (`idcurso`);

--
-- Indices de la tabla `horarioscurso`
--
ALTER TABLE `horarioscurso`
  ADD KEY `fk_horarioscurso_curso` (`idcurso`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
  ADD PRIMARY KEY (`idcurso`);

--
-- Indices de la tabla `profesorescursos`
--
ALTER TABLE `profesorescursos`
  ADD PRIMARY KEY (`legajo`,`idcurso`),
  ADD KEY `fk_profesorescursos_curso` (`idcurso`);

--
-- Indices de la tabla `sysdiagrams`
--
ALTER TABLE `sysdiagrams`
  ADD PRIMARY KEY (`diagram_id`),
  ADD UNIQUE KEY `uk_principal_name` (`principal_id`,`name`),
  ADD KEY `ix_tmp_autoinc` (`diagram_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sysdiagrams`
--
ALTER TABLE `sysdiagrams`
  MODIFY `diagram_id` int(11) NOT NULL AUTO_INCREMENT;

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
