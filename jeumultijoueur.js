
var express=require('express');
var bodyParser = require('body-parser');
var app=express();
var MongoClient = require('mongodb').MongoClient;
var myDb;
var URL = 'mongodb://localhost:27017/jeumulti';

var session = require('express-session');
var cookieParser = require('cookie-parser')


var joueurs = [];
var choixJoueurs=[];

app.use('/demande',express.static(__dirname+'/html'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
    secret:'123456789SECRET',
    saveUninitialized : false,
    resave: false
}));

app.set('view engine', 'pug');
app.set('views','html');

// page d'accueil des joueurs
// app.get('/accueil',function(req,res){
//   if(!req.session.compteur){
//     req.session.compteur=1;
//   }else{
//     req.session.compteur++
//   }
//   console.log(req.session)
//   res.render('formulaire',{compteur :req.session.compteur});
// });


// inscription joueurs
app.get('/inscription',function(req,res){
  res.render('inscription');
});

//identification des joueurs
app.post('/form', function(req,res){
  console.log(req.body.pseudo);
  console.log(req.body.password);


  myDb.collection('players').findOne({pseudo:req.body.pseudo, password: req.body.password  }, function(err,data){
    console.log(data);
    if(err || !data){
      console.log('ce pseudo n existe pas');
        res.render('formulaire', {
          msg1: 'identifiants inconnus'
        });

    }else{
    let pseudo = data.pseudo || '';
    let password = data.password || '';
    let lavatar = data.lavatar || '';


      console.log(joueurs);
      res.render('jeumulti', {
        pseudo:  req.body.pseudo,
        password:req.body.password,
        lavatar:lavatar,
        // adversaire: adversaire
      });
    }
  });
});


    // let adversaire;
    // if (joueurs.length % 2 !== 0) {
    //   adversaire = joueurs[joueurs.length - 1].pseudo;
    //   joueurs[joueurs.length - 1].adversaire = pseudo;
    // }
    // joueurs.push({
    //   pseudo: pseudo,
    //   index: joueurs.length,
    //   adversaire: adversaire
    // });


// pour permettre l'inscription des joueurs
app.post('/inscrit', function(req,res){
  console.log(req.body.pseudo); //affiche chose
  console.log(req.body.email);
  console.log(req.body.password);
    console.log(req.body.lavatar);

  myDb.collection('players').insert({pseudo:req.body.pseudo, email: req.body.email, password: req.body.password, lavatar: req.body.lavatar }, function(err,data){
    console.log(data);
    if(err || !data){
      console.log('champs mal remplie');
        res.render('inscription', {
          });

    }else{

    let pseudo = data.pseudo || '';
    let email = data.email || '';
    let password = data.password || '';
    let lavatar = data.lavatar || '';

      res.render('jeumulti', {
        pseudo:  req.body.pseudo,
        email:req.body.email,
        password:req.body.password,
        lavatar:req.body.lavatar,

      });
    }
  });
});


app.get('/',function(req,res){
  res.render('formulaire');
});


app.get('*',function(req,res){
res.render('erreur');
});

MongoClient.connect(URL, function(err, db) {
  if (err) {
    return;
  }
  myDb=db;
  var server =app.listen(80, function(){
    var portEcoute=server.address().port;
    console.log('ecoute sur le port 80')
    const io = require('socket.io');
    let websocketServer = io(server);


    // let squares = {};

    websocketServer.on('connection', function(socket){

      socket.on('bonjour', function(contenu){
        console.log('Bonjour', contenu);
        let adversaire='en attente'
        if (joueurs.length % 2 !== 0) {
          adversaire = joueurs[joueurs.length - 1].pseudo;
          joueurs[joueurs.length - 1].adversaire = contenu.pseudo;
          console.log('adv', joueurs[joueurs.length - 1].id);
          socket.broadcast.to(joueurs[joueurs.length - 1].id).emit('adversaire', {
            adversaire: contenu.pseudo
          });
        }
        joueurs.push({
          id: socket.id,
          pseudo: contenu.pseudo,
          index: joueurs.length,
          adversaire: adversaire
        });
        socket.emit('adversaire', {
          adversaire: adversaire
        });
        console.log(joueurs);
        socket.emit('bonjour', 'bienvenue à toi');
      });
      socket.on('choisir', function(data){

        console.log(data);
        choixJoueurs.push(data);

        console.log(choixJoueurs);
        console.log(choixJoueurs.length);

          console.log('ok');
          if(choixJoueurs.length==2){
          websocketServer.emit('animation',choixJoueurs);
          choixJoueurs=[];
          }
      });


    });

  });
});
