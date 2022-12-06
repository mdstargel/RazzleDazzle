-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for horse_site
DROP DATABASE IF EXISTS `horse_site`;
CREATE DATABASE IF NOT EXISTS `horse_site` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `horse_site`;

-- Dumping structure for table horse_site.appointment
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `AID` int NOT NULL AUTO_INCREMENT,
  `Appointment_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Appointment_Date` date NOT NULL,
  `Appointment_Start_Time` time NOT NULL,
  `Appointment_End_Time` time DEFAULT NULL,
  `Appointment_Riding_Style` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Appointment_Difficulty` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Beginner',
  `Appointment_Description` varchar(560) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Appointment_Public_Notes` varchar(560) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Appointment_Private_Notes` varchar(560) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Appointment_Group` tinyint NOT NULL DEFAULT '0',
  `Appointment_Group_Size` int NOT NULL DEFAULT '1',
  `Appointment_TID_1` int DEFAULT NULL,
  `Appointment_TID_2` int DEFAULT NULL,
  `Appointment_GID` int DEFAULT NULL,
  PRIMARY KEY (`AID`) USING BTREE,
  KEY `GID` (`Appointment_GID`) USING BTREE,
  KEY `TID 1` (`Appointment_TID_1`) USING BTREE,
  KEY `TID 2` (`Appointment_TID_2`) USING BTREE,
  CONSTRAINT `GID` FOREIGN KEY (`Appointment_GID`) REFERENCES `customer_group` (`GID`),
  CONSTRAINT `TID_1` FOREIGN KEY (`Appointment_TID_1`) REFERENCES `trainer` (`TID`),
  CONSTRAINT `TID_2` FOREIGN KEY (`Appointment_TID_2`) REFERENCES `trainer` (`TID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.appointment: ~23 rows (approximately)
DELETE FROM `appointment`;
INSERT INTO `appointment` (`AID`, `Appointment_Name`, `Appointment_Date`, `Appointment_Start_Time`, `Appointment_End_Time`, `Appointment_Riding_Style`, `Appointment_Difficulty`, `Appointment_Description`, `Appointment_Public_Notes`, `Appointment_Private_Notes`, `Appointment_Group`, `Appointment_Group_Size`, `Appointment_TID_1`, `Appointment_TID_2`, `Appointment_GID`) VALUES
	(9, '', '2022-11-29', '00:00:00', '18:38:00', 'dada', 'dada', '', '', '', 1, 1, 5, 5, NULL),
	(10, '', '2022-12-05', '18:02:00', '18:02:00', 'Sup', 'sup', '', '', '', 1, 1, 5, 5, NULL),
	(11, '', '2022-11-29', '18:54:00', '23:54:00', 'Southern', 'Beginner', '', '', '', 1, 1, 5, 5, NULL),
	(12, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(13, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(14, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(15, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(16, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(17, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(18, '', '2022-11-29', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(19, '', '2022-12-05', '18:56:00', '21:56:00', 'Northern', 'Beginner', '', '', '', 0, 1, 5, 5, NULL),
	(20, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(21, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(22, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(23, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(24, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(25, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(26, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(27, '', '2022-11-30', '00:53:00', '01:53:00', 'ASDf', 'aADF', '', '', '', 1, 3, 5, 5, NULL),
	(28, '', '2022-11-30', '10:35:00', '10:35:00', 'sup', 'sup', '', '', '', 1, 3, 5, 5, NULL),
	(29, '', '2022-11-30', '10:35:00', '10:35:00', 'sup', 'sup', '', '', '', 1, 3, 5, 5, NULL),
	(30, '', '2022-12-01', '22:38:00', '22:38:00', 'sup', 'sup', '', '', '', 1, 4, 5, 5, NULL),
	(31, '', '2022-12-04', '15:49:00', '15:49:00', 'Rodeo', 'intermediate', '', '', '', 1, 2, 5, 5, NULL);

-- Dumping structure for table horse_site.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `CID` int NOT NULL AUTO_INCREMENT,
  `Customer_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Customer_Address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Customer_Phone_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Customer_Email_Address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Customer_Emergency_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Customer_Emergency_Phone_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Customer_Difficulty` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Beginner',
  `Customer_Phone_Notifications` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.customer: ~9 rows (approximately)
DELETE FROM `customer`;
INSERT INTO `customer` (`CID`, `Customer_Name`, `Customer_Address`, `Customer_Phone_Number`, `Customer_Email_Address`, `Customer_Emergency_Name`, `Customer_Emergency_Phone_Number`, `Customer_Difficulty`, `Customer_Phone_Notifications`) VALUES
	(13, 'Ricardo Harris', '301 Slate Ln', '843-475-3681', 'REHarris@csustudent.net', NULL, NULL, 'Beginner', 1),
	(15, 'bb', '', 'b', 'b', NULL, NULL, 'Intermediate', 1),
	(16, 'a a', '', 'a', 'a', NULL, NULL, 'Beginner', 1),
	(17, 'c c', '', 'c', 'c', NULL, NULL, 'Beginner', 1),
	(18, 'd d', '', 'dd', 'd', NULL, NULL, 'Beginner', 1),
	(19, 'e e', '', 'e', 'e', NULL, NULL, 'Beginner', 1),
	(20, 'f f', '', 'f', 'f', NULL, NULL, 'Beginner', 1),
	(21, 'g g', '', 'g', 'g', NULL, NULL, 'Beginner', 1),
	(22, 'Customer Account', '', '12345678', 'CA@gmail.com', NULL, NULL, 'Beginner', 0);

-- Dumping structure for table horse_site.customer_group
DROP TABLE IF EXISTS `customer_group`;
CREATE TABLE IF NOT EXISTS `customer_group` (
  `GID` int NOT NULL AUTO_INCREMENT,
  `CID_1` int DEFAULT NULL,
  `CID_2` int DEFAULT NULL,
  `CID_3` int DEFAULT NULL,
  `CID_4` int DEFAULT NULL,
  PRIMARY KEY (`GID`) USING BTREE,
  KEY `FOREIGN` (`CID_1`,`CID_2`,`CID_3`,`CID_4`) USING BTREE,
  KEY `CID 2` (`CID_2`) USING BTREE,
  KEY `CID 3` (`CID_3`) USING BTREE,
  KEY `CID 4` (`CID_4`) USING BTREE,
  CONSTRAINT `CID_1` FOREIGN KEY (`CID_1`) REFERENCES `customer` (`CID`),
  CONSTRAINT `CID_2` FOREIGN KEY (`CID_2`) REFERENCES `customer` (`CID`),
  CONSTRAINT `CID_3` FOREIGN KEY (`CID_3`) REFERENCES `customer` (`CID`),
  CONSTRAINT `CID_4` FOREIGN KEY (`CID_4`) REFERENCES `customer` (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.customer_group: ~1 rows (approximately)
DELETE FROM `customer_group`;
INSERT INTO `customer_group` (`GID`, `CID_1`, `CID_2`, `CID_3`, `CID_4`) VALUES
	(13, 13, NULL, NULL, NULL);

-- Dumping structure for table horse_site.forgot_password
DROP TABLE IF EXISTS `forgot_password`;
CREATE TABLE IF NOT EXISTS `forgot_password` (
  `Forgot_Email` varchar(50) NOT NULL,
  `Forgot_Key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.forgot_password: ~0 rows (approximately)
DELETE FROM `forgot_password`;

-- Dumping structure for table horse_site.login
DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `Login_Email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Login_Password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CID` int DEFAULT NULL,
  `TID` int DEFAULT NULL,
  `Decomissioned` tinyint DEFAULT NULL,
  `Administrator` tinyint NOT NULL DEFAULT '0',
  UNIQUE KEY `EMAIL` (`Login_Email`) USING BTREE,
  KEY `FOREIGN` (`CID`,`TID`) USING BTREE,
  KEY `TID` (`TID`),
  CONSTRAINT `CID` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`),
  CONSTRAINT `TID` FOREIGN KEY (`TID`) REFERENCES `trainer` (`TID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.login: ~14 rows (approximately)
DELETE FROM `login`;
INSERT INTO `login` (`Login_Email`, `Login_Password`, `CID`, `TID`, `Decomissioned`, `Administrator`) VALUES
	('a', 'a', 16, NULL, 1, 0),
	('b', 'b', 15, NULL, 0, 0),
	('c', 'c', 17, NULL, 1, 0),
	('CA@gmail.com', 'password', 22, NULL, 0, 0),
	('d', 'd', 18, NULL, 1, 0),
	('e', 'e', 19, NULL, 1, 0),
	('f', 'f', 20, NULL, 1, 0),
	('g', 'g', 21, NULL, 1, 0),
	('i', 'P@ssw0rd', NULL, 13, 1, 0),
	('j', 'P@ssw0rd', NULL, 9, 0, 0),
	('jdjd@jd.com', 'P@ssw0rd', NULL, 14, 0, 0),
	('REHarris@csustudent.net', 'password', 13, NULL, 0, 0),
	('riconosuave@gmail.com', 'password', NULL, 7, 0, 0),
	('test@gmail.com', 'password1', NULL, 8, 0, 1);

-- Dumping structure for table horse_site.news
DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `NID` int NOT NULL AUTO_INCREMENT,
  `News_Image_URL` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `News_Title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `News_Link` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `News_Description` varchar(560) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`NID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.news: ~5 rows (approximately)
DELETE FROM `news`;
INSERT INTO `news` (`NID`, `News_Image_URL`, `News_Title`, `News_Link`, `News_Description`) VALUES
	(21, 'a', 'a', 'a', 'a'),
	(22, 'a', 'a', 'a', 'a'),
	(23, 'b', 'b', 'b', 'b'),
	(24, 'b', 'b', 'b', 'b'),
	(25, 'https://www.pexels.com/photo/silhouette-of-man-riding-horse-on-sunset-13745126/', 'Woman wins', 'sup', 'Horse Chamion');

-- Dumping structure for table horse_site.trainer
DROP TABLE IF EXISTS `trainer`;
CREATE TABLE IF NOT EXISTS `trainer` (
  `TID` int NOT NULL AUTO_INCREMENT,
  `Trainer_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Trainer_Address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Trainer_Phone_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Trainer_Email_Address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Trainer_Emergency_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Trainer_Emergency_Phone_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Trainer_Riding_Style` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`TID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table horse_site.trainer: ~8 rows (approximately)
DELETE FROM `trainer`;
INSERT INTO `trainer` (`TID`, `Trainer_Name`, `Trainer_Address`, `Trainer_Phone_Number`, `Trainer_Email_Address`, `Trainer_Emergency_Name`, `Trainer_Emergency_Phone_Number`, `Trainer_Riding_Style`) VALUES
	(5, 'UNDEFINED', NULL, '', 'EMPTY', NULL, NULL, NULL),
	(7, 'Rico Harris', '301 Slate Ln', '843-475-3681', 'riconosuave@gmail.com', 'Annaliese Hughes', '704-724-2716', 'Western'),
	(8, 'Joseph Kaufman', 'schoo', '123-456-7890', 'test@gmail.com', NULL, NULL, 'Side Saddle'),
	(9, 'j j', 'j', '', 'j', '', '', 'j'),
	(11, 'a a', 'a', '', 'a', '', '', 'a'),
	(12, 'a a', 'a', '', 'a', '', '', 'a'),
	(13, 'i i', 'i', '', 'i', '', '', 'i'),
	(14, 'john doooo', 'password', '', 'jdjd@jd.com', '', '', 'password');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
