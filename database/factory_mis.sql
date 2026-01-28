/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : f2

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 28/01/2026 08:48:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill_details
-- ----------------------------
DROP TABLE IF EXISTS `bill_details`;
CREATE TABLE `bill_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bill_id`(`bill_id` ASC) USING BTREE,
  INDEX `item_id`(`item_name` ASC) USING BTREE,
  CONSTRAINT `bill_details_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `froshat_details` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for bill_items
-- ----------------------------
DROP TABLE IF EXISTS `bill_items`;
CREATE TABLE `bill_items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_detail_id` int NOT NULL,
  `stack_factory_registration_id` int NULL DEFAULT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `thickness` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bill_detail_id`(`bill_detail_id` ASC) USING BTREE,
  INDEX `stack_factory_registration_id`(`stack_factory_registration_id` ASC) USING BTREE,
  CONSTRAINT `bill_items_ibfk_2` FOREIGN KEY (`stack_factory_registration_id`) REFERENCES `stack_factory_registration_list` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for bill_payment
-- ----------------------------
DROP TABLE IF EXISTS `bill_payment`;
CREATE TABLE `bill_payment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `froshat_details_id` int NOT NULL,
  `paid_amount` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `payment_date` date NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `froshat_details_id`(`froshat_details_id` ASC) USING BTREE,
  CONSTRAINT `bill_payment_ibfk_1` FOREIGN KEY (`froshat_details_id`) REFERENCES `froshat_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for company_info
-- ----------------------------
DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `website` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `logo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `backup_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `starting_activity` date NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for constant
-- ----------------------------
DROP TABLE IF EXISTS `constant`;
CREATE TABLE `constant`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_reg_id` int NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `item_reg_id`(`item_reg_id` ASC) USING BTREE,
  CONSTRAINT `constant_ibfk_1` FOREIGN KEY (`item_reg_id`) REFERENCES `item_registration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for create_mahsol
-- ----------------------------
DROP TABLE IF EXISTS `create_mahsol`;
CREATE TABLE `create_mahsol`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ready_material_type_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `raw_material_type_id`(`ready_material_type_id` ASC) USING BTREE,
  CONSTRAINT `create_mahsol_ibfk_1` FOREIGN KEY (`ready_material_type_id`) REFERENCES `ready_materials_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for customer_account
-- ----------------------------
DROP TABLE IF EXISTS `customer_account`;
CREATE TABLE `customer_account`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NULL DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for expense_category
-- ----------------------------
DROP TABLE IF EXISTS `expense_category`;
CREATE TABLE `expense_category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for expenses
-- ----------------------------
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE `expenses`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id` ASC) USING BTREE,
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `expense_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for froshat_details
-- ----------------------------
DROP TABLE IF EXISTS `froshat_details`;
CREATE TABLE `froshat_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cus_id` int NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NULL DEFAULT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int NOT NULL,
  `total_amount` float NOT NULL,
  `paid_amount` float NOT NULL DEFAULT 0,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  `remaining_amount` float GENERATED ALWAYS AS ((`total_amount` - `paid_amount`)) VIRTUAL NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cus_id`(`cus_id` ASC) USING BTREE,
  CONSTRAINT `froshat_details_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer_account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for goods_registration
-- ----------------------------
DROP TABLE IF EXISTS `goods_registration`;
CREATE TABLE `goods_registration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `mar_mat_id` int NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `goods_no` int NOT NULL,
  `expiration_date` date NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `mar_mat_id`(`mar_mat_id` ASC) USING BTREE,
  CONSTRAINT `goods_registration_ibfk_1` FOREIGN KEY (`mar_mat_id`) REFERENCES `market_material_reg` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for incoming_loan
-- ----------------------------
DROP TABLE IF EXISTS `incoming_loan`;
CREATE TABLE `incoming_loan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrower` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `lender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `amount` float NOT NULL,
  `installment_no` int NOT NULL,
  `lender_contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `benefit` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for incoming_loan_list
-- ----------------------------
DROP TABLE IF EXISTS `incoming_loan_list`;
CREATE TABLE `incoming_loan_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `incoming_loan_id` int NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `incoming_loan_id`(`incoming_loan_id` ASC) USING BTREE,
  CONSTRAINT `incoming_loan_list_ibfk_1` FOREIGN KEY (`incoming_loan_id`) REFERENCES `incoming_loan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for item_registration
-- ----------------------------
DROP TABLE IF EXISTS `item_registration`;
CREATE TABLE `item_registration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `purchase_price` float NOT NULL,
  `machine_life` int NULL DEFAULT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mahsol_price
-- ----------------------------
DROP TABLE IF EXISTS `mahsol_price`;
CREATE TABLE `mahsol_price`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `set_p_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `set_p_id`(`set_p_id` ASC) USING BTREE,
  CONSTRAINT `mahsol_price_ibfk_1` FOREIGN KEY (`set_p_id`) REFERENCES `set_price` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for market_material_reg
-- ----------------------------
DROP TABLE IF EXISTS `market_material_reg`;
CREATE TABLE `market_material_reg`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name_id` int NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for material_type
-- ----------------------------
DROP TABLE IF EXISTS `material_type`;
CREATE TABLE `material_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `serial_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for outgoing_loan
-- ----------------------------
DROP TABLE IF EXISTS `outgoing_loan`;
CREATE TABLE `outgoing_loan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stuff_id` int NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `amount` float NOT NULL,
  `installment_no` int NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `tazkira` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stuff_id`(`stuff_id` ASC) USING BTREE,
  CONSTRAINT `outgoing_loan_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for outgoing_loan_list
-- ----------------------------
DROP TABLE IF EXISTS `outgoing_loan_list`;
CREATE TABLE `outgoing_loan_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `outgoing_loan_id` int NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `outgoing_loan_id`(`outgoing_loan_id` ASC) USING BTREE,
  CONSTRAINT `outgoing_loan_list_ibfk_1` FOREIGN KEY (`outgoing_loan_id`) REFERENCES `outgoing_loan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for partner_registration
-- ----------------------------
DROP TABLE IF EXISTS `partner_registration`;
CREATE TABLE `partner_registration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `participant_percentage` int NOT NULL,
  `document` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for partner_taken_amount
-- ----------------------------
DROP TABLE IF EXISTS `partner_taken_amount`;
CREATE TABLE `partner_taken_amount`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `partner_id` int NOT NULL,
  `amount` float NOT NULL,
  `document` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `partner_id`(`partner_id` ASC) USING BTREE,
  CONSTRAINT `partner_taken_amount_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partner_registration` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for payable_amount
-- ----------------------------
DROP TABLE IF EXISTS `payable_amount`;
CREATE TABLE `payable_amount`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stuff_id` int NOT NULL,
  `taken_amount` float NOT NULL,
  `tax` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `overtime` float NOT NULL,
  `payable` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL DEFAULT 'باقی',
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stuff_id`(`stuff_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for raw_material_each_mahsol
-- ----------------------------
DROP TABLE IF EXISTS `raw_material_each_mahsol`;
CREATE TABLE `raw_material_each_mahsol`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stack_factory_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stack_factory_id`(`stack_factory_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for raw_materials
-- ----------------------------
DROP TABLE IF EXISTS `raw_materials`;
CREATE TABLE `raw_materials`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `but_type` int NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `profit_per_one` float NOT NULL,
  `paid_amount` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ready_materials_type
-- ----------------------------
DROP TABLE IF EXISTS `ready_materials_type`;
CREATE TABLE `ready_materials_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `serial_no` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for return_bill
-- ----------------------------
DROP TABLE IF EXISTS `return_bill`;
CREATE TABLE `return_bill`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bill_id`(`bill_id` ASC) USING BTREE,
  CONSTRAINT `return_bill_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `froshat_details` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sales_payments
-- ----------------------------
DROP TABLE IF EXISTS `sales_payments`;
CREATE TABLE `sales_payments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `sales_id` int NOT NULL,
  `paid` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sales_id`(`sales_id` ASC) USING BTREE,
  CONSTRAINT `sales_payments_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `froshat_details` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for set_price
-- ----------------------------
DROP TABLE IF EXISTS `set_price`;
CREATE TABLE `set_price`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `total_price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_bill_detail
-- ----------------------------
DROP TABLE IF EXISTS `stack_bill_detail`;
CREATE TABLE `stack_bill_detail`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stack_to_m_detail_id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `category` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stack_to_m_detail_id`(`stack_to_m_detail_id` ASC) USING BTREE,
  CONSTRAINT `stack_bill_detail_ibfk_1` FOREIGN KEY (`stack_to_m_detail_id`) REFERENCES `stack_to_market_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_factory_registration
-- ----------------------------
DROP TABLE IF EXISTS `stack_factory_registration`;
CREATE TABLE `stack_factory_registration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_factory_registration_list
-- ----------------------------
DROP TABLE IF EXISTS `stack_factory_registration_list`;
CREATE TABLE `stack_factory_registration_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL,
  `serial_number` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_raw_materials
-- ----------------------------
DROP TABLE IF EXISTS `stack_raw_materials`;
CREATE TABLE `stack_raw_materials`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `buy_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL DEFAULT 0,
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `profit_per_one` float NOT NULL DEFAULT 0,
  `paid_amount` float NOT NULL DEFAULT 0,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` float NOT NULL DEFAULT 1,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL DEFAULT '',
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_raw_materials_lists
-- ----------------------------
DROP TABLE IF EXISTS `stack_raw_materials_lists`;
CREATE TABLE `stack_raw_materials_lists`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `buy_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `bill_no` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `buy_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  `profit_per_one` float NOT NULL,
  `paid_amount` float NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_to_market
-- ----------------------------
DROP TABLE IF EXISTS `stack_to_market`;
CREATE TABLE `stack_to_market`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `quantity` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_to_market_details
-- ----------------------------
DROP TABLE IF EXISTS `stack_to_market_details`;
CREATE TABLE `stack_to_market_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stuff_id` int NOT NULL,
  `bill_no` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stuff_id`(`stuff_id` ASC) USING BTREE,
  CONSTRAINT `stack_to_market_details_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_to_market_list
-- ----------------------------
DROP TABLE IF EXISTS `stack_to_market_list`;
CREATE TABLE `stack_to_market_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stack_factory_id` int NOT NULL,
  `stack_to_market_id` int NOT NULL,
  `quantity` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stack_factory_id`(`stack_factory_id` ASC) USING BTREE,
  INDEX `stack_to_market_id`(`stack_to_market_id` ASC) USING BTREE,
  CONSTRAINT `stack_to_market_list_ibfk_1` FOREIGN KEY (`stack_factory_id`) REFERENCES `stack_factory_registration` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stack_to_market_list_ibfk_2` FOREIGN KEY (`stack_to_market_id`) REFERENCES `stack_to_market` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stack_to_market_lists
-- ----------------------------
DROP TABLE IF EXISTS `stack_to_market_lists`;
CREATE TABLE `stack_to_market_lists`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `fixed_price` float NOT NULL,
  `sell_price` float NOT NULL,
  `quantity` float NOT NULL,
  `remaining` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for stuff_registration
-- ----------------------------
DROP TABLE IF EXISTS `stuff_registration`;
CREATE TABLE `stuff_registration`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `last_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `contact` int NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `tazkira` int NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `job_place` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `job_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `id_number` int NOT NULL,
  `salary` float NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for taken_amount
-- ----------------------------
DROP TABLE IF EXISTS `taken_amount`;
CREATE TABLE `taken_amount`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `stuff_id` int NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `ex_rate` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `stuff_id`(`stuff_id` ASC) USING BTREE,
  CONSTRAINT `taken_amount_ibfk_1` FOREIGN KEY (`stuff_id`) REFERENCES `stuff_registration` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_persian_ci NOT NULL,
  `authority` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  `profile` text CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_persian_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- View structure for rawmin
-- ----------------------------
DROP VIEW IF EXISTS `rawmin`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `rawmin` AS select `stack_raw_materials`.`item_name` AS `item_name`,`stack_raw_materials`.`item_type` AS `item_type`,round(sum(`stack_raw_materials`.`quantity`),3) AS `totqunatity` from `stack_raw_materials` group by `stack_raw_materials`.`item_name`,`stack_raw_materials`.`item_type`;

-- ----------------------------
-- View structure for rawmout
-- ----------------------------
DROP VIEW IF EXISTS `rawmout`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `rawmout` AS select `raw_material_each_mahsol`.`item_name` AS `item_name`,`raw_material_each_mahsol`.`item_type` AS `item_type`,round(sum(`raw_material_each_mahsol`.`quantity`),3) AS `mahsol_qnt` from `raw_material_each_mahsol` group by `raw_material_each_mahsol`.`item_name`,`raw_material_each_mahsol`.`item_type`;

-- ----------------------------
-- View structure for remrawmaterial
-- ----------------------------
DROP VIEW IF EXISTS `remrawmaterial`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `remrawmaterial` AS select `rawmin`.`item_name` AS `item_name`,`rawmin`.`item_type` AS `item_type`,round((`rawmin`.`totqunatity` - `rawmout`.`mahsol_qnt`),3) AS `remainrawm` from (`rawmin` join `rawmout`) where ((`rawmin`.`item_type` = `rawmout`.`item_type`) and (`rawmin`.`item_name` = `rawmout`.`item_name`)) group by `rawmin`.`item_type`,`rawmin`.`item_name`;

-- ----------------------------
-- Event structure for min_1_day
-- ----------------------------
DROP EVENT IF EXISTS `min_1_day`;
delimiter ;;
CREATE EVENT `min_1_day`
ON SCHEDULE
EVERY '1' DAY STARTS '2021-03-20 10:40:36'
DO UPDATE item_registration set machine_life = machine_life-1
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table bill_items
-- ----------------------------
DROP TRIGGER IF EXISTS `update_quantity_after_bill_items_insert`;
delimiter ;;
CREATE TRIGGER `update_quantity_after_bill_items_insert` AFTER INSERT ON `bill_items` FOR EACH ROW BEGIN
  IF NEW.stack_factory_registration_id IS NOT NULL THEN
    UPDATE `stack_factory_registration_list` sfr
    SET sfr.quantity = sfr.quantity - (NEW.quantity * NEW.thickness)
    WHERE sfr.id = NEW.stack_factory_registration_id;
  END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table bill_items
-- ----------------------------
DROP TRIGGER IF EXISTS `update_quantity_after_bill_items_delete`;
delimiter ;;
CREATE TRIGGER `update_quantity_after_bill_items_delete` AFTER DELETE ON `bill_items` FOR EACH ROW BEGIN
  IF OLD.stack_factory_registration_id IS NOT NULL THEN
    UPDATE `stack_factory_registration_list` sfr
    SET sfr.quantity = sfr.quantity + (OLD.quantity * OLD.thickness)
    WHERE sfr.id = OLD.stack_factory_registration_id;
  END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table bill_payment
-- ----------------------------
DROP TRIGGER IF EXISTS `update_paid_amount_after_bill_payment_insert`;
delimiter ;;
CREATE TRIGGER `update_paid_amount_after_bill_payment_insert` AFTER INSERT ON `bill_payment` FOR EACH ROW BEGIN
  UPDATE `froshat_details` fd
  SET fd.paid_amount = (
    COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
  )
  WHERE fd.id = NEW.froshat_details_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table bill_payment
-- ----------------------------
DROP TRIGGER IF EXISTS `update_paid_amount_after_bill_payment_update`;
delimiter ;;
CREATE TRIGGER `update_paid_amount_after_bill_payment_update` AFTER UPDATE ON `bill_payment` FOR EACH ROW BEGIN
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
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table bill_payment
-- ----------------------------
DROP TRIGGER IF EXISTS `update_paid_amount_after_bill_payment_delete`;
delimiter ;;
CREATE TRIGGER `update_paid_amount_after_bill_payment_delete` AFTER DELETE ON `bill_payment` FOR EACH ROW BEGIN
  UPDATE `froshat_details` fd
  SET fd.paid_amount = (
    COALESCE((SELECT SUM(paid_amount) FROM `bill_payment` WHERE froshat_details_id = fd.id), 0)
  )
  WHERE fd.id = OLD.froshat_details_id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
