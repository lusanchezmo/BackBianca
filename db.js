module.exports = {
    con:  function () {

        var mysql = require('mysql2'); // se incluye la libreria de sql 


        // se almacenan credenciales de acceso a DB
        const credentialsdb = {
            host: "localhost", 
            user: "root",
            password: "123456789",
            database: "biancadb"

          }

        // se devuelve coneccion inicializada
        return (mysql.createConnection(credentialsdb))
    }
  };