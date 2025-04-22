CREATE DATABASE tasneef_DB;

USE tasneef_DB;

CREATE TABLE Services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  info TEXT NOT NULL
);

ALTER TABLE Projects ADD COLUMN image_url VARCHAR(255) DEFAULT 'default-image.jpg';

CREATE TABLE Offers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  info TEXT NOT NULL,
  image_url VARCHAR(255), -- Store image path instead of binary
  valid_until DATE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'SAR'
);

CREATE TABLE ProjectServices (
  project_id INT,
  service_id INT,
  PRIMARY KEY (project_id, service_id),
  FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE CASCADE
);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

