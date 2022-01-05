# 💻📱📞 VulnWebsite 
## vulnerable website - cyber security course project
This project is a customer managemet web application and REST API for a communication company.
By design, this application is vulnerable for SQLi attacks, XSS attacks and more. 😈😈

Installaiton and configuration instructions are detailed below:


## 🪓 Before you hack :
### 1. 🧰 Prerequiesits: 
* Make sure you have a fresh installation on mySQL on your machine.
* Create database on your machine called 'vulnwebsitedb'.

### 2. 🔧 Configuration files:
* navigate to /api directory.
* create /api/config direcory: 
```md
mkdir config
```
* create new file called '/api/config/db.config.js'
should look like:

```md
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "%%PASSWORD%%",
  DB: "vulnwebsitedb",
  MULTIPLESTATEMENT: true,
  PORT: 3306
};
```
%%PASSWORD%% - your root password for your database ('vulnwebsitedb')

* create new file called '/api/config/pwd.config.js'
should look like:
```md
module.exports = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  }
```
* create new file called '/api/config/pwdHistory.config.js'
should look like:
```md
module.exports = {
    history:4
}
```
* create new file called '/api/config/transporter.congif.js'
should look like:
```md
module.exports = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'vulnnotifier@gmail.com',
    pass: '%passwordForMail%'
  }
};
```


### 3. 📦 Installing Requierments 
* navigate to /api directory and run the following command:
```md
npm install
```
* navigate to /client directory and run the following command:
```md
npm install
```


### 4. 🗃️ Database initialization:
* navigate to /api directory and run the following command:
```md
npm run init
```
* output should look like this:
```md
> api@0.0.0 init .\VulnWebsite\api
> node ./etc/sql_init.js

Successfully connected to the database!
-----------------------------------------------------
            Initialization of Database:
-----------------------------------------------------
cleaning up:
   'customers' table has been droped!
   'passwordHistory' table has been droped!
   'forgetPassword' table has been droped!
   'users' table has been droped!

-----------------------------------------------------
creating 'customers' table:
   'customers' table has been created!
inserting data to 'customers' table:
   data has been inserted to 'customers' table!

-----------------------------------------------------
creating 'passwordHistory' table:
   'passwordHistory' table has been created!

-----------------------------------------------------
creating 'forgetPassword' table:
   'passwordHistory' table has been created!

-----------------------------------------------------
creating 'users' table:
   'users' table has been created!
inserting data to 'users' table:
   data has been inserted to 'users' table!
-----------------------------------------------------
         Database Initialization Completed!
-----------------------------------------------------
``` 
### 5. 📜 Root and Server Certificates

* You can either install the current certificate authority in your local store or create a new one for youself.
* You can read more about the project on the git page: https://github.com/FiloSottile/mkcert

#### Installing mkcert:
##### 🪟 Windows machine:
* use choco package manager to install mkcert
```md
choco install mkcert
```
##### 🐧 Linux/Mac machine:
* follow the instructions on https://github.com/FiloSottile/mkcert

#### Create a new Certificate Authority:
* Setup mkcert will create a new CA on your local machine:
```md
mkcert -install
```
* Navigate to client/ directory and create a folder for the certificates:
```md
mkdir certs
```
* Now run the following command:
```md
mkcert -key-file ./certs/key.pem -cert-file ./certs/cert.pem "localhost"
```
* Copy certs directory to api directory
```md
cp -R  ./certs ../api/
```


##### Dont forget to install the Certificate Authority certificate in the local store, if using firefox it uses it's own store.

### 6. 🎯 Starting the project
#### Server:
* Navigate to /api and run the following command:
```md
npm start
```
#### Client:
* Navigate to /client and run the following command:
* 🪟 Windows machine:
```md
npm start
```
* 🐧 Linux/Mac machine:
```md
npm run start_mac
```
