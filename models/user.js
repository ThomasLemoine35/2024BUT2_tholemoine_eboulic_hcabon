const bdd = require("./database.js");
const mysql = require('mysql');

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

//fontion qui prend les 3 parametres qui sont donnés par le formulaire de la page informations
async function ModifierDonnees (id, login, email, password){
    sql="UPDATE utilisateur SET login = ?, email = ?, password = ? WHERE id = ?";
    console.log(mysql.format(sql,[login,email,password,id]));
    
    return new Promise((resolve,reject)=>{
        bdd.query(sql,[login,email,password,id],(err,results)=>{
            if (err) {
                console.error("Erreur lors de l'exécution de la requête :", err); // Log des erreurs
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




module.exports={getUserById, DonneesUsers, ModifierDonnees, checkLogin, enregistrerUtilisateur};
