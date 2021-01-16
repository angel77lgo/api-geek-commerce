CREATE TYPE role AS ENUM ('admin','client');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_type role,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories(
    id SERIAL,
    name VARCHAR(50),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL,
    short_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price INT8 NOT NULL,
    quantity INT8,
    brand VARCHAR(50),
    image_url VARCHAR(255),
    category_id INT8 NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS shopping_bags(
    id SERIAL,
    product_id INT8,
    user_id INT8,
    quantity INT8,
    total INT,

    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (username,password,role_type) VALUES ('admin','$2b$10$HOD0yubf2ymKpER8/JQhDuZh6kD5dfjW/yio7A2OKiDiUKZpRLCbC','admin');

INSERT INTO categories (name) VALUES('Game');
INSERT INTO categories (name) VALUES('Console');
INSERT INTO categories (name) VALUES('Toy');
INSERT INTO categories (name) VALUES('Gadget');
INSERT INTO categories (name) VALUES('Other');

INSERT INTO products(short_name,description,price,quantity,brand,category_id) VALUES ('Wii U','The oldest Game',4000,50,'Nintendo',2),
('FIFA 21','A Great Soccer Game',900,100,'EA Sports',1),('Mibo Samus','The Samus Aran Special Edition',599,5,'Nintendo',3),
('Bioshock: The Complete Trilogy','Enjoy The Best Games Ever',999,10,'K2',1);
