-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE DATABASE paud;

-- -----------------------------------------------------
-- Schema paud_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema paud_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `paud_schema` ;
USE `paud_schema` ;

-- -----------------------------------------------------
-- Table `paud_schema`.`climat_ville`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paud_schema`.`climat_ville` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `climat` VARCHAR(255) NOT NULL,
  `ville` VARCHAR(255) NOT NULL,
  `` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paud_schema`.`plantes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paud_schema`.`plantes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `plante` VARCHAR(50) NOT NULL,
  `climat` VARCHAR(255) NOT NULL,
  `terreau` VARCHAR(255) NOT NULL,
  `besoins_exposition` MEDIUMTEXT NOT NULL,
  `besoins_arrosage` MEDIUMTEXT NOT NULL,
  `besoins_terreau` MEDIUMTEXT NOT NULL,
  `culture` MEDIUMTEXT NOT NULL,
  `entretien` MEDIUMTEXT NOT NULL,
  `recolte` MEDIUMTEXT NOT NULL,
  `conseils` MEDIUMTEXT NULL,
  `date_recolte` VARCHAR(255) NULL,
  `date_semis` VARCHAR(255) NULL,
  `info_generale` MEDIUMTEXT NOT NULL,
  `nom_latin` VARCHAR(50) NOT NULL,
  `climat_ville_id` INT NOT NULL,
  PRIMARY KEY (`id`, `climat_ville_id`),
  INDEX `fk_plantes_climat_ville1_idx` (`climat_ville_id` ASC),
  CONSTRAINT `fk_plantes_climat_ville1`
    FOREIGN KEY (`climat_ville_id`)
    REFERENCES `paud_schema`.`climat_ville` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paud_schema`.`utilisateur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paud_schema`.`utilisateur` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prenom` VARCHAR(255) NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `ville` VARCHAR(255) NOT NULL,
  `pays` VARCHAR(255) NOT NULL,
  `plante` VARCHAR(255) NOT NULL,
  `logged_in` INT NULL,
  `password` VARCHAR(255) NOT NULL,
  `signup_date` DATETIME NOT NULL,
  `plantes_id` INT NOT NULL,
  `suivi_arrosage` LONGTEXT NOT NULL,
  `suivi_ventilation` LONGTEXT NOT NULL,
  `suivi_chauffage` LONGTEXT NOT NULL,
  `suivi_temps` LONGTEXT NOT NULL,
  `suivi_temperature` LONGTEXT NOT NULL,
  `suivi_humidite` LONGTEXT NOT NULL,
  `terreau_type` VARCHAR(50) NOT NULL,
  `position_plante` VARCHAR(50) NOT NULL,
  `a_proximite` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_utilisateur_plantes1_idx` (`plantes_id` ASC, `suivi_arrosage` ASC),
  CONSTRAINT `fk_utilisateur_plantes1`
    FOREIGN KEY (`plantes_id` , `suivi_arrosage`)
    REFERENCES `paud_schema`.`plantes` (`id` , `climat_ville_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paud_schema`.`ville_donnees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paud_schema`.`ville_donnees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ville` VARCHAR(255) NOT NULL,
  `annee` INT NOT NULL,
  `mois` INT NOT NULL,
  `jour` INT NOT NULL,
  `heure` INT NOT NULL,
  `temp_moy` INT NOT NULL,
  `humidite_moy` INT NOT NULL,
  `climat_ville_id` INT NOT NULL,
  PRIMARY KEY (`id`, `climat_ville_id`),
  INDEX `fk_ville_donnees_climat_ville_idx` (`climat_ville_id` ASC),
  CONSTRAINT `fk_ville_donnees_climat_ville`
    FOREIGN KEY (`climat_ville_id`)
    REFERENCES `paud_schema`.`climat_ville` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
