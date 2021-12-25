# VulnWebsite
vulnerable website - cyber security course project
## before you hack:
* create /api/config direcory
* create new file called '/api/config/db.config.js'
should look like:

```md
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "%%PASSWORD%%",
  DB: "vulnwebsitedb",
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
    requirementCount: 4,
  }
```

* when starting the client site (REACT) do this in the powershell shell:
($env:HTTPS = "true") -and (npm start)
