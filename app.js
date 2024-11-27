const express = require('express');
const app = express();
const userModel=require("./models/user.js");
const session =require('express-session');
const md5 = require('md5');

app.set('view engine', 'ejs'); // Configuration du moteur EJS


//const login = "jdupont";
//const nom=  userModel.DonneesUsers(login);

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'hGftTfDtJ545254kJHgGTfrtYHGHGFtGFDghVdfgHVGvcFGfdGHjJNJKnJKJNBVghgvCGGHvcB',
    resave:false,
    saveUninitialized:false,
}));

app.get('/', async function(req,res){

    if (!req.session.userId){
        return res.redirect("/login")
    }

    try {
        const user = await userModel.getUserById(2);
        res.render('index', { user });
        console.log(user); 
    } catch(err){
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});


//app.get('/informations',function (req,res){
//    res.render("informations", {nom, error:null});
//});

app.get('/informations', async function (req, res) {
    try {
        const login = "jdupont"; // Login de l'utilisateur à rechercher
        const userData = await userModel.DonneesUsers(login); // Récupération des données utilisateur

        // Vérifie si l'utilisateur existe
        if (!userData || userData.length === 0) {
            return res.render("informations", { nom: "Utilisateur introuvable", error: null });
        }

        // Passe les données utilisateur à la vue
        const nom = userData[0].login;
        const type_utilisateur = userData[0].role; // Associe "nom" au champ login de la base de données
        res.render("informations", { nom, type_utilisateur, error: null });
    } catch (err) {
        console.error("Erreur lors de la récupération des données utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});

app.get('/inscription',function (req,res){
    res.render("inscription", {error:null});
})

app.get('/new_produit',function (req,res){
    res.render("new_produit", {error:null});
})

app.get('/login',function (req,res){
    res.render("login", {error:null});
})

app.get('/catalogue', async function (req, res) {
    try {

        const role = req.session.role;
        res.render("catalogue", { role });
        
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).send("Erreur serveur");
    }
});


app.post('/login', async function (req, res) {
    const login = req.body.login;
    let mdp = req.body.password;

    mdp = md5(mdp);

    const user = await userModel.checkLogin(login);
    if (user && user.password === mdp && user.login === login) {
        req.session.userId = user.id; // Stocke l'ID utilisateur
        req.session.role = user.type_utilisateur; // Stocke le rôle utilisateur

        console.log("Session après connexion :", req.session); // Ajoutez ce log
        return res.redirect("/");
    } else {
        res.render("login", { error: "Mauvais Login/MDP" });
    }
});


app.post('/inscription', async function (req,res){
    const log=req.body.login;
    let pass=req.body.password;

    pass=md5(pass);

    const userModelForInscription = require('./models/user');
    const user = await userModelForInscription.enregistrerUtilisateur(log, pass);

    if (user != false && user.password == pass && user.login == log){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;

        return log, pass, res.redirect("/login");
    }

    else{
        res.render("login",{error:"Mauvais Login/MDP"})
    }
});


//détecte le role client

app.use(function(req,res){
    res.status(404).render("404");
});

app.listen(3000,function(){
    console.log('Server running on port 3000');
});



