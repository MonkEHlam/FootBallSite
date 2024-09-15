create database football;
CREATE TABLE IF NOT EXISTS `football`.`tournaments` (
  `code` CHAR(36) NOT NULL,
  `date` DATETIME NOT NULL,
  `name` VARCHAR(255) NULL,
  `qauntityOfPeople` INT NULL,
  PRIMARY KEY (`code`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE,
  UNIQUE INDEX `date_UNIQUE` (`date` ASC) VISIBLE);
  
CREATE TABLE IF NOT EXISTS `football`.`rents` (
   `code` VARCHAR(45) NOT NULL,
   `date` DATE NOT NULL,
   `time` TIME NOT NULL,
   `areaID` TINYINT NULL,
   PRIMARY KEY (`code`),
   UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);
   
CREATE TABLE IF NOT EXISTS `football`.`clients` (
  `id` INT NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `servicetype` TINYINT(2) NOT NULL,
  `servicecode` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phonenumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);