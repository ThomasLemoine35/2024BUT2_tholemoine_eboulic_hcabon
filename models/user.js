const bdd = require("./database.js");

async function getUserById (id) {
    sql = "SELECT * FROM utlisateur WHERE id = ?";
    return new promise((resolve, reject) => {
        bdd.query(sql, [id], (err, results) => {
            if(err) {
                return reject(err);

            }
            resolve(results);
        });
    });
};

module.exports = { getUserById };