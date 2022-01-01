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
* create new file called 'pwdHistory.config.js'
should look like:
```md
module.exports = {
    history:4
}
```
* create new file called 'transporter.congif.js'
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

### 3. Starting the project
* Navigate to /api and run the following command:
```md
npm start
```

* Navigate to /client:
** set environment varibale HTTPS with the value 'true', using Powershell:
```md
$env:HTTPS = "true"
```
** Run the following command:
```md
npm start
```
