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
        bdd.query(sql,(err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

async function previewImage() {
    const fileInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Veuillez choisir un fichier image.');
    }
}




module.exports={getProduitById, getTableProduit, previewImage};


