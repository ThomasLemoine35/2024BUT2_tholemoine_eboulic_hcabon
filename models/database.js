const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    datbase: "locfit"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = connection;