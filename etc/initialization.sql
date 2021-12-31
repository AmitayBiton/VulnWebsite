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

CREATE TABLE vulnwebsitedb.passwordHistory (
    passwordId int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    created datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (passwordId)
);

CREATE TABLE vulnwebsitedb.forgetPassword (
    userName varchar(255) NOT NULL,
    PincodeHash varchar(255),
    PincodeSalt varchar(255),
    PRIMARY KEY (userName)
);