const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())

app.use(
    cors({
      origin: "http://localhost:3000", // allow requests only from this origin
    })
  );

app.get('/',(req,res) => {

    var conn = require('./db.js');  // !!INCLUIR SIEMPRE!!  se incluye archivo db.js
    var con = conn.con();           // se llama la función createConection(), se almacena en con, esta es una variable para realizar la conección

    con.connect(function (err) {    // se abre la conexion con la db
        if (err) throw err;         // validacion de apertura
        con.query("select apto,idapto from ingruma2;", function (err, result, fields) { // se envía la petición a DB

            if (err) throw err;  // valida peticion enviada corrrectamente
            res.send(JSON.stringify(result));    // se imprime en pantalla el resultado de la consulta

        });
    });
});

app.get('/getAptoById', (req, res) => {

  var conn = require('./db.js');
  var con = conn.con(); 
  let id = req.query.idApto;
  con.connect(function (err) {
    if (err) throw err; 
    con.query(`select * from ingruma2 where idapto='${id}';`, [id], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      res.send(JSON.stringify(result)); // se imprime en pantalla el resultado de la consulta
    });
  });
});


app.put('/changeName/:id/:newName', (req,res) => {
  const {id,newName} = req.params

  var conn = require('./db.js');
  var con = conn.con();   

  con.connect(function (err) {
    if (err) throw err; 
    con.query(`update ingruma2 set apto = ${newName} where idapto = '${id}';`, [id], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      console.log('esta entrando');
      res.send('correcto'); // se imprime en pantalla el resultado de la consulta
    });
  });
})

app.put('/changeProductAmount/:id/:product/:amount', (req,res) => {
  const {id,product,amount} = req.params

  var conn = require('./db.js');
  var con = conn.con();   

  con.connect(function (err) {
    if (err) throw err; 
    con.query(`update ingruma2 set ${product} = ${amount} where idapto = '${id}';`, [id], function (err, result, fields) { // se envía la petición a DB
      if (err) throw err; // valida peticion enviada corrrectamente
      console.log('esta entrando');
      res.send('correcto'); // se imprime en pantalla el resultado de la consulta
    });
  });
})

app.get('/redistributionI2',(req,res) => {

  var conn = require('./db.js');  // !!INCLUIR SIEMPRE!!  se incluye archivo db.js
  var con = conn.con();           // se llama la función createConection(), se almacena en con, esta es una variable para realizar la conección

  con.connect(function (err) {    // se abre la conexion con la db
      if (err) throw err;         // validacion de apertura
      con.query("select * from ingruma2;", function (err, result, fields) { // se envía la petición a DB

          if (err) throw err;  // valida peticion enviada corrrectamente
          res.send(JSON.stringify(result));    // se imprime en pantalla el resultado de la consulta

      });
  });
});

app.listen(5000);
console.log('server on port 5000');