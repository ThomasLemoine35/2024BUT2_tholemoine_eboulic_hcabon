const express = require('express');
const app = express();
const userModel=require("./models/user.js");
const produitModel=require("./models/produit.js")
const session =require('express-session');
const md5 = require('md5');




app.set('view engine','ejs');

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


app.get('/inscription',function (req,res){
    res.render("inscription", {error:null});
})

app.get('/login',function (req,res){
    res.render("login", {error:null});
})

app.get('/catalogue',function (req,res){
    res.render("catalogue", {error:null});
})

app.post('/login', async function (req,res){
    const login=req.body.login;
    let mdp=req.body.password;

    mdp=md5(mdp);

    const user= await userModel.checkLogin(login);
    console.log(user);
    if (user != false && user.password == mdp && user.login == login){
        req.session.userId = user.id;
        req.session.role = user.type_utilisateur;

        return res.redirect("/");
    }

    else{
        res.render("login",{error:"Mauvais Login/MDP"})
    }
});

// --------------test-----------//

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


// --------------test-----------//



app.get('/catalogue',function (req,res){
    let produits = produitModel.getTableProduit();

    res.render("catalogue", {produits});

})


app.use(function(req,res){
    res.status(404).render("404");
});

app.listen(3000,function(){
    console.log('Server running on port 3000');
});