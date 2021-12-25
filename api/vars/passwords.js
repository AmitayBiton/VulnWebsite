const crypto = require("crypto");

exports.helloworld = function() {
    console.log("helloworld!")
}


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