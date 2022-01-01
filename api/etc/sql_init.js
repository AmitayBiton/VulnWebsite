var databaseConnection = require('../handlers/db')
const PWDTool = require("../vars/passwords");
const usersDefaultPassword = "Password1!"


var customerTableQuerys = `CREATE TABLE vulnwebsitedb.customers (
    customerID int NOT NULL AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    phoneNumber varchar(255),
    PRIMARY KEY (customerID)
);`

var customersQueries = [
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Constable','Gwendolyn','jean.simoni10@hotmail.com','714-599-4772');`,
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Swan','Anna','thaddeus.kuval@gmail.com','904-402-5173');`,
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Green','Stacy','frederic2008@gmail.com','619-548-2206');`,
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Herman','Dennis','augustus1980@gmail.com','314-906-3243');`,
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Fuqua','Gerald','frederique_bergstr@hotmail.com','256-212-4402');`,
    `INSERT INTO vulnwebsitedb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Lana','Roy','ricky2010@gmail.com','619-200-1257');`
]

var usersTableQuerys = `CREATE TABLE vulnwebsitedb.users (
    userID int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    PRIMARY KEY (userID)
);`

var passwordHistoryTableQuery = `CREATE TABLE vulnwebsitedb.passwordHistory (
    passwordId int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    created datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (passwordId)
);
`

var forgetPasswordTableQuery = `CREATE TABLE vulnwebsitedb.forgetPassword (
    userName varchar(255) NOT NULL,
    PincodeHash varchar(255),
    PincodeSalt varchar(255),
    PRIMARY KEY (userName)
);`



console.log("-----------------------------------------------------\n            Initialization of Database:\n-----------------------------------------------------")

console.log("cleaning up:")

databaseConnection.query("DROP TABLE IF EXISTS customers")
console.log("   'customers' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS passwordHistory")
console.log("   'passwordHistory' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS forgetPassword")
console.log("   'forgetPassword' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS users")
console.log("   'users' table has been droped!")

console.log("\n-----------------------------------------------------")


console.log("creating 'customers' table:")
databaseConnection.query(customerTableQuerys)
console.log("   'customers' table has been created!")
console.log("inserting data to 'customers' table:")

customersQueries.forEach( query =>
    databaseConnection.query(query)
)
console.log("   data has been inserted to 'customers' table!")


console.log("\n-----------------------------------------------------")
console.log("creating 'passwordHistory' table:")
databaseConnection.query(passwordHistoryTableQuery)
console.log("   'passwordHistory' table has been created!")

console.log("\n-----------------------------------------------------")
console.log("creating 'forgetPassword' table:")
databaseConnection.query(forgetPasswordTableQuery)
console.log("   'passwordHistory' table has been created!")



console.log("\n-----------------------------------------------------")
console.log("creating 'users' table:")
databaseConnection.query(usersTableQuerys)
console.log("   'users' table has been created!")
console.log("inserting data to 'users' table:")

var passRes = PWDTool.calculateHmacAndSalt(usersDefaultPassword)
var passwordHash = passRes.hmac
var passwordSalt = passRes.salt
databaseConnection.query(`INSERT INTO vulnwebsitedb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress) VALUES ('amitaybiton','${passwordHash}','${passwordSalt}','Biton','Amitay','amitaybiton@gmail.com')`)
PWDTool.archivePassword('amitaybiton',passwordHash,passwordSalt)

databaseConnection.query(`INSERT INTO vulnwebsitedb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress) VALUES ('admin','${passwordHash}','${passwordSalt}','User','Administrative','amitaybiton@gmail.com')`)
PWDTool.archivePassword('admin',passwordHash,passwordSalt)

console.log("   data has been inserted to 'users' table!")

console.log("-----------------------------------------------------\n         Database Initialization Completed!\n-----------------------------------------------------")
