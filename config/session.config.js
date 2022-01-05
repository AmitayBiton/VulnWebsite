module.exports = {
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "N!R:v$fM'8t@HD?3",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day
      sameSite: true
    }
  }