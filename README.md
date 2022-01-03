# VulnWebsite
vulnerable website - cyber security course project
## Before you hack:
### 1. Config files:
* create /api/config direcory
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

### 2. Database initialization:
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
### 3. Create and install root certificate

* You can either install the current certificate authority in your local store or create a new one for youself.
* You can read more about the project on the git page: https://github.com/FiloSottile/mkcert
#### Create a new Certificate Authority:
* Windows machine:
```
choco install mkcert
```
* Setup mkcert will create a new CA on your local machine:
```
mkcert -install
```
* Navigate to your local react-app folder and create a folder for the certificates:
```
mkdir certs
```
* Now run the following command:
```
mkcert -key-file ./certs/key.pem -cert-file ./certs/cert.pem "localhost"
```
##### Dont forget to install the Certificate Authority certificate in the local store, if using firefox it uses it's own store.

### 4. Starting the project
#### Server:
* Navigate to /api and run the following command:
```md
npm start
```
#### Client:
* Navigate to /client:
* Windows machine: set environment varibale HTTPS with the value 'true', using Powershell:
```md
$env:HTTPS = "true"
```
* Linux/Mac machine:set environment varibale HTTPS with the value 'true', using bash terminal:
```md
export HTTPS = true
```

* Run the following command:
```md
npm start
```
