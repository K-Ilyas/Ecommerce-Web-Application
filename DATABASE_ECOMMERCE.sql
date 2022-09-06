-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `subCat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subCat_categories` (`subCat`),
  CONSTRAINT `fk_subCat_categories` FOREIGN KEY (`subCat`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'PC DESKTOP',3),(2,'PC PORTABLE',3),(3,'ORDINATEURS',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderlinks`
--

DROP TABLE IF EXISTS `orderlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderlinks` (
  `id_order` int NOT NULL,
  `id_item` int NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`id_order`,`id_item`),
  KEY `fk_id_item_OrderLinks` (`id_item`),
  CONSTRAINT `fk_id_item_OrderLinks` FOREIGN KEY (`id_item`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_order_OrderLinks` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderlinks`
--

LOCK TABLES `orderlinks` WRITE;
/*!40000 ALTER TABLE `orderlinks` DISABLE KEYS */;
INSERT INTO `orderlinks` VALUES (69,29,9),(69,34,5),(71,29,10),(72,34,10),(73,30,10),(73,35,10),(74,31,6),(75,33,5),(76,30,1),(76,33,1);
/*!40000 ALTER TABLE `orderlinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(100) NOT NULL,
  `itemsPrice` decimal(10,4) NOT NULL,
  `shippingPrice` decimal(10,4) NOT NULL,
  `taxPrice` decimal(10,4) NOT NULL,
  `totalPrice` decimal(10,4) NOT NULL,
  `user` int NOT NULL,
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `paidAt` datetime DEFAULT NULL,
  `isDelivered` tinyint(1) NOT NULL DEFAULT '0',
  `deliveredAt` datetime DEFAULT NULL,
  `shippingAddress` int NOT NULL,
  `paymentResult` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_orders` (`user`),
  KEY `fk_shippingAddress_orders` (`shippingAddress`),
  KEY `fk_paymentResult_orders` (`paymentResult`),
  CONSTRAINT `fk_paymentResult_orders` FOREIGN KEY (`paymentResult`) REFERENCES `paymentresults` (`id`),
  CONSTRAINT `fk_shippingAddress_orders` FOREIGN KEY (`shippingAddress`) REFERENCES `shippingaddresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_orders` FOREIGN KEY (`user`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (69,'PayPal',254820.0000,0.0000,38223.0000,293043.0000,1,1,'2021-06-14 22:00:31',1,'2021-06-14 22:01:18',75,24,'2021-06-14 21:56:36'),(71,'PayPal',219300.0000,0.0000,32895.0000,252195.0000,1,1,'2021-06-15 09:12:05',1,'2021-06-15 09:12:26',77,26,'2021-06-15 09:11:14'),(72,'PayPal',114900.0000,0.0000,17235.0000,132135.0000,1,1,'2022-09-05 17:35:21',1,'2022-09-05 17:39:06',78,28,'2021-06-15 12:47:01'),(73,'PayPal',104100.0000,0.0000,15615.0000,119715.0000,10,1,'2021-06-16 12:44:12',1,'2021-06-16 12:47:00',79,27,'2021-06-16 12:43:19'),(74,'PayPal',24300.0000,0.0000,3645.0000,27945.0000,1,1,'2022-09-05 17:38:24',1,'2022-09-05 17:38:31',80,29,'2022-09-05 17:37:41'),(75,'PayPal',97300.0000,0.0000,14595.0000,111895.0000,1,1,'2022-09-05 17:40:26',1,'2022-09-05 17:40:39',81,30,'2022-09-05 17:40:08'),(76,'Stripe',22760.0000,0.0000,3414.0000,26174.0000,11,1,'2022-09-05 23:36:33',1,'2022-09-05 23:36:43',82,31,'2022-09-05 19:59:01');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentresults`
--

DROP TABLE IF EXISTS `paymentresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentresults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  `update_time` datetime NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `id_transaction` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentresults`
--

LOCK TABLES `paymentresults` WRITE;
/*!40000 ALTER TABLE `paymentresults` DISABLE KEYS */;
INSERT INTO `paymentresults` VALUES (4,'COMPLETED','2021-06-02 15:01:36','sb-52miw6113392@personal.example.com','60U34962SC7426649'),(5,'COMPLETED','2021-06-02 15:05:19','sb-52miw6113392@personal.example.com','4Y739322HR053742K'),(6,'COMPLETED','2021-06-02 15:09:52','sb-52miw6113392@personal.example.com','60327323EP8504050'),(7,'COMPLETED','2021-06-02 15:13:19','sb-52miw6113392@personal.example.com','69J495506J006241T'),(8,'COMPLETED','2021-06-02 15:17:37','sb-52miw6113392@personal.example.com','79R65774B2971162K'),(9,'COMPLETED','2021-06-02 15:22:00','sb-52miw6113392@personal.example.com','6MK642323V818013P'),(10,'COMPLETED','2021-06-02 15:33:11','sb-52miw6113392@personal.example.com','248685223J5965035'),(11,'COMPLETED','2021-06-02 19:07:07','sb-52miw6113392@personal.example.com','4VM21442JS833451F'),(12,'COMPLETED','2021-06-03 16:09:07','sb-52miw6113392@personal.example.com','72E97972EW731062V'),(13,'COMPLETED','2021-06-04 01:29:38','sb-52miw6113392@personal.example.com','5V9117552K4732814'),(14,'COMPLETED','2021-06-04 08:40:47','sb-52miw6113392@personal.example.com','5LC75859DH531453W'),(15,'COMPLETED','2021-06-04 23:19:16','sb-52miw6113392@personal.example.com','9UY99702SG5402259'),(16,'COMPLETED','2021-06-05 10:26:13','sb-52miw6113392@personal.example.com','9KP07886TH243732H'),(17,'COMPLETED','2021-06-05 10:28:34','sb-52miw6113392@personal.example.com','0H395312CJ9217052'),(18,'COMPLETED','2021-06-05 10:34:02','sb-52miw6113392@personal.example.com','4DV71754SX4165838'),(19,'COMPLETED','2021-06-05 10:43:26','sb-52miw6113392@personal.example.com','3PA693076B7126814'),(20,'COMPLETED','2021-06-06 00:07:34','sb-52miw6113392@personal.example.com','1RF69680NM3482413'),(21,'COMPLETED','2021-06-13 14:27:15','sb-52miw6113392@personal.example.com','1EH10550169423521'),(22,'COMPLETED','2021-06-13 14:31:38','sb-52miw6113392@personal.example.com','9YW765139J292783G'),(23,'COMPLETED','2021-06-13 14:54:00','sb-52miw6113392@personal.example.com','8J723163894382916'),(24,'COMPLETED','2021-06-14 22:00:29','sb-52miw6113392@personal.example.com','0HD08542UV309615M'),(25,'COMPLETED','2021-06-14 22:05:04','sb-52miw6113392@personal.example.com','9JJ52362CA2112506'),(26,'COMPLETED','2021-06-15 09:12:02','sb-52miw6113392@personal.example.com','85X68827HT956490U'),(27,'COMPLETED','2021-06-16 12:44:09','sb-52miw6113392@personal.example.com','8XG07921N85749030'),(28,'COMPLETED','2022-09-05 17:35:19','sb-52miw6113392@personal.example.com','0C628332CM6092044'),(29,'COMPLETED','2022-09-05 17:38:23','sb-52miw6113392@personal.example.com','10B7837666284183E'),(30,'COMPLETED','2022-09-05 17:40:25','sb-52miw6113392@personal.example.com','84T160393J589600D'),(31,'COMPLETED','2022-09-05 23:36:33','sb-52miw6113392@personal.example.com','0L752684098439923');
/*!40000 ALTER TABLE `paymentresults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produits`
--

DROP TABLE IF EXISTS `produits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `countInStock` int NOT NULL,
  `rating` float(2,1) NOT NULL,
  `numReviews` int NOT NULL DEFAULT '0',
  `category` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name_produit` (`name`),
  KEY `fk_produits_categorie` (`category`),
  CONSTRAINT `fk_produits_categorie` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produits`
--

LOCK TABLES `produits` WRITE;
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` VALUES (29,'CANON Objectif EF 16-35mm f 2.8L III USM','/img/1623068879073.jpg','CANON ','CANON Objectif EF 16-35mm f 2.8L III USM',21930.00,81,5.0,1,1),(30,'CANON Flash 430 EX III RT','/img/1623069112512.jpg','CANON','Photos/Vidéos , Accessoires photos , videos ,CANON CONSUMER FLASH\nCANON Flash 430 EX III RT',3300.00,32,3.5,2,1),(31,'CANON jet d encre Pixma G6040 Couleur MFP','/img/1623069769662.jpg','CANON','CANON jet d encre Pixma G6040 MFP Couleur 3en1 3 boutteille encre pour impression 18 000 pages 6000 pages boutteilles ou 7700 pages avec un seul jeu de couleurs vitesse impression 13 ipm WiFi Ethernet recto verso auto BAC 350 F 2 lignes LCD\n\n',4050.00,89,4.5,20,1),(32,'HP Officejet Pro 8210','/img/1623070905882.jpg','HP','HP Officejet Pro 8210 22 18 ppm ecran 5 1 cm Wifi Network Duplex\n\n',1190.00,20,4.5,20,2),(33,'HP EB 1040G4 i5 8Go 256SSD 14 W10p WWAN 3yw','/img/1623071044480.jpg','HP','HP Elite Book Folio 1040G4 Processeur Intel i5-7200U 2.5GHz jusqu à 3 1 GHz 3MB de cache 2 coeurs Disque Dur 256 SSD RAM 8 Go DDR4 Réseau Wifi et Bluetooth Carte HSPA 4G Windows 10 Pro 64 Ecran 14 FHD GARANTIE 3 ANS.',19460.00,24,4.5,20,2),(34,'HP PB450G7 i7-8565U 8GB 1T MX250 2GB Dos 1YW','/img/1623071214667.jpg','HP','HP ProBook 450 G7 Processeur Intel i7-10510U 1 8 GHz jusqu a 4 9 Ghz 8 MB cache 4 cœurs Disque Dur 1To SATA 5400 RAM 8 Go DDR4 NVIDIA GeForce MX250 2GB Reseau WIFI et bluetooth Freedos Ecran 15 6 pouces LED HD GARANTIE 1 AN Sacoche',11490.00,5,4.0,1,1),(35,'HP15 15-dw3011nk 15 6 i5-1135 4GB 1TB MX350 W10H1y','/img/1623071334761.jpg','HP','HP 15 15-dw3011nk Processeur Intel i5-1135G7 2.40 GHz up to 4.20 GHz 8MB de cache 4 cores 4Go de mémoire Disque dur 1TB Lecteur de carte mémoire Carte Nvidia GeForce MX350 2GB',7110.00,20,4.5,20,2),(36,'Azuz proBoX 1070 Invidia GTX','/img/1662420891008.jpg','Azuz','TRes bon ordinateur',9000.00,30,1.0,1,2);
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_product` int NOT NULL,
  `id_user` int NOT NULL,
  `comment` varchar(100) NOT NULL,
  `rating` float(2,1) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reviews_produit` (`id_product`),
  KEY `fk_reviews_user` (`id_user`),
  CONSTRAINT `fk_reviews_produit` FOREIGN KEY (`id_product`) REFERENCES `produits` (`id`),
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (5,29,1,'C\'est un tres bon produit',5.0,'2021-06-13 18:34:11'),(6,34,1,'Un bon produit !!!!',4.0,'2021-06-15 12:46:32'),(7,30,10,'un tres bon produit',3.0,'2021-06-16 12:42:12'),(8,36,1,'what !!!!!!!!!!!',1.0,'2022-08-08 12:52:03'),(9,30,11,'Looks beautiful',4.0,'2022-09-05 19:57:44');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingaddresses`
--

DROP TABLE IF EXISTS `shippingaddresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingaddresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isSeller` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'contact','contact@gmail.com','$2a$10$fIxpvOQ7c8ZzZGe7XRBY..IAKRSpRCWAXltsM1b0OYc8e3lTSrWbm',1,0);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-06 13:17:08
