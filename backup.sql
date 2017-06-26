-- MySQL dump 10.13  Distrib 5.7.18, for osx10.12 (x86_64)
--
-- Host: localhost    Database: quiz
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permissi_content_type_id_2f476e4b_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add book',7,'add_book'),(20,'Can change book',7,'change_book'),(21,'Can delete book',7,'delete_book'),(22,'Can add quiz',8,'add_quiz'),(23,'Can change quiz',8,'change_quiz'),(24,'Can delete quiz',8,'delete_quiz'),(25,'Can add question',9,'add_question'),(26,'Can change question',9,'change_question'),(27,'Can delete question',9,'delete_question'),(28,'Can add option',10,'add_option'),(29,'Can change option',10,'change_option'),(30,'Can delete option',10,'delete_option'),(31,'Can add book log',11,'add_booklog'),(32,'Can change book log',11,'change_booklog'),(33,'Can delete book log',11,'delete_booklog'),(34,'Can add session',12,'add_session'),(35,'Can change session',12,'change_session'),(36,'Can delete session',12,'delete_session'),(37,'Can add quiz log',13,'add_quizlog'),(38,'Can change quiz log',13,'change_quizlog'),(39,'Can delete quiz log',13,'delete_quizlog'),(40,'Can add question log',14,'add_questionlog'),(41,'Can change question log',14,'change_questionlog'),(42,'Can delete question log',14,'delete_questionlog');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$24000$5HTYeSrIbWze$IQdZVnIJRULItE/iO6oUADjUQvFgqRVztLnvaIt4zeI=','2017-06-26 10:18:39.640334',1,'haradakunihiko','','','sthsoulful@gmail.com',1,1,'2017-06-16 08:07:12.263379');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2017-06-19 01:22:32.462588','1','Book object',1,'Added.',7,1),(2,'2017-06-26 10:57:33.113601','1','BookLog object',1,'Added.',11,1),(3,'2017-06-26 11:20:46.372269','1','/test',1,'Added.',8,1),(4,'2017-06-26 11:32:20.297493','1','Session object',1,'Added.',12,1),(5,'2017-06-26 11:32:55.460349','1','question_texxt sample',1,'Added.',9,1),(6,'2017-06-26 11:33:12.513000','1','1',1,'Added.',10,1),(7,'2017-06-26 11:33:16.929998','2','2',1,'Added.',10,1),(8,'2017-06-26 11:33:18.753921','2','2',2,'No fields changed.',10,1),(9,'2017-06-26 11:33:22.442575','3','3',1,'Added.',10,1),(10,'2017-06-26 11:33:50.810717','1','QuizLog object',1,'Added.',13,1),(11,'2017-06-26 11:34:02.384234','1','QuestionLog object',1,'Added.',14,1),(12,'2017-06-26 11:36:56.656594','1','QuizLog object',2,'Changed score.',13,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'quiz','book'),(11,'quiz','booklog'),(10,'quiz','option'),(9,'quiz','question'),(14,'quiz','questionlog'),(8,'quiz','quiz'),(13,'quiz','quizlog'),(12,'quiz','session'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2017-06-16 08:03:23.510933'),(2,'auth','0001_initial','2017-06-16 08:03:23.931907'),(3,'admin','0001_initial','2017-06-16 08:03:24.026676'),(4,'admin','0002_logentry_remove_auto_add','2017-06-16 08:03:24.072277'),(5,'contenttypes','0002_remove_content_type_name','2017-06-16 08:03:24.159790'),(6,'auth','0002_alter_permission_name_max_length','2017-06-16 08:03:24.206478'),(7,'auth','0003_alter_user_email_max_length','2017-06-16 08:03:24.244671'),(8,'auth','0004_alter_user_username_opts','2017-06-16 08:03:24.263631'),(9,'auth','0005_alter_user_last_login_null','2017-06-16 08:03:24.312635'),(10,'auth','0006_require_contenttypes_0002','2017-06-16 08:03:24.315304'),(11,'auth','0007_alter_validators_add_error_messages','2017-06-16 08:03:24.331818'),(12,'quiz','0001_initial','2017-06-16 08:03:25.226682'),(13,'sessions','0001_initial','2017-06-16 08:03:25.274260');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('y8mq37vw64em0meo6i21i8nupe4bochd','ZTM1NzZmZTEwZDA2YmMyZDRlZDhmY2ZjZDQxMjNmOGY4YWExMmI4Nzp7Il9hdXRoX3VzZXJfaGFzaCI6IjQ3N2E5NmRlNTE0MWZhY2RlODU4YmE1MzZjYWFkM2MyNDk1ZTIxODQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2017-07-10 10:18:39.643471');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_book`
--

DROP TABLE IF EXISTS `quiz_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_book`
--

LOCK TABLES `quiz_book` WRITE;
/*!40000 ALTER TABLE `quiz_book` DISABLE KEYS */;
INSERT INTO `quiz_book` VALUES (1,'中小企業診断士 クレアール');
/*!40000 ALTER TABLE `quiz_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_booklog`
--

DROP TABLE IF EXISTS `quiz_booklog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_booklog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_booklog_book_id_7e5af8bd_fk_quiz_book_id` (`book_id`),
  KEY `quiz_booklog_user_id_31c28f51_fk_auth_user_id` (`user_id`),
  CONSTRAINT `quiz_booklog_book_id_7e5af8bd_fk_quiz_book_id` FOREIGN KEY (`book_id`) REFERENCES `quiz_book` (`id`),
  CONSTRAINT `quiz_booklog_user_id_31c28f51_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_booklog`
--

LOCK TABLES `quiz_booklog` WRITE;
/*!40000 ALTER TABLE `quiz_booklog` DISABLE KEYS */;
INSERT INTO `quiz_booklog` VALUES (1,1,1);
/*!40000 ALTER TABLE `quiz_booklog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_option`
--

DROP TABLE IF EXISTS `quiz_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `label` varchar(1024) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_option_7aa0f6ee` (`question_id`),
  CONSTRAINT `quiz_option_question_id_f88cc373_fk_quiz_question_id` FOREIGN KEY (`question_id`) REFERENCES `quiz_question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_option`
--

LOCK TABLES `quiz_option` WRITE;
/*!40000 ALTER TABLE `quiz_option` DISABLE KEYS */;
INSERT INTO `quiz_option` VALUES (1,1,'1',1),(2,2,'2',1),(3,3,'3',1);
/*!40000 ALTER TABLE `quiz_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) NOT NULL,
  `text` longtext NOT NULL,
  `solution` longtext NOT NULL,
  `correct` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_question_baedd54c` (`quiz_id`),
  CONSTRAINT `quiz_question_quiz_id_b7429966_fk_quiz_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_quiz` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
INSERT INTO `quiz_question` VALUES (1,1,'question_texxt sample','question solution sample',3,1);
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_questionlog`
--

DROP TABLE IF EXISTS `quiz_questionlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_questionlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) NOT NULL,
  `selected` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `quiz_log_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_questionlog_question_id_f3c1ad20_fk_quiz_question_id` (`question_id`),
  KEY `quiz_questionlog_7ff5838c` (`quiz_log_id`),
  CONSTRAINT `quiz_questionlog_question_id_f3c1ad20_fk_quiz_question_id` FOREIGN KEY (`question_id`) REFERENCES `quiz_question` (`id`),
  CONSTRAINT `quiz_questionlog_quiz_log_id_20623056_fk_quiz_quizlog_id` FOREIGN KEY (`quiz_log_id`) REFERENCES `quiz_quizlog` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_questionlog`
--

LOCK TABLES `quiz_questionlog` WRITE;
/*!40000 ALTER TABLE `quiz_questionlog` DISABLE KEYS */;
INSERT INTO `quiz_questionlog` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `quiz_questionlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_quiz`
--

DROP TABLE IF EXISTS `quiz_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namespace` varchar(1024) NOT NULL,
  `text` longtext NOT NULL,
  `solution` longtext NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_quiz_book_id_3755cf90_fk_quiz_book_id` (`book_id`),
  CONSTRAINT `quiz_quiz_book_id_3755cf90_fk_quiz_book_id` FOREIGN KEY (`book_id`) REFERENCES `quiz_book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_quiz`
--

LOCK TABLES `quiz_quiz` WRITE;
/*!40000 ALTER TABLE `quiz_quiz` DISABLE KEYS */;
INSERT INTO `quiz_quiz` VALUES (1,'/test','text sample','solution sample',1);
/*!40000 ALTER TABLE `quiz_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_quizlog`
--

DROP TABLE IF EXISTS `quiz_quizlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_quizlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order` int(11) NOT NULL,
  `score` double NOT NULL,
  `created` datetime(6) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_quizlog_quiz_id_0e43caf4_fk_quiz_quiz_id` (`quiz_id`),
  KEY `quiz_quizlog_7fc8ef54` (`session_id`),
  KEY `quiz_quizlog_e8701ad4` (`user_id`),
  CONSTRAINT `quiz_quizlog_quiz_id_0e43caf4_fk_quiz_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_quiz` (`id`),
  CONSTRAINT `quiz_quizlog_session_id_3c4a97fa_fk_quiz_session_id` FOREIGN KEY (`session_id`) REFERENCES `quiz_session` (`id`),
  CONSTRAINT `quiz_quizlog_user_id_26fa334d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_quizlog`
--

LOCK TABLES `quiz_quizlog` WRITE;
/*!40000 ALTER TABLE `quiz_quizlog` DISABLE KEYS */;
INSERT INTO `quiz_quizlog` VALUES (1,1,1,'2017-06-26 11:33:50.796620',1,1,1);
/*!40000 ALTER TABLE `quiz_quizlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_session`
--

DROP TABLE IF EXISTS `quiz_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `started` datetime(6) NOT NULL,
  `book_log_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_session_book_log_id_71d40b73_fk_quiz_booklog_id` (`book_log_id`),
  CONSTRAINT `quiz_session_book_log_id_71d40b73_fk_quiz_booklog_id` FOREIGN KEY (`book_log_id`) REFERENCES `quiz_booklog` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_session`
--

LOCK TABLES `quiz_session` WRITE;
/*!40000 ALTER TABLE `quiz_session` DISABLE KEYS */;
INSERT INTO `quiz_session` VALUES (1,'2017-06-26 11:32:20.295420',1);
/*!40000 ALTER TABLE `quiz_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-26 22:38:41
