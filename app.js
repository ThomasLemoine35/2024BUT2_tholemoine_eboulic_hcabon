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



app.get('/inscription',function (req,res){
    res.render("inscription", {error:null});
})

app.get('/creation_agent',function (req,res){
    res.render("creation_agent", {error:null});
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


//tentative pour prendre automatiquement le login de la personne connectee
let transmettre_login = "";
function transmettre(login) {
    return transmettre_login = login;
}
app.post('/login', async function (req,res){
    const login=req.body.login;
    let mdp=req.body.password;

    console.log("Données reçues : login =", login, "password =", mdp);

    mdp=md5(mdp);

    const user= await userModel.checkLogin(login);
    console.log(user);
    if (user != false && user.password == mdp && user.login == login){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;
        transmettre(login);
        return res.redirect("/") ;
    }

    else{
        res.render("login",{error:"Mauvais Login/MDP"})
    }
});


app.post('/inscription', async function (req,res){
    const log=req.body.login;
    let pass=req.body.password;
    const lastname = req.body.lastname;
    const prenom = req.body.prenom;
    const ddn = req.body.ddn;
    const mail = req.body.mail;

    pass=md5(pass);

    const userModelForInscription = require('./models/user');
    const user = await userModelForInscription.enregistrerUtilisateur(log, pass, lastname, prenom, ddn, mail, 'client');

    if (user != false && user.password == pass && user.login == log){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;

        return log, pass, res.redirect("/login");
    }

    else{
        res.render("login",{error:"Mauvais Login/MDP"})
    }
});

app.post('/creation_agent', async function (req,res){
    const log=req.body.login;
    let pass=req.body.password;
    const lastname = req.body.lastname;
    const prenom = req.body.prenom;
    const ddn = req.body.ddn;
    const mail = req.body.mail;

    pass=md5(pass);

    const userModelForInscription = require('./models/user');
    const user = await userModelForInscription.enregistrerUtilisateur(log, pass, lastname, prenom, ddn, mail, 'agent');

    if (user != false && user.password == pass && user.login == log){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;

        return log, pass, res.redirect("/");
    }

    else{
        res.render("login",{error:"Mauvais Login/MDP"})
    }
});



app.get('/informations', async function (req, res) { //permet d'afficher dans le formulaire les données de l'utilisateur dans la page informations
    try {
        console.log("Mon user connecté c'est : ",transmettre_login);
        let login = transmettre_login; // Login de l'utilisateur à rechercher
        console.log(login);
        const userData = await userModel.DonneesUsers(login); // Récupération des données utilisateur avec la fonction donnesUsers
        console.log(userData);
        // Vérifie si l'utilisateur existe
        if (!userData || userData.length === 0) {
            return res.render("informations", { nom: "Utilisateur introuvable", error: null });
        }

        const nom = userData[0].nom;
        const prenom = userData[0].prenom;
        const ddn = userData[0].ddn;
        const mail = userData[0].email; // on selectionne login et email etc dans userdata 
        res.render("informations", { nom, prenom, ddn, mail, error: null });
    } catch (err) {
        console.error("Erreur lors de la récupération des données utilisateur :", err);
        res.status(500).send("Erreur serveur");
    }
});



// pour récupérer les info du formulaire pour modifier les donnees utilisateur et effectuer les changements dans la bdd
app.post('/informations', async function (req, res) {
    try {
        console.log("Données reçues :", req.body);

        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const ddn = req.body.ddn;
        const email = req.body.email;
        const password = req.body.password;
        console.log("mdp : ",password);

        const mdp = md5(password);
        console.log("Mot de passe hashé :", mdp);

        const recup_id = await userModel.GetID(transmettre_login);
        console.log("mon id : ", recup_id);
        const id = recup_id.id;
        console.log("mon nom : ", nom);
        const user = await userModel.ModifierDonnees(id, nom, prenom, ddn, email, mdp);
        console.log("Résultat de ModifierDonnees :", user);

        return res.redirect("/");
    } catch (err) {
        console.error("Erreur détectée :", err);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour des données.");
    }
});













// pour récupérer les info du formulaire pour modifier les donnees utilisateur et effectuer les changements dans la bdd

//détecte le role client




app.use(function(req,res){
    res.status(404).render("404");
});

app.listen(3000,function(){
    console.log('Server running on port 3000');
});



