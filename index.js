// importando atracciones.js
let { atraccionesTuristicas } = require("./atracciones.js");

// levantando servidor e importando con express
const express = require("express");

// traemos el modulo que nos servira para acceder a las variables de entorno
require("dotenv").config();

// creamos una instancia con express
const app = express();
// definimos el puerto de entrada y variable de entorno
const puerto = process.env.PORT;

app.use(express.json());

// escucharemos peticiones
// metodo status recibe como argumento un codigo http
app.get("/destinos", (req, res) => {
  try {
    res.status(200).json(atraccionesTuristicas);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

app.post("/destinos", (req, res) => {
  try {
    //estamos respondiendo lo que el cliente nos va enviar en el body
    const nuevaAtraccion = req.body;
    atraccionesTuristicas.push(nuevaAtraccion);
    // se creo un nuevo dato
    res.status(201).json({
      mensaje: "Se ha añadido correctamente la atracción.",
      atraccion: nuevaAtraccion,
    });
  } catch (error) {}
});

// app.delete ('/destinos', (req,res)=>{
//     const id = req.params.id;
//     const atraccion = atraccionesTuristicas.find (atraccion => atraccion.id == id)

// })

app.delete("/destinos/:id", (req, res) => {
  const id = req.params.id;
  const atraccion = atraccionesTuristicas.find(
    (atraccion) => atraccion.id == id
  );
  const nuevasAtracciones = atraccionesTuristicas.filter(
    (atraccion) => atraccion.id != id
  );
  // console.log (nuevasAtracciones)
  atraccionesTuristicas = nuevasAtracciones;
  res.status(200).json({
    mensaje: "La atracción ha sido eliminada",
    atraccionEliminada: atraccion,
  });
});

app.put("/destinos/:id", (req,res) =>{
 const id = req.params.id;
 const indice = atraccionesTuristicas.findIndex (atraccion => atraccion.id == id)
 atraccionesTuristicas [indice] = req.body
 atraccionesTuristicas [indice].id = id
 res.status(200).json({
    mensaje:"informacion actualizada correctamente",
    atraccionActualizada : atraccionesTuristicas [indice]


 })
})

app.listen(puerto, () => {
  console.log(`servidor escuchando el puerto ${puerto}`);
});
