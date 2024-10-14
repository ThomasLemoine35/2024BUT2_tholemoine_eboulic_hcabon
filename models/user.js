const bdd = require("./database.js");

async function getUserById (id){ //ne pas utiliser les callback
    sql = "SELECT * FROM utilisateur WHERE id = ?";// c une secu pour eviter le drop database 
    return new promiseImpl((resolve, reject) => {
        bdd.query(sql, id, (err, results) =>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });
};

Module.exports = {getUserById};