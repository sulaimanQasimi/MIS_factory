-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2025 at 08:37 AM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `factory_mis`
--

DROP DATABASE IF EXISTS `factory_mis`;
CREATE DATABASE `factory_mis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;
USE `factory_mis`;

-- --------------------------------------------------------

--
-- Table structure for table `bill_details`
--

CREATE TABLE `bill_details` (
  `id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `bill_details`
--

INSERT INTO `bill_details` (`id`, `bill_id`, `item_name`, `item_type`, `quantity`, `price`) VALUES
(1, 1, 'فوم بلاک 2x1', 'دانه ', 2, 2000),
(2, 2, 'فوم بلاک 2x1', 'دانه ', 1, 3000),
(3, 3, 'فوم بلاک 2x1', 'دانه ', 1, 300),
(4, 4, 'فوم بلاک 2x1', 'دانه ', 2, 1000),
(5, 5, 'کاک 70*2', 'دانه', 10, 50),
(6, 6, 'کاک 70*2 تراکم 10', 'دانه', 1, 200),
(7, 7, 'کاک 70*2 تراکم 10', 'دانه', 1, 100),
(8, 8, 'کاک 70*2 تراکم 10', 'دانه', 1, 200);

-- --------------------------------------------------------

--
-- Table structure for table `bill_items`
--

CREATE TABLE `bill_items` (
  `id` int(11) NOT NULL,
  `bill_detail_id` int(11) NOT NULL,
  `stack_to_market_list_id` int(11) DEFAULT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `bill_items`
--

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `location` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `website` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `logo` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `backup_url` text COLLATE utf8mb4_persian_ci NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `starting_activity` date NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `company_name`, `description`, `location`, `contact`, `email`, `website`, `logo`, `backup_url`, `currency`, `starting_activity`, `date`) VALUES
(1, 'شرکت تولیدی مزار فوم', 'پیشتاز در عرصه تولیدات صنعتی', 'مزار شریف، پارک های صنعتی', '0796323516', '-', '-', 'mazar_foam logo.png', 'E:\\system_backup', 'دلار', '2003-03-21', '2020-12-04');

-- --------------------------------------------------------

--
-- Table structure for table `constant`
--

CREATE TABLE `constant` (
  `id` int(11) NOT NULL,
  `item_reg_id` int(11) NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `create_mahsol`
--

CREATE TABLE `create_mahsol` (
  `id` int(11) NOT NULL,
  `ready_material_type_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `create_mahsol`
--

INSERT INTO `create_mahsol` (`id`, `ready_material_type_id`, `item_name`, `item_type`, `quantity`, `price`) VALUES
(1, 1, 'undefined', 'undefined', 0, 0),
(2, 2, 'مواد فوم', 'کیلوگرام', 5, 0),
(3, 3, 'پلی استرین', 'تن', 2, 0),
(4, 4, 'پلی استرین', 'تن', 1, 0),
(5, 5, 'پلی استرین 1000', 'تن', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer_account`
--

CREATE TABLE `customer_account` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `customer_account`
--

INSERT INTO `customer_account` (`id`, `name`, `last_name`, `company_name`, `contact`, `address`, `email`, `date`) VALUES
(1, 'نصیر ', 'کریمی', 'قالین فروشی کریمی', '0792212900', 'دروازه بلخ', 'undefined', '2025-12-17'),
(2, 'منیر ', 'احمدی ', 'منیر احمدی قالین', '8988998', 'کارته باختر', 'undefined', '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `description` text COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `category_id`, `quantity`, `price`, `description`, `ex_rate`, `currency`, `date`) VALUES
(1, 6, 1, 500, 'از درک ترمیم ماشین ', 66.4, 'افغانی', '2025-12-17'),
(2, 10, 1, 1000, 'از درک انترنت ماه جدی', 66.5, 'افغانی', '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `expense_category`
--

CREATE TABLE `expense_category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `expense_category`
--

INSERT INTO `expense_category` (`id`, `name`) VALUES
(6, 'ترمیمات '),
(7, 'اداری '),
(9, 'کرایه تراسپورت '),
(10, 'انترنت');

-- --------------------------------------------------------

--
-- Table structure for table `froshat_details`
--

CREATE TABLE `froshat_details` (
  `id` int(11) NOT NULL,
  `cus_id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci DEFAULT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int(11) NOT NULL,
  `total_amount` float NOT NULL,
  `paid_amount` float NOT NULL DEFAULT 0,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  `remaining_amount` float GENERATED ALWAYS AS (`total_amount` - `paid_amount`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `froshat_details`
--

INSERT INTO `froshat_details` (`id`, `cus_id`, `email`, `contact`, `bill_no`, `total_amount`, `paid_amount`, `currency`, `ex_rate`, `date`) VALUES
(1, 1, NULL, '0792212900', 1, 4000, 0, 'افغانی', 66.4, '2025-12-17'),
(2, 1, NULL, '0792212900', 2, 3000, 0, 'افغانی', 66.4, '2025-12-17'),
(3, 1, NULL, '0792212900', 3, 300, 0, 'افغانی', 66.4, '2025-12-17'),
(4, 1, NULL, '0792212900', 4, 2000, 0, 'افغانی', 66.4, '2025-12-20'),
(5, 1, NULL, '0792212900', 5, 500, 0, 'دالر', 1, '2025-12-23'),
(6, 1, NULL, '0792212900', 6, 200, 0, 'افغانی', 66.5, '2025-12-23'),
(7, 1, NULL, '0792212900', 7, 100, 0, 'دالر', 1, '2025-12-23'),
(8, 2, NULL, '8988998', 8, 200, 0, 'افغانی', 66.5, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `bill_payment`
--

CREATE TABLE `bill_payment` (
  `id` int(11) NOT NULL,
  `froshat_details_id` int(11) NOT NULL,
  `paid_amount` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `payment_date` date NOT NULL,
  `description` text COLLATE utf8mb4_persian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `bill_payment`
--

-- --------------------------------------------------------

--
-- Table structure for table `goods_registration`
--

CREATE TABLE `goods_registration` (
  `id` int(11) NOT NULL,
  `mar_mat_id` int(11) NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `goods_no` int(11) NOT NULL,
  `expiration_date` date NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incoming_loan`
--

CREATE TABLE `incoming_loan` (
  `id` int(11) NOT NULL,
  `borrower` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `lender` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `amount` float NOT NULL,
  `installment_no` int(11) NOT NULL,
  `lender_contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `benefit` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incoming_loan_list`
--

CREATE TABLE `incoming_loan_list` (
  `id` int(11) NOT NULL,
  `incoming_loan_id` int(11) NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_registration`
--

CREATE TABLE `item_registration` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `purchase_price` float NOT NULL,
  `machine_life` int(11) DEFAULT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mahsol_price`
--

CREATE TABLE `mahsol_price` (
  `id` int(11) NOT NULL,
  `set_p_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `mahsol_price`
--

INSERT INTO `mahsol_price` (`id`, `set_p_id`, `item_name`, `item_type`, `quantity`, `price`) VALUES
(3, 2, 'مصارف', '', 1, 200),
(4, 2, 'مواد فوم', 'کیلوگرام', 1, 500);

-- --------------------------------------------------------

--
-- Table structure for table `market_material_reg`
--

CREATE TABLE `market_material_reg` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name_id` int(11) NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material_type`
--

CREATE TABLE `material_type` (
  `id` int(11) NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `serial_number` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `material_type`
--

INSERT INTO `material_type` (`id`, `type`, `serial_number`) VALUES
(1, 'مواد فوم', '1'),
(2, 'پلی استرین', '2'),
(3, 'پلی استرین 1000', '3'),
(4, 'پلی استرین 2000', '4'),
(5, 'پلی استرین 3000', '5');

-- --------------------------------------------------------

--
-- Table structure for table `outgoing_loan`
--

CREATE TABLE `outgoing_loan` (
  `id` int(11) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `amount` float NOT NULL,
  `installment_no` int(11) NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `tazkira` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `outgoing_loan_list`
--

CREATE TABLE `outgoing_loan_list` (
  `id` int(11) NOT NULL,
  `outgoing_loan_id` int(11) NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner_registration`
--

CREATE TABLE `partner_registration` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `location` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `participant_percentage` int(11) NOT NULL,
  `document` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partner_taken_amount`
--

CREATE TABLE `partner_taken_amount` (
  `id` int(11) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `document` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payable_amount`
--

CREATE TABLE `payable_amount` (
  `id` int(11) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  `taken_amount` float NOT NULL,
  `tax` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `overtime` float NOT NULL,
  `payable` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL DEFAULT 'باقی',
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `payable_amount`
--

INSERT INTO `payable_amount` (`id`, `stuff_id`, `taken_amount`, `tax`, `overtime`, `payable`, `currency`, `ex_rate`, `date`) VALUES
(1, 1, 14700, '2', 0, 'رسید', 'افغانی', 66.4, '2025-12-17'),
(2, 1, 14500, '0', 0, 'رسید', 'افغانی', 66.5, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `raw_materials`
--

CREATE TABLE `raw_materials` (
  `id` int(11) NOT NULL,
  `but_type` int(11) NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(30) COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `profit_per_one` float NOT NULL,
  `paid_amount` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `raw_material_each_mahsol`
--

CREATE TABLE `raw_material_each_mahsol` (
  `id` int(11) NOT NULL,
  `stack_factory_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `raw_material_each_mahsol`
--

INSERT INTO `raw_material_each_mahsol` (`id`, `stack_factory_id`, `item_name`, `item_type`, `quantity`) VALUES
(1, 1, 'undefined', 'undefined', 0),
(2, 2, 'پلی استرین', 'تن', 200),
(3, 3, 'پلی استرین 1000', 'تن', 70);

-- --------------------------------------------------------

--
-- Table structure for table `ready_materials_type`
--

CREATE TABLE `ready_materials_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `serial_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `ready_materials_type`
--

INSERT INTO `ready_materials_type` (`id`, `name`, `type`, `serial_no`) VALUES
(1, 'فوم بلاک 2x1', 'دانه ', 1),
(2, 'فوم دیزاین دلخواه', 'بلاک', 2),
(3, 'کاک 70*2', 'دانه', 3),
(4, 'کاک 1*2', 'دانه', 4),
(5, 'کاک 70*2 تراکم 10', 'دانه', 5);

-- --------------------------------------------------------

--
-- Table structure for table `return_bill`
--

CREATE TABLE `return_bill` (
  `id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales_payments`
--

CREATE TABLE `sales_payments` (
  `id` int(11) NOT NULL,
  `sales_id` int(11) NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `sales_payments`
--

INSERT INTO `sales_payments` (`id`, `sales_id`, `paid`, `currency`, `ex_rate`, `date`) VALUES
(1, 1, 1000, 'افغانی', 66.4, '2025-12-17'),
(4, 1, 3000, 'افغانی', 66.4, '2025-12-19'),
(5, 2, 1000, 'افغانی', 66.4, '2025-12-17'),
(6, 2, 2000, 'افغانی', 66.4, '2025-12-17'),
(7, 3, 100, 'افغانی', 66.4, '2025-12-17'),
(8, 3, 200, 'افغانی', 66.4, '2025-12-17'),
(9, 4, 1000, 'افغانی', 66.4, '2025-12-20'),
(12, 4, 0, 'دالر', 1, '2025-12-19'),
(13, 5, 100, 'دالر', 1, '2025-12-23'),
(14, 6, 100, 'افغانی', 66.5, '2025-12-23'),
(15, 7, 50, 'دالر', 1, '2025-12-23'),
(17, 4, 1000, 'افغانی', 66.5, '2025-12-23'),
(18, 8, 100, 'افغانی', 66.5, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `set_price`
--

CREATE TABLE `set_price` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `total_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `set_price`
--

INSERT INTO `set_price` (`id`, `name`, `type`, `ex_rate`, `total_price`) VALUES
(2, 'فوم دیزاین دلخواه', 'بلاک', 66.5, 700);

-- --------------------------------------------------------

--
-- Table structure for table `stack_bill_detail`
--

CREATE TABLE `stack_bill_detail` (
  `id` int(11) NOT NULL,
  `stack_to_m_detail_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `category` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_bill_detail`
--

INSERT INTO `stack_bill_detail` (`id`, `stack_to_m_detail_id`, `item_name`, `category`, `quantity`, `price`) VALUES
(1, 1, 'فوم بلاک 2x1', 'دانه ', 10, 1),
(2, 2, 'کاک 70*2', 'دانه', 80, 3),
(3, 3, 'کاک 70*2 تراکم 10', 'دانه', 20, 5);

-- --------------------------------------------------------

--
-- Table structure for table `stack_factory_registration`
--

CREATE TABLE `stack_factory_registration` (
  `id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_factory_registration`
--

INSERT INTO `stack_factory_registration` (`id`, `item_name`, `item_type`, `quantity`, `fixed_price`, `sell_price`, `currency`, `ex_rate`, `serial_number`, `date`) VALUES
(1, 'فوم بلاک 2x1', 'دانه ', 1, 0, 0, 'افغانی', 0, 1, '2025-12-17'),
(2, 'کاک 70*2', 'دانه', 100, 0, 0, 'undefined', 0, 3, '2025-12-23'),
(3, 'کاک 70*2 تراکم 10', 'دانه', 70, 0, 0, 'undefined', 0, 5, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `stack_factory_registration_list`
--

CREATE TABLE `stack_factory_registration_list` (
  `id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_factory_registration_list`
--

INSERT INTO `stack_factory_registration_list` (`id`, `item_name`, `item_type`, `quantity`, `fixed_price`, `sell_price`, `currency`, `ex_rate`, `serial_number`, `date`) VALUES
(1, 'فوم بلاک 2x1', 'دانه ', 0, 0, 0, 'undefined', 0, 1, '2025-12-17'),
(2, 'کاک 70*2', 'دانه', 20, 0, 0, 'undefined', 0, 3, '2025-12-23'),
(3, 'کاک 70*2 تراکم 10', 'دانه', 50, 0, 0, 'undefined', 0, 5, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `stack_raw_materials`
--

CREATE TABLE `stack_raw_materials` (
  `id` int(11) NOT NULL,
  `buy_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL DEFAULT 0,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `profit_per_one` float NOT NULL DEFAULT 0,
  `paid_amount` float NOT NULL DEFAULT 0,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL DEFAULT 1,
  `status` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL DEFAULT '',
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_raw_materials`
--

INSERT INTO `stack_raw_materials` (`id`, `buy_type`, `company_name`, `contact`, `bill_no`, `item_name`, `item_type`, `buy_place`, `description`, `quantity`, `price`, `profit_per_one`, `paid_amount`, `currency`, `ex_rate`, `status`, `date`) VALUES
(2, 'یکبار', 'شرکت مواد فوم فروشی کبیر', '0796323516', 1, 'مواد فوم', 'کیلوگرام', 'کابل', 'از درک خرید مواد فوم به منظور تولید فوم', 10, 200, 0, 0, 'افغانی', 66.5, '', '2025-12-22'),
(3, 'تن', 'بهمن', '5656565645', 2, 'پلی استرین', 'تن', 'ایران', 'از درک خرید مواد خام.', 20, 10, 0, 14000, 'دالر', 1, '', '2025-12-23'),
(4, 'یکبار ', 'بهمن', '565656', 3, 'پلی استرین 1000', 'تن', 'ایران', 'از درک خرید مواد خام', 10, 500, 0, 0, 'دالر', 1, '', '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `stack_raw_materials_lists`
--

CREATE TABLE `stack_raw_materials_lists` (
  `id` int(11) NOT NULL,
  `buy_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `profit_per_one` float NOT NULL,
  `paid_amount` float NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stack_to_market`
--

CREATE TABLE `stack_to_market` (
  `id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_to_market`
--

INSERT INTO `stack_to_market` (`id`, `item_name`, `item_type`, `fixed_price`, `sell_price`, `quantity`, `date`) VALUES
(1, 'فوم بلاک 2x1', 'دانه ', 1, 0, 10, '2025-12-17'),
(2, 'کاک 70*2', 'دانه', 3, 0, 80, '2025-12-23'),
(3, 'کاک 70*2 تراکم 10', 'دانه', 5, 0, 20, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `stack_to_market_details`
--

CREATE TABLE `stack_to_market_details` (
  `id` int(11) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  `bill_no` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_to_market_details`
--

INSERT INTO `stack_to_market_details` (`id`, `stuff_id`, `bill_no`, `date`) VALUES
(1, 1, 1, '2025-12-17'),
(2, 1, 2, '2025-12-23'),
(3, 1, 3, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `stack_to_market_list`
--

CREATE TABLE `stack_to_market_list` (
  `id` int(11) NOT NULL,
  `stack_factory_id` int(11) NOT NULL,
  `stack_to_market_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id` int(11) NOT NULL,
  `stack_to_market_list_id` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `total` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stack_to_market_lists`
--

CREATE TABLE `stack_to_market_lists` (
  `id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `quantity` float NOT NULL,
  `thickness` float NOT NULL DEFAULT 0,
  `remaining` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stack_to_market_lists`
--

INSERT INTO `stack_to_market_lists` (`id`, `item_name`, `item_type`, `fixed_price`, `sell_price`, `quantity`, `thickness`, `remaining`) VALUES
(1, 'فوم بلاک 2x1', 'دانه ', 0, 1, 4, 0, 0),
(2, 'کاک 70*2', 'دانه', 0, 3, 70, 0, 0),
(3, 'کاک 70*2 تراکم 10', 'دانه', 0, 5, 17, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `stuff_registration`
--

CREATE TABLE `stuff_registration` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `tazkira` int(11) NOT NULL,
  `address` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `job_place` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `job_type` varchar(30) COLLATE utf8mb4_persian_ci NOT NULL,
  `id_number` int(11) NOT NULL,
  `salary` float NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `stuff_registration`
--

INSERT INTO `stuff_registration` (`id`, `name`, `last_name`, `contact`, `email`, `tazkira`, `address`, `job_place`, `job_type`, `id_number`, `salary`, `image`, `date`) VALUES
(1, 'سخی ', 'محمدی', 796323516, 'undefined', 0, '-', 'مدیر اداری و مالی', 'فول تایم', 1, 15000, 'default.png', '2025-12-17');

-- --------------------------------------------------------

--
-- Table structure for table `taken_amount`
--

CREATE TABLE `taken_amount` (
  `id` int(11) NOT NULL,
  `stuff_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `taken_amount`
--

INSERT INTO `taken_amount` (`id`, `stuff_id`, `amount`, `currency`, `ex_rate`, `date`) VALUES
(1, 1, 0, 'افغانی', 67, '2025-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `authority` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_persian_ci NOT NULL,
  `profile` text COLLATE utf8mb4_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `full_name`, `authority`, `password`, `profile`) VALUES
(3, 'admin', 'admin', 'full', 'admin', 'my_cat.png'),
(4, 'masih', 'Masih Ahmadyar', 'full', 'masih', 'DSC_2964.png');

-- --------------------------------------------------------

--
-- Structure for view `rawmin`
--
DROP VIEW IF EXISTS `rawmin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `rawmin`  AS  select `stack_raw_materials`.`item_name` AS `item_name`,`stack_raw_materials`.`item_type` AS `item_type`,round(sum(`stack_raw_materials`.`quantity`),3) AS `totqunatity` from `stack_raw_materials` group by `stack_raw_materials`.`item_name`,`stack_raw_materials`.`item_type` ;

-- --------------------------------------------------------

--
-- Structure for view `rawmout`
--
DROP VIEW IF EXISTS `rawmout`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `rawmout`  AS  select `raw_material_each_mahsol`.`item_name` AS `item_name`,`raw_material_each_mahsol`.`item_type` AS `item_type`,round(sum(`raw_material_each_mahsol`.`quantity`),3) AS `mahsol_qnt` from `raw_material_each_mahsol` group by `raw_material_each_mahsol`.`item_name`,`raw_material_each_mahsol`.`item_type` ;

-- --------------------------------------------------------

--
-- Structure for view `remrawmaterial`
--
DROP VIEW IF EXISTS `remrawmaterial`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `remrawmaterial`  AS  select `rawmin`.`item_name` AS `item_name`,`rawmin`.`item_type` AS `item_type`,round((`rawmin`.`totqunatity` - `rawmout`.`mahsol_qnt`),3) AS `remainrawm` from (`rawmin` join `rawmout`) where ((`rawmin`.`item_type` = `rawmout`.`item_type`) and (`rawmin`.`item_name` = `rawmout`.`item_name`)) group by `rawmin`.`item_type`,`rawmin`.`item_name` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`),
  ADD KEY `item_id` (`item_name`);

--
-- Indexes for table `bill_items`
--
ALTER TABLE `bill_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_detail_id` (`bill_detail_id`),
  ADD KEY `stack_to_market_list_id` (`stack_to_market_list_id`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `constant`
--
ALTER TABLE `constant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_reg_id` (`item_reg_id`);

--
-- Indexes for table `create_mahsol`
--
ALTER TABLE `create_mahsol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raw_material_type_id` (`ready_material_type_id`);

--
-- Indexes for table `customer_account`
--
ALTER TABLE `customer_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `expense_category`
--
ALTER TABLE `expense_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `froshat_details`
--
ALTER TABLE `froshat_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cus_id` (`cus_id`);

--
-- Indexes for table `bill_payment`
--
ALTER TABLE `bill_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `froshat_details_id` (`froshat_details_id`);

--
-- Indexes for table `goods_registration`
--
ALTER TABLE `goods_registration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mar_mat_id` (`mar_mat_id`);

--
-- Indexes for table `incoming_loan`
--
ALTER TABLE `incoming_loan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `incoming_loan_list`
--
ALTER TABLE `incoming_loan_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incoming_loan_id` (`incoming_loan_id`);

--
-- Indexes for table `item_registration`
--
ALTER TABLE `item_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mahsol_price`
--
ALTER TABLE `mahsol_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `set_p_id` (`set_p_id`);

--
-- Indexes for table `market_material_reg`
--
ALTER TABLE `market_material_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_type`
--
ALTER TABLE `material_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outgoing_loan`
--
ALTER TABLE `outgoing_loan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stuff_id` (`stuff_id`);

--
-- Indexes for table `outgoing_loan_list`
--
ALTER TABLE `outgoing_loan_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `outgoing_loan_id` (`outgoing_loan_id`);

--
-- Indexes for table `partner_registration`
--
ALTER TABLE `partner_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_taken_amount`
--
ALTER TABLE `partner_taken_amount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `partner_id` (`partner_id`);

--
-- Indexes for table `payable_amount`
--
ALTER TABLE `payable_amount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stuff_id` (`stuff_id`);

--
-- Indexes for table `raw_materials`
--
ALTER TABLE `raw_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_material_each_mahsol`
--
ALTER TABLE `raw_material_each_mahsol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stack_factory_id` (`stack_factory_id`);

--
-- Indexes for table `ready_materials_type`
--
ALTER TABLE `ready_materials_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_bill`
--
ALTER TABLE `return_bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`);

--
-- Indexes for table `sales_payments`
--
ALTER TABLE `sales_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_id` (`sales_id`);

--
-- Indexes for table `set_price`
--
ALTER TABLE `set_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_bill_detail`
--
ALTER TABLE `stack_bill_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stack_to_m_detail_id` (`stack_to_m_detail_id`);

--
-- Indexes for table `stack_factory_registration`
--
ALTER TABLE `stack_factory_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_factory_registration_list`
--
ALTER TABLE `stack_factory_registration_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_raw_materials`
--
ALTER TABLE `stack_raw_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_raw_materials_lists`
--
ALTER TABLE `stack_raw_materials_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_to_market`
--
ALTER TABLE `stack_to_market`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stack_to_market_details`
--
ALTER TABLE `stack_to_market_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stuff_id` (`stuff_id`);

--
-- Indexes for table `stack_to_market_list`
--
ALTER TABLE `stack_to_market_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stack_factory_id` (`stack_factory_id`),
  ADD KEY `stack_to_market_id` (`stack_to_market_id`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stack_to_market_list_id` (`stack_to_market_list_id`);

--
-- Indexes for table `stack_to_market_lists`
--
ALTER TABLE `stack_to_market_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stuff_registration`
--
ALTER TABLE `stuff_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taken_amount`
--
ALTER TABLE `taken_amount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stuff_id` (`stuff_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill_details`
--
ALTER TABLE `bill_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `bill_items`
--
ALTER TABLE `bill_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `constant`
--
ALTER TABLE `constant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `create_mahsol`
--
ALTER TABLE `create_mahsol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `customer_account`
--
ALTER TABLE `customer_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `expense_category`
--
ALTER TABLE `expense_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `froshat_details`
--
ALTER TABLE `froshat_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `bill_payment`
--
ALTER TABLE `bill_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `goods_registration`
--
ALTER TABLE `goods_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `incoming_loan`
--
ALTER TABLE `incoming_loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `incoming_loan_list`
--
ALTER TABLE `incoming_loan_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `item_registration`
--
ALTER TABLE `item_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mahsol_price`
--
ALTER TABLE `mahsol_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `market_material_reg`
--
ALTER TABLE `market_material_reg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `material_type`
--
ALTER TABLE `material_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `outgoing_loan`
--
ALTER TABLE `outgoing_loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `outgoing_loan_list`
--
ALTER TABLE `outgoing_loan_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `partner_registration`
--
ALTER TABLE `partner_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `partner_taken_amount`
--
ALTER TABLE `partner_taken_amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payable_amount`
--
ALTER TABLE `payable_amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `raw_materials`
--
ALTER TABLE `raw_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `raw_material_each_mahsol`
--
ALTER TABLE `raw_material_each_mahsol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ready_materials_type`
--
ALTER TABLE `ready_materials_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `return_bill`
--
ALTER TABLE `return_bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sales_payments`
--
ALTER TABLE `sales_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `set_price`
--
ALTER TABLE `set_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `stack_bill_detail`
--
ALTER TABLE `stack_bill_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stack_factory_registration`
--
ALTER TABLE `stack_factory_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stack_factory_registration_list`
--
ALTER TABLE `stack_factory_registration_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stack_raw_materials`
--
ALTER TABLE `stack_raw_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `stack_raw_materials_lists`
--
ALTER TABLE `stack_raw_materials_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `stack_to_market`
--
ALTER TABLE `stack_to_market`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stack_to_market_details`
--
ALTER TABLE `stack_to_market_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stack_to_market_list`
--
ALTER TABLE `stack_to_market_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stack_to_market_lists`
--
ALTER TABLE `stack_to_market_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stuff_registration`
--
ALTER TABLE `stuff_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `taken_amount`
--
ALTER TABLE `taken_amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill_details`
--
ALTER TABLE `bill_details`
  ADD CONSTRAINT `bill_details_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `froshat_details` (`id`);

--
-- Constraints for table `bill_items`
--
ALTER TABLE `bill_items`
  ADD CONSTRAINT `bill_items_ibfk_1` FOREIGN KEY (`bill_detail_id`) REFERENCES `bill_details` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bill_items_ibfk_2` FOREIGN KEY (`stack_to_market_list_id`) REFERENCES `stack_to_market_lists` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `constant`
--
ALTER TABLE `constant`
  ADD CONSTRAINT `constant_ibfk_1` FOREIGN KEY (`item_reg_id`) REFERENCES `item_registration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `create_mahsol`
--
ALTER TABLE `create_mahsol`
  ADD CONSTRAINT `create_mahsol_ibfk_1` FOREIGN KEY (`ready_material_type_id`) REFERENCES `ready_materials_type` (`id`);

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `expense_category` (`id`);

--
-- Constraints for table `froshat_details`
--
ALTER TABLE `froshat_details`
  ADD CONSTRAINT `froshat_details_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer_account` (`id`);

--
-- Constraints for table `bill_payment`
--
ALTER TABLE `bill_payment`
  ADD CONSTRAINT `bill_payment_ibfk_1` FOREIGN KEY (`froshat_details_id`) REFERENCES `froshat_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `goods_registration`
--
ALTER TABLE `goods_registration`
  ADD CONSTRAINT `goods_registration_ibfk_1` FOREIGN KEY (`mar_mat_id`) REFERENCES `market_material_reg` (`id`);

--
-- Constraints for table `incoming_loan_list`
--
ALTER TABLE `incoming_loan_list`
  ADD CONSTRAINT `incoming_loan_list_ibfk_1` FOREIGN KEY (`incoming_loan_id`) REFERENCES `incoming_loan` (`id`);

--
-- Constraints for table `mahsol_price`
--
ALTER TABLE `mahsol_price`
  ADD CONSTRAINT `mahsol_price_ibfk_1` FOREIGN KEY (`set_p_id`) REFERENCES `set_price` (`id`);

--
-- Constraints for table `outgoing_loan`
--
ALTER TABLE `outgoing_loan`
  ADD CONSTRAINT `outgoing_loan_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`);

--
-- Constraints for table `outgoing_loan_list`
--
ALTER TABLE `outgoing_loan_list`
  ADD CONSTRAINT `outgoing_loan_list_ibfk_1` FOREIGN KEY (`outgoing_loan_id`) REFERENCES `outgoing_loan` (`id`);

--
-- Constraints for table `partner_taken_amount`
--
ALTER TABLE `partner_taken_amount`
  ADD CONSTRAINT `partner_taken_amount_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partner_registration` (`id`);

--
-- Constraints for table `return_bill`
--
ALTER TABLE `return_bill`
  ADD CONSTRAINT `return_bill_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `froshat_details` (`id`);

--
-- Constraints for table `sales_payments`
--
ALTER TABLE `sales_payments`
  ADD CONSTRAINT `sales_payments_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `froshat_details` (`id`);

--
-- Constraints for table `stack_bill_detail`
--
ALTER TABLE `stack_bill_detail`
  ADD CONSTRAINT `stack_bill_detail_ibfk_1` FOREIGN KEY (`stack_to_m_detail_id`) REFERENCES `stack_to_market_details` (`id`);

--
-- Constraints for table `stack_to_market_details`
--
ALTER TABLE `stack_to_market_details`
  ADD CONSTRAINT `stack_to_market_details_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`);

--
-- Constraints for table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `income_ibfk_1` FOREIGN KEY (`stack_to_market_list_id`) REFERENCES `stack_to_market_lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stack_to_market_list`
--
ALTER TABLE `stack_to_market_list`
  ADD CONSTRAINT `stack_to_market_list_ibfk_1` FOREIGN KEY (`stack_factory_id`) REFERENCES `stack_factory_registration` (`id`),
  ADD CONSTRAINT `stack_to_market_list_ibfk_2` FOREIGN KEY (`stack_to_market_id`) REFERENCES `stack_to_market` (`id`);

--
-- Constraints for table `taken_amount`
--
ALTER TABLE `taken_amount`
  ADD CONSTRAINT `taken_amount_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`);

DELIMITER $$

--
-- Trigger to calculate total (thickness / quantity) in income table
-- Gets thickness from stack_to_market_lists table
--
CREATE TRIGGER `income_before_insert` BEFORE INSERT ON `income`
FOR EACH ROW
BEGIN
  SET NEW.total =NEW.quantity/ (SELECT thickness FROM `stack_to_market_lists` WHERE id = NEW.stack_to_market_list_id);
END$$

CREATE TRIGGER `income_before_update` BEFORE UPDATE ON `income`
FOR EACH ROW
BEGIN
  SET NEW.total = NEW.quantity/ (SELECT thickness FROM `stack_to_market_lists` WHERE id = NEW.stack_to_market_list_id);
END$$

--
-- Trigger to update remaining in stack_to_market_lists after income insert/update/delete
--
CREATE TRIGGER `update_remaining_after_income` AFTER INSERT ON `income`
FOR EACH ROW
BEGIN
  UPDATE `stack_to_market_lists` stml
  SET stml.remaining = (
    COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
    COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
  )
  WHERE stml.id = NEW.stack_to_market_list_id;
END$$

CREATE TRIGGER `update_remaining_after_income_update` AFTER UPDATE ON `income`
FOR EACH ROW
BEGIN
  UPDATE `stack_to_market_lists` stml
  SET stml.remaining = (
    COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
    COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
  )
  WHERE stml.id = NEW.stack_to_market_list_id;
END$$

CREATE TRIGGER `update_remaining_after_income_delete` AFTER DELETE ON `income`
FOR EACH ROW
BEGIN
  UPDATE `stack_to_market_lists` stml
  SET stml.remaining = (
    COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
    COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
  )
  WHERE stml.id = OLD.stack_to_market_list_id;
END$$

--
-- Trigger to update remaining in stack_to_market_lists after bill_items insert/update/delete
--
CREATE TRIGGER `update_remaining_after_bill_items_insert` AFTER INSERT ON `bill_items`
FOR EACH ROW
BEGIN
  IF NEW.stack_to_market_list_id IS NOT NULL THEN
    UPDATE `stack_to_market_lists` stml
    SET stml.remaining = (
      COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
      COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
    )
    WHERE stml.id = NEW.stack_to_market_list_id;
  END IF;
END$$

CREATE TRIGGER `update_remaining_after_bill_items_update` AFTER UPDATE ON `bill_items`
FOR EACH ROW
BEGIN
  IF NEW.stack_to_market_list_id IS NOT NULL THEN
    UPDATE `stack_to_market_lists` stml
    SET stml.remaining = (
      COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
      COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
    )
    WHERE stml.id = NEW.stack_to_market_list_id;
  END IF;
  
  IF OLD.stack_to_market_list_id IS NOT NULL AND OLD.stack_to_market_list_id != NEW.stack_to_market_list_id THEN
    UPDATE `stack_to_market_lists` stml
    SET stml.remaining = (
      COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
      COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
    )
    WHERE stml.id = OLD.stack_to_market_list_id;
  END IF;
END$$

CREATE TRIGGER `update_remaining_after_bill_items_delete` AFTER DELETE ON `bill_items`
FOR EACH ROW
BEGIN
  IF OLD.stack_to_market_list_id IS NOT NULL THEN
    UPDATE `stack_to_market_lists` stml
    SET stml.remaining = (
      COALESCE((SELECT SUM(total) FROM `income` WHERE stack_to_market_list_id = stml.id), 0) - 
      COALESCE((SELECT SUM(quantity) FROM `bill_items` WHERE stack_to_market_list_id = stml.id), 0)
    )
    WHERE stml.id = OLD.stack_to_market_list_id;
  END IF;
END$$

--
-- Triggers to update paid_amount in froshat_details from bill_payment
-- This makes paid_amount behave like a virtual column calculated from payments
--
CREATE TRIGGER `update_paid_amount_after_bill_payment_insert` AFTER INSERT ON `bill_payment`
FOR EACH ROW
BEGIN
  UPDATE `froshat_details` fd
  SET fd.paid_amount = (
    COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
  )
  WHERE fd.id = NEW.froshat_details_id;
END$$

CREATE TRIGGER `update_paid_amount_after_bill_payment_update` AFTER UPDATE ON `bill_payment`
FOR EACH ROW
BEGIN
  -- Update for the new froshat_details_id
  UPDATE `froshat_details` fd
  SET fd.paid_amount = (
    COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
  )
  WHERE fd.id = NEW.froshat_details_id;
  
  -- Update for the old froshat_details_id if it changed
  IF OLD.froshat_details_id != NEW.froshat_details_id THEN
    UPDATE `froshat_details` fd
    SET fd.paid_amount = (
      COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
    )
    WHERE fd.id = OLD.froshat_details_id;
  END IF;
END$$

CREATE TRIGGER `update_paid_amount_after_bill_payment_delete` AFTER DELETE ON `bill_payment`
FOR EACH ROW
BEGIN
  UPDATE `froshat_details` fd
  SET fd.paid_amount = (
    COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
  )
  WHERE fd.id = OLD.froshat_details_id;
END$$

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `min_1_day` ON SCHEDULE EVERY 1 DAY STARTS '2021-03-20 10:40:36' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE item_registration set machine_life = machine_life-1$$

DELIMITER ;
COMMIT;

-- Fix for stack_raw_materials table: Update price column to handle invalid data
-- Run this ALTER TABLE statement if the table already exists:
-- ALTER TABLE `stack_raw_materials` 
--   MODIFY `price` decimal(10,2) NOT NULL DEFAULT 0.00,
--   MODIFY `quantity` float NOT NULL DEFAULT 0,
--   MODIFY `profit_per_one` float NOT NULL DEFAULT 0,
--   MODIFY `paid_amount` float NOT NULL DEFAULT 0,
--   MODIFY `ex_rate` float NOT NULL DEFAULT 1,
--   MODIFY `status` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL DEFAULT '';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
