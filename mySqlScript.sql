-- DROP DATABASE prodDev;

CREATE DATABASE prodDev;
USE prodDev;

-- WorkPlace
CREATE TABLE workplace (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL);

-- Materials
CREATE TABLE materials (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR (50) NOT NULL);

-- Main Lager
CREATE TABLE main_lager (
	id INT AUTO_INCREMENT PRIMARY KEY,
	material_id INT,
	quantity INT,
	FOREIGN KEY (material_id) REFERENCES materials(id));

-- WorkPlace Lager
CREATE TABLE workplace_lager (
id INT AUTO_INCREMENT PRIMARY KEY,
workplace_id INT,
material_id INT,
quantity INT,
FOREIGN KEY (workplace_id) REFERENCES workplace(id),
FOREIGN KEY (material_id) REFERENCES materials(id));

-- Contracts
CREATE TABLE contracts (
id INT AUTO_INCREMENT PRIMARY KEY);

-- Materials for the Contracts
CREATE TABLE machine_contracts (
id INT AUTO_INCREMENT PRIMARY KEY,
workplace_id INT,
contract_id INT,
status VARCHAR (30),
FOREIGN KEY (workplace_id) REFERENCES workplace(id),
FOREIGN KEY (contract_id) REFERENCES contracts(id));


