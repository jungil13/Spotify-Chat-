-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2024 at 02:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g2`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `track_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `username`, `message`, `created_at`, `track_id`) VALUES
(2147483764, 'Ems', 'ok', '2024-05-10 14:38:11', ''),
(2147483765, 'Ems', 'nara man diay na', '2024-05-10 14:38:26', ''),
(2147483766, 'Ems', 'Check out this track: https://open.spotify.com/embed/track/5YV9UyeC3dMV4kuRiTMGJs', '2024-05-10 14:39:29', '5YV9UyeC3dMV4kuRiTMGJs'),
(2147483767, 'jungil', 'wow', '2024-05-10 14:40:02', ''),
(2147483768, 'jungil', 'chuya', '2024-05-10 14:40:08', ''),
(2147483769, 'jungil', 'Check out this track: https://open.spotify.com/embed/track/4aqkICleG6HLRc2ygpWqN1', '2024-05-10 14:48:56', '4aqkICleG6HLRc2ygpWqN1'),
(2147483770, 'Ems', 'hi', '2024-05-10 15:49:54', ''),
(2147483771, 'Ems', 'const toggleDrawer = () => {   isSidebarOpen.value = !isSidebarOpen.value; };', '2024-05-10 17:06:26', ''),
(2147483772, 'Ems', 'const drawerOpen = ref(false)', '2024-05-10 17:06:41', ''),
(2147483773, 'jungil', 'Check out this track: https://open.spotify.com/embed/track/6Csrqur3IfnVp0EtHskjMw', '2024-05-10 17:52:30', '6Csrqur3IfnVp0EtHskjMw');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Jun Gil', 'jungil@gmail.com', NULL),
(2, 'Ivon', 'ivon@gmail.com', NULL),
(3, 'Emsayy', 'EmsGwapa@example.com', NULL),
(5, 'Ems', 'emsgwapa@gmail.com', '$2b$10$5CUrLUp/FZRxVKC5e23lru2Uktq12lQpTd7Oyo5.HUYK/06iZ505u'),
(7, 'juan', '', '$2b$10$E0kjHcxH3.UtTH0GGRjm9OsfDmfNBhfVLEOviwujdaj5/QS1e.DSG'),
(8, 'negro', 'negro@gmail.com', '$2b$10$Q.2etsbvJ0eKpF/9anUUxuPnXqYPOmVmRe5s.gsHc9nl1yyZaNsbK'),
(9, 'gwapo', 'gwapo123@gmail.com', '$2b$10$JPzpvX/YOIN86KxvZmfrSe41qgnlhSxf55e3isIwmDQWyAoD/ne0C'),
(10, 'gwapo', 'gwapo123@gmail.com', '$2b$10$V1eq1Bb5bhNJ1flQsjn7m./0Hz7t5jHUrOWIU59GfSxEXaPUHPh36'),
(11, 'jungil', 'jungil@gmail.com', '$2b$10$5EIF7zJ/.cFQ4LFtqKZVRO7b0YDdEUbhKywwDM9DV22apl.pQ/xDu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483774;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
