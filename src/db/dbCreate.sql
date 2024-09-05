create database football;
CREATE TABLE `football`.`tournaments` (
  `code` VARCHAR(45) NULL,
  `date` TIMESTAMP NOT NULL,
  `name` VARCHAR(255) NULL,
  `qauntityOfPeople` INT NULL,
  PRIMARY KEY (`code`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE,
  UNIQUE INDEX `date_UNIQUE` (`date` ASC) VISIBLE);
  
CREATE TABLE `football`.`rents` (
   `code` VARCHAR(45) NOT NULL,
   `date` DATE NOT NULL,
   `time` TIME NOT NULL,
   `areaID` TINYINT NULL,
   PRIMARY KEY (`code`),
   UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);
   
CREATE TABLE `football`.`clients` (
  `id` INT NOT NULL,
  `fullname` VARCHAR(200) NOT NULL,
  `servicetype` TINYINT(2) NOT NULL,
  `servicecode` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phonenumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`idclients` ASC) VISIBLE);