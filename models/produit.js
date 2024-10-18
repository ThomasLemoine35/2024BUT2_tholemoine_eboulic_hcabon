const bdd = require("./database.js");

async function getProduitById(id) {
    sql = "SELECT * FROM produit WHERE id= ?";
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};


async function getTableProduit() {
    sql = "SELECT * FROM produit";
    return new Promise((resolve, reject) => {
        bdd.query(sql, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};



module.exports={getProduitById, getTableProduit};


