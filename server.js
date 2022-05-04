require('dotenv').config()
const express = require('express')
const app = express()

app.set("view engine", "hbs")
app.set("views", __dirname + "/views/") // express automaticamente busca las vistas en esta direccion

const lessons2 = require("./lessonsData.js") // importa el module que fue exportado de ese archivo

const DogApi = require('doggo-api-wrapper');
const myDog = new DogApi();

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

// una ruta donde el usuario vea solo las lecciones que estan aprobadas
app.get("/lessons/approved", (req, res) => {

  // 1. necesitamos un nuevo array solamente con las lecciones aprobadas
  let newArr = []
  lessons2.forEach((eachLesson) => {
    if (eachLesson.approved === true) {
      newArr.push(eachLesson)
    }
  })

  console.log(newArr)

  // let newArr = lessons.filter((eachLesson) => {
  //   return eachLesson.approved === true
  // })

  // 2. renderizar estas en una vista
  res.render("lessons.hbs", {
    lessons3: newArr
  })

})

app.get("/lessons/:bootcamp", (req, res) => {

  console.log(req.params.bootcamp) // ??

  // 1. necesitamos la data por bootcamp
  let newArr = lessons2.filter((eachLesson) => {
    return eachLesson.bootcamp === req.params.bootcamp
  })
  // 2. renderizarla al usuario
  res.render("lessons.hbs", {
    lessons3: newArr
  })

})

app.get("/search", (req, res) => {

  // si el usuario no ha enviado nada en el req.query (no ha llenado el campo)
  if (req.query.search === undefined) {
    res.render("search.hbs", {
      searchLesson: " "
    })
  } else {
    // req.query
    console.log(req.query)

    const { search } = req.query;

    let newObj = lessons2.find((eachLesson) => {
      return search.toUpperCase() === eachLesson.topic.toUpperCase()
    })

    res.render("search.hbs", {
      searchLesson: newObj
    })
  }
})

app.get("/dog", (req, res) => {

  

  myDog.getARandomDog()
  .then(data => {

    console.log(data)
    res.render("dog.hbs", {
      dogPicture: data.message
    })

  })
  .catch(err => {
    console.error(err)
  })

})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
