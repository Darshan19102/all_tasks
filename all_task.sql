-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: main_database
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `date_of_attendance` date DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=604 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `e_id` int DEFAULT NULL,
  `name_of_board` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `university_or_school` varchar(255) DEFAULT NULL,
  `passing_year` bigint DEFAULT NULL,
  `percentage` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `option_master` (`id`),
  CONSTRAINT `education_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee_master` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `education_2`
--

DROP TABLE IF EXISTS `education_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `education_2_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee_master` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee_master`
--

DROP TABLE IF EXISTS `employee_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_master` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` bigint DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `relationship_status` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email` (`email`),
  KEY `relationship_status` (`relationship_status`),
  KEY `gender` (`gender`),
  CONSTRAINT `employee_master_ibfk_1` FOREIGN KEY (`relationship_status`) REFERENCES `option_master` (`id`),
  CONSTRAINT `employee_master_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exam_data`
--

DROP TABLE IF EXISTS `exam_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `exam_type_id` int DEFAULT NULL,
  `theory_total_marks` int DEFAULT NULL,
  `obtain_theory_marks` int DEFAULT NULL,
  `practical_total_marks` int DEFAULT NULL,
  `practical_obtain_marks` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `subject_id` (`subject_id`),
  KEY `exam_type_id` (`exam_type_id`),
  CONSTRAINT `exam_data_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_master` (`id`),
  CONSTRAINT `exam_data_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject_master` (`id`),
  CONSTRAINT `exam_data_ibfk_3` FOREIGN KEY (`exam_type_id`) REFERENCES `exam_type_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exam_type_master`
--

DROP TABLE IF EXISTS `exam_type_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_type_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `experience_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `starting_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`experience_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `lang_id` int DEFAULT NULL,
  `r` tinyint(1) DEFAULT NULL,
  `w` tinyint(1) DEFAULT NULL,
  `s` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  KEY `lang_id` (`lang_id`),
  CONSTRAINT `language_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee_master` (`employee_id`),
  CONSTRAINT `language_ibfk_2` FOREIGN KEY (`lang_id`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `s_id` int DEFAULT NULL,
  `option_name` varchar(255) DEFAULT NULL,
  `option_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `option_key` (`option_key`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `option_master_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `select_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS `preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preference` (
  `pref_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `notice_period` varchar(255) DEFAULT NULL,
  `expected_ctc` varchar(255) DEFAULT NULL,
  `current_ctc` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pref_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `preference_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reference_contact`
--

DROP TABLE IF EXISTS `reference_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_contact` (
  `ref_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `ref_name` varchar(255) DEFAULT NULL,
  `ref_contact` bigint DEFAULT NULL,
  `ref_relation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ref_id`),
  KEY `reference_contact_ibfk_1` (`employee_id`),
  CONSTRAINT `reference_contact_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `select_master`
--

DROP TABLE IF EXISTS `select_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `select_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `select_name` varchar(255) DEFAULT NULL,
  `select_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `select_key` (`select_key`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_master`
--

DROP TABLE IF EXISTS `student_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_master_2`
--

DROP TABLE IF EXISTS `student_master_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_master_2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_master`
--

DROP TABLE IF EXISTS `subject_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `technology`
--

DROP TABLE IF EXISTS `technology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technology` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `tech_id` int DEFAULT NULL,
  `tech_level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  KEY `tech_id` (`tech_id`),
  KEY `tech_level` (`tech_level`),
  CONSTRAINT `technology_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee_master` (`employee_id`),
  CONSTRAINT `technology_ibfk_2` FOREIGN KEY (`tech_id`) REFERENCES `option_master` (`id`),
  CONSTRAINT `technology_ibfk_3` FOREIGN KEY (`tech_level`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(10) DEFAULT NULL,
  `access_key` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 17:11:05
