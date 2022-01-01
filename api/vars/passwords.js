const crypto = require("crypto");
var databaseConnection = require("../handlers/db");
const passwordComplexity = require("joi-password-complexity");
const PWD_CONFIG = require("../config/pwd.config");
const PWD_HISTORY_CONFIG = require("../config/pwdHistory.config");


exports.calculateHmacAndSalt = (password) => {
    //salt
    const salt = crypto.randomBytes(16).toString('hex')
    //hmac
    const hmac = crypto.createHmac('sha256', password).update(salt).digest('hex')
    return  {
                hmac,
                salt
            }
}

exports.validatePassword = (password,passwordHash,salt) => {
    const hmac = crypto.createHmac('sha256', password).update(salt).digest('hex')
    if (passwordHash == hmac){
        return true
    } else{
        return false
    }
}

exports.archivePassword = (username,passwordHash,salt) => {
    results = databaseConnection.query(`INSERT INTO vulnwebsitedb.passwordHistory(userName,passwordHash,passwordSalt) VALUES ('${username}','${passwordHash}','${salt}')`)
    // console.log(`password archived ${username} : ${passwordHash} : ${salt}`)
}

exports.changePassword = (username,password) => {
    var passRes = this.calculateHmacAndSalt(password)
    passwordHash = passRes.hmac
    salt = passRes.salt
    results = databaseConnection.query(`UPDATE users SET passwordHash = '${passwordHash}',passwordSalt = '${salt}' WHERE userName = '${username}'`)
    this.archivePassword(username,passwordHash,salt)
    console.log(`Password changed for '${username}'`)
}

exports.isPasswordUsed = (username,password) => {
    var results = databaseConnection.query(`SELECT passwordHash,passwordSalt FROM passwordHistory WHERE userName = '${username}' ORDER BY created DESC LIMIT ${PWD_HISTORY_CONFIG.history}`)
    try{
        results.forEach(it => {if (this.validatePassword(password,it.passwordHash,it.passwordSalt)) throw 'used' });    
    } catch (e){
        if (e === 'used') return false
    }
    return true
}

exports.isComplexed = (password) => {
    var passwordValidation = passwordComplexity(PWD_CONFIG).validate(password)
    if(passwordValidation.hasOwnProperty('error')) return false
    else return true    
}


exports.isPendingPasswordReset = (username) => {
    var results = databaseConnection.query(`SELECT userName FROM forgetPassword WHERE userName = '${username}'`)
    if(results.length != 0) return true
    else return false
}