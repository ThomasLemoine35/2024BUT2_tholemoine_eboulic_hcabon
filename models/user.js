const bd = require("./database.js");

async function getUserById (id){
    sql="SELECT * FRO% utilisateur WHERE id= ?";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,id,(err,results)=>{
            if (err){
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports={getUserById};
