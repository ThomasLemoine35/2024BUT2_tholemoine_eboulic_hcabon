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

// Cette fonction va donner toutes les informations d'une personne
// elle la cherche avec son login
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

// Cette fonction va modifier TOUTES les données d'une personne qui est déjà dans la bdd
// elle prend en paramètres TOUTES les infos de la personne et la cherche avec son ID
async function ModifierDonnees (id, nom, prenom, ddn, email, mdp){
    sql="UPDATE utilisateur SET nom = ?, prenom = ?, ddn = ?, email = ?, password = ? WHERE id = ?";
    console.log(mysql.format(sql,[nom,prenom,ddn,email,mdp,id]));
    
    return new Promise((resolve,reject)=>{
        bdd.query(sql,[nom,prenom,ddn,email,mdp,id],(err,results)=>{
            if (err) {
                console.error("Erreur lors de l'exécution de la requête :", err); // Log des erreurs
                return reject(err);
            }
            resolve(results);
        });
    });
}; 

async function checkLogin (login){
    sql="SELECT * FROM utilisateur WHERE login = ?"; //login
    return new Promise((resolve,reject)=>{
        bdd.query(sql,login,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};


// Cette fonction cherche dans la bdd une personne et donne son ID
async function GetID (login){
    sql="SELECT id FROM utilisateur WHERE login = ?"; 
    console.log(mysql.format(sql,login));
    return new Promise((resolve,reject)=>{
        bdd.query(sql,login,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};


async function enregistrerUtilisateur(log, pass, lastname, prenom, ddn, mail, type_user) {

 

    let sql = "INSERT INTO utilisateur (login, password, nom, prenom, ddn, email, type_utilisateur) VALUES (?, ?, ?, ?, ? ,?, ?)";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,[log, pass, lastname, prenom, ddn, mail, type_user],(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });

}




module.exports={getUserById, DonneesUsers, ModifierDonnees, checkLogin, GetID, enregistrerUtilisateur};
