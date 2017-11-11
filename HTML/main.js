window.addEventListener('DOMContentLoaded', function(){
  var webSocketclient = io('http://192.168.1.49');
  webSocketclient.emit('bonjour', {
    pseudo: document.getElementById('pseudo').innerText

  });

  // rechercher le numéro de l'avatar
    var avatarP1 = document.getElementById('avatarPlayer1');
   var avatarP2 = document.getElementById('avatarPlayer2');
   var rechAvatarPseudo=document.getElementById('pseudo').innerHTML;
   var rechAvatarPseudo2 = parseFloat(rechAvatarPseudo);

   var lol = '/demande/avatar' + rechAvatarPseudo2  + '.png';


   var mettreAvatar1 = function() {
     avatarP1.style.backgroundImage = "url(" + lol + ")";
   }

   var mettreAvatar2 = function() {
     console.log(rechAvatarAdversaire);
     console.log(rechAvatarAdversaire2);
     var rechAvatarAdversaire=document.getElementById('adversaire').innerHTML;
     var rechAvatarAdversaire2= parseFloat(rechAvatarAdversaire);
    var lol1 = '/demande/avatar' + rechAvatarAdversaire2  + '.png';
     avatarP2.style.backgroundImage = "url(" + lol1 + ")";
   }

   webSocketclient.on('adversaire', function(data) {
     console.log(data);
     document.getElementById('adversaire').innerText = data.adversaire;
     mettreAvatar2();

   });

  webSocketclient.on('bonjour', function(contenu) {
    AfficherResultat(contenu,1000);
    mettreAvatar1();

  });




// fonction pour afficher la div a chaque coup
  var effacerDiv = function() {};
  var AfficherResultat = function(message,x,y) {
  if(true) {
    document.getElementById('result').style.display = 'block';
      document.getElementById('result').style.background = y;
    document.getElementById('result').innerHTML = message;
    effacerDiv=setTimeout(function(){
      document.getElementById('result').style.display = 'none';
    },x);
  }
}

// le gagnant
var legagnant=function(){

  var tobby1=parseFloat(document.getElementById('score1').innerText);
  var tobby2=parseFloat(document.getElementById('score2').innerText);
  console.log(tobby1);
  console.log(tobby2);
  if(tobby1==5 || tobby2==5){
    AfficherResultat('gagné t es un champion tu es arrive a 5',50000,'aquamarine');

  }
}


// point pour la pierre
var point1 = function() {
  if(pierre1.style.left == '90px') {
    var toto=document.getElementById('score1').innerText
    document.getElementById('score1').innerHTML = parseInt(toto)+parseInt(1)
  }
  if( pierre2.style.left == '310px' ) {
    var titi=document.getElementById('score2').innerText
    console.log(titi)
    document.getElementById('score2').innerHTML = parseInt(titi)+parseInt(1)
  }
}


// point pout la feuille
var point=function() {
  if(feuille1.style.left=='90px') {
    var toto=document.getElementById('score1').innerText
    document.getElementById('score1').innerHTML = parseInt(toto)+parseInt(1)
  }
  if( feuille2.style.left=='310px' ){
    var titi=document.getElementById('score2').innerText
    console.log(titi)
    document.getElementById('score2').innerHTML = parseInt(titi)+parseInt(1)
  }
}

//point pour les ciseaux
var point2=function(){
  if(ciseaux1.style.left=='90px'){
    var toto=document.getElementById('score1').innerText
    document.getElementById('score1').innerHTML = parseInt(toto)+parseInt(1)
  }
  if( ciseaux2.style.left=='310px' ){
    var titi=document.getElementById('score2').innerText
    console.log(titi)
    document.getElementById('score2').innerHTML = parseInt(titi)+parseInt(1)
  }
}


var resultat=function(){
  if(pierre1.style.left=='90px' &&   pierre2.style.left=='310px' || feuille1.style.left=='90px' &&   feuille2.style.left=='310px' || ciseaux1.style.left=='90px' &&   ciseaux2.style.left=='310px'){
    egalite = setTimeout(function(){
      AfficherResultat('match null',1000);
    },1500);

  }
  if(pierre1.style.left=='90px' &&   ciseaux2.style.left=='310px'  || ciseaux1.style.left=='90px' &&   pierre2.style.left=='310px'  ){
    egalite = setTimeout(function(){
    point1();
    AfficherResultat('la pierre gagne',1000);

    },1500);
  }
  if(ciseaux1.style.left=='90px' &&   feuille2.style.left=='310px'  || feuille1.style.left=='90px' &&   ciseaux2.style.left=='310px'  ){
    egalite = setTimeout(function(){
    point2();
    AfficherResultat('le ciseaux gagne',1000);
    },1500);
  }
  if(feuille1.style.left=='90px' &&   pierre2.style.left=='310px'  || pierre1.style.left=='90px' &&   feuille2.style.left=='310px'  ){
    egalite = setTimeout(function(){
    point();
  AfficherResultat('la feuille gagne',1000);
    },1500);
  }
};

//remettre a zero pour chaque coup
var remiseAZero=function(){
  feuille1.style.left='2px';
  ciseaux1.style.left='2px';
  pierre1.style.left='2px';
  feuille2.style.left='398px';
  ciseaux2.style.left='398px';
  pierre2.style.left='398px';
  choix=[];
}




  webSocketclient.on('animation',function(data){
    console.log(data);
    if(document.getElementById('pseudo').innerText==data[0].pseudo){

      switch (data[0].choix){
        case 'pierre1':
          pierre1.style.left='90px'
        break;
        case 'feuille1':
          feuille1.style.left='90px'
        break;
        case 'ciseaux1':
          ciseaux1.style.left='90px'
        break;
      }
    }
      if(document.getElementById('adversaire').innerText==data[1].pseudo){
      switch (data[1].choix){

        case 'pierre1':
          pierre2.style.left='310px'
        break;
        case 'feuille1':
          feuille2.style.left='310px'
        break;
        case 'ciseaux1':
          ciseaux2.style.left='310px'
        break;
      }
    }
    if(document.getElementById('adversaire').innerText==data[0].pseudo){

      switch (data[1].choix){
        case 'pierre1':
          pierre1.style.left='90px'
        break;
        case 'feuille1':
          feuille1.style.left='90px'
        break;
        case 'ciseaux1':
          ciseaux1.style.left='90px'
        break;
      }
    }
      if(document.getElementById('pseudo').innerText==data[1].pseudo){
      switch (data[0].choix){

        case 'pierre1':
          pierre2.style.left='310px'
        break;
        case 'feuille1':
          feuille2.style.left='310px'
        break;
        case 'ciseaux1':
          ciseaux2.style.left='310px'
        break;
      }
    }
      resultat();





      rejouer = setTimeout(function(){
        remiseAZero();
      },3000);
      setTimeout(function(){
      legagnant();
      },3000);
  });




  var pierre1=document.getElementById('player1Pierre');
  var feuille1=document.getElementById('player1Feuille');
  var ciseaux1=document.getElementById('player1Ciseaux');
  var pierre2=document.getElementById('player2Pierre');
  var feuille2=document.getElementById('player2Feuille');
  var ciseaux2=document.getElementById('player2Ciseaux');
  var choix=[];

  pierre1.addEventListener('click',function(){
    if(choix.length==0){
      choix.push('pierre1');
      webSocketclient.emit('choisir',{choix:choix[0],pseudo:document.getElementById('pseudo').innerText,adversaire:document.getElementById('adversaire').innerText});
  }else{AfficherResultat('deja choisi tricheur!',1000)}
  });
  feuille1.addEventListener('click',function(){
  if(choix.length==0){
    choix.push('feuille1');
    webSocketclient.emit('choisir',{choix:choix[0],pseudo:document.getElementById('pseudo').innerText,adversaire:document.getElementById('adversaire').innerText});

  }else{  AfficherResultat('deja choisi tricheur!',1000)}
  });
  ciseaux1.addEventListener('click',function(){
  if(choix.length==0){
    choix.push('ciseaux1');
    webSocketclient.emit('choisir',{choix:choix[0],pseudo:document.getElementById('pseudo').innerText,adversaire:document.getElementById('adversaire').innerText});

  }else{AfficherResultat('deja choisi tricheur!',1000)}
  });
  // player2 CHOIX

});
