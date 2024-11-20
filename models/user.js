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

async function DonneesUsers (login){
    sql="SELECT * FROM utilisateur WHERE login = ?";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,login,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });
}; 

async function checkLogin (login){
    sql="SELECT * FROM utilisateur where login = ?"; //login
    return new Promise((resolve,reject)=>{
        bdd.query(sql,login,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};


async function enregistrerUtilisateur(log, pass) {

    // Hachage du mot de passe
    const md5 = require('md5');
    const mdp = md5(pass);

    let sql = "INSERT INTO utilisateur (login, password) VALUES (?, ?)";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,[log,mdp],(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });

}


module.exports={getUserById, DonneesUsers, checkLogin, enregistrerUtilisateur};
