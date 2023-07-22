-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2023 a las 23:14:52
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_phjwt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `expiry_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `product_name`, `description`, `price`, `stock`, `expiry_date`) VALUES
(1, 'Aspirina', 'Medicamento para aliviar dolores de cabeza y fiebre.', 5.99, 100, '2023-12-31'),
(2, 'Ibuprofeno', 'Antiinflamatorio para aliviar dolores y reducir la inflamación.', 4.25, 80, '2024-06-15'),
(3, 'Paracetamol', 'Analgésico y antipirético para aliviar dolores y fiebre.', 3.49, 120, '2023-11-30'),
(4, 'Omeprazol', 'Medicamento para reducir la acidez estomacal y tratar úlceras.', 7.75, 60, '2024-03-20'),
(5, 'Loratadina', 'Antihistamínico para aliviar síntomas de alergias.', 6.15, 90, '2023-10-10'),
(6, 'Amoxicilina', 'Antibiótico para tratar infecciones bacterianas.', 8.99, 50, '2024-04-25'),
(7, 'Cetirizina', 'Antihistamínico para aliviar síntomas de alergias.', 5.50, 70, '2023-09-15'),
(8, 'Glicerina', 'Laxante suave para el alivio del estreñimiento.', 3.75, 100, '2024-02-28'),
(9, 'Vitamina C', 'Suplemento vitamínico para fortalecer el sistema inmunológico.', 9.25, 120, '2023-08-05'),
(10, 'Vitamina D', 'Suplemento vitamínico para mejorar la absorción de calcio.', 7.50, 80, '2024-01-12'),
(11, 'Gel de Aloe Vera', 'Gel refrescante para aliviar quemaduras y picaduras de insectos.', 6.99, 60, '2023-07-20'),
(12, 'Pomada de Arnica', 'Pomada para aliviar golpes y contusiones.', 4.80, 90, '2024-01-30'),
(13, 'Termómetro Digital', 'Instrumento para medir la temperatura corporal.', 12.50, 30, '2023-06-15'),
(14, 'Mascarilla Quirúrgica', 'Mascarilla de protección para filtrar partículas.', 1.99, 200, '2024-02-10'),
(15, 'Alcohol en Gel', 'Gel antiséptico para la desinfección de manos.', 3.50, 150, '2023-05-28'),
(16, 'Toallitas Desinfectantes', 'Toallitas para la limpieza y desinfección de superficies.', 5.25, 100, '2024-03-12'),
(17, 'Antiséptico', 'Solución para la limpieza y desinfección de heridas.', 4.50, 80, '2023-04-05'),
(18, 'Crema Solar SPF 50', 'Crema protectora para la exposición al sol.', 9.75, 40, '2024-05-15'),
(19, 'Vendas Elásticas', 'Vendas para la protección y compresión de lesiones.', 2.99, 120, '2023-03-20'),
(20, 'Jeringa Desechable', 'Jeringa para la administración de medicamentos.', 1.25, 180, '2024-04-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `identity_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `user_status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `identity_number`, `email`, `password`, `birthday`, `user_status`) VALUES
(1, 'Carlos', 'Colcha', '1206920579', 'carlosarielcb3@gmail.com', 'test123', '2023-07-11', 'active');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
