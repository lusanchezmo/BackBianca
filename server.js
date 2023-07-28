import { PORT } from './config.js'
import { pool } from './db.js'

import express from 'express';
import cors from 'cors';

//const express = require('express');
//const cors = require('cors');

const app = express();

app.use(express.json())

app.use(
  cors({
    origin: "https://lusanchezmo.github.io", // allow requests only from this origin
    origin: "http://localhost:3000"
  })
);


// consulta inicial 
app.post('/:ingruma', async (req, res) => {
  const {ingruma} = req.params;
  try {
    const [rows] = await pool.query(`select apto, idapto from ${ingruma};`);
    const resultArray = rows.map(row => {
      return {
        ingruma: ingruma,
        apto: row.apto.toString(), // Convirtiendo el buffer a cadena
        idapto: row.idapto.toString(), // Convirtiendo el buffer a cadena
      };
    });

    res.send(JSON.stringify(resultArray));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.post('/getAptoById/:id/:ingruma', async (req, res) => {
  const { id, ingruma } = req.params;
  try {
    const queryResult = await pool.query(`select * from ${ingruma} where idapto='${id}';`);
    const result = queryResult[0];

    res.send(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.put('/changeName/:id/:newName/:ingruma', async (req, res) => {
  const { id, newName, ingruma } = req.params;

  try {
    const result = await pool.query(`update ${ingruma} set apto = ? where idapto = ?`, [newName, id]);
    console.log('esta entrando');
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});


app.put('/changeProductAmount/:id/:product/:amount/:ingruma', async (req, res) => {
  const { id, product, amount, ingruma } = req.params;

  try {
    const result = await pool.query(`update ${ingruma} set ${product} = ? where idapto = ?`, [amount, id]);
    console.log('esta entrando');
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});

app.get('/redistribution/:ingruma', async (req, res) => {
  const { ingruma } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ${ingruma};`);
    res.send(JSON.stringify(result[0]));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});



app.post('/addApto/:nombre/:torre/:ingruma/:tabla', async (req, res) => {
  const { nombre, torre, ingruma, tabla } = req.params;
  if(tabla == 'todos'){
    try {
      const result = await pool.query(`insert into ${tabla} (apto,idapto) values ('${nombre}','${nombre}.${torre}.${ingruma}');`);
      res.send('correcto');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en la consulta');
    }
  } else {
    try {
      const result = await pool.query(`insert into ${tabla} (apto,idapto) values (${nombre},'${nombre}.${torre}.${ingruma}');`);
      res.send('correcto');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en la consulta');
    }
  }
});


app.delete('/deleteApto/:id/:tabla', async (req, res) => {
  const { id, tabla } = req.params;

  try {
    const result = await pool.query(`delete from ${tabla} where idapto = '${id}';`);
    console.log('esta eliminando');
    res.send('correcto');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la consulta');
  }
});


app.listen(PORT);
console.log("Server on port ", PORT)