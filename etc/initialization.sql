CREATE TABLE vulnwebsitedb.customers (
    customerID int NOT NULL AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    phoneNumber varchar(255),
    PRIMARY KEY (customerID)
);

INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber)
VALUES ('Biton','Amitay','amitaybiton@gmail.com','+972509421331');

INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber)
VALUES ('Doe','John','John.Doe@gmail.com','+972521456485');

INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber)
VALUES ('Wonder','Steive','steive.wonder@gmail.com','+972525586437');

CREATE TABLE vulnwebsitedb.users (
    userID int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    PRIMARY KEY (userID)
);

INSERT INTO vulnwebsitedb.users(userName,passwordHash,lastName,firstName,emailAddress)
VALUES ('admin','8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918','admin','admin','admin@vulnWebsite.com');