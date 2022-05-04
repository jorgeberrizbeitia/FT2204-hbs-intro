require('dotenv').config()
const express = require('express')
const app = express()

app.set("view engine", "hbs")
app.set("views", __dirname + "/views/") // express automaticamente busca las vistas en esta direccion

const lessons2 = require("./lessonsData.js") // importa el module que fue exportado de ese archivo

app.get('/', (req, res) => {
  // res.send(`bienvenido, tu clave secreta es: ${process.env.SECRET_KEY}`)

  res.render("home.hbs", {
    teacher: "Patricio"
  })
})

app.get("/lessons", (req, res) => {

  res.render("lessons.hbs", {
    lessons3: lessons2
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
