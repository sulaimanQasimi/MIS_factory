-- phpMyAdmin SQL Dump
-- Table structure for table `bill_items`
-- This table stores individual items linked to bill_details

CREATE TABLE `bill_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_detail_id` int(11) NOT NULL,
  `item_name` varchar(50) COLLATE utf8mb4_persian_ci NOT NULL,
  `item_type` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `quantity` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_detail_id` (`bill_detail_id`),
  CONSTRAINT `bill_items_ibfk_1` FOREIGN KEY (`bill_detail_id`) REFERENCES `bill_details` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- Indexes for table `bill_items`
ALTER TABLE `bill_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_detail_id` (`bill_detail_id`);

-- Constraints for table `bill_items`
ALTER TABLE `bill_items`
  ADD CONSTRAINT `bill_items_ibfk_1` FOREIGN KEY (`bill_detail_id`) REFERENCES `bill_details` (`id`) ON DELETE CASCADE;

-- AUTO_INCREMENT for table `bill_items`
ALTER TABLE `bill_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
