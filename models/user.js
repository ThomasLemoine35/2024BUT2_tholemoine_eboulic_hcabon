const bdd = require("./database.js");

async function getUserById (id){
    sql="SELECT * FROM utilisateur WHERE id= ?";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,id,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });
}; 

async function checkLogin (login){
    sql="SELECT * FROM utilisateur";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,login,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

async function enregistrerUtilisateur(login, password, callback) {
    // Hachage du mot de passe
    const mdp = md5(motDePasse);

    // Requête SQL pour insérer les données dans la table utilisateur
    const sql = "INSERT INTO utilisateur (login, password) VALUES (?, ?)";
    pool.query(sql, [login, password], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'utilisateur :", err);
            callback(err, null);
        } else {
            console.log("Utilisateur ajouté avec succès !");
            callback(null, result);
        }
    });
}


module.exports={getUserById, checkLogin, enregistrerUtilisateur};
