const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost", //adresse du serveur
    user:"root",
    password: "", //rien si xampp root
    database: "localfit"
});

connection.connect(function (err){
    if (err){
        throw err; //envoie lerreur si y en a 
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = connection;