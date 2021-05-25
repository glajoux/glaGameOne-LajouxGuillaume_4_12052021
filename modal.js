function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form[name='reserve']");
const formData = document.querySelectorAll(".formData");
const btnClose = document.getElementById("close");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last"); 
const birthday = document.getElementById("birthdate"); 
const email = document.getElementById("email"); 
const nbrTournois = document.getElementById('quantity');
const newYork = document.getElementById('location1'); 
const sanFrancisco = document.getElementById('location2'); 
const seattle = document.getElementById('location3'); 
const chicago = document.getElementById('location4'); 
const boston = document.getElementById('location5'); 
const portland = document.getElementById('location6'); 
const villes = [newYork, sanFrancisco, seattle, chicago, boston, portland]; 
const conditionUtilisation = document.getElementById('checkbox1');
const btnSubmit = document.querySelector('.btn-submit[type="submit"]');


const erreurQuantiteTournois = document.getElementById('message__tournoi');
const erreurNom = document.getElementById('message__nom');
const erreurPrenom = document.getElementById('message__prenom'); 
const erreurEmail = document.getElementById('message__email'); 
const erreurBirthday = document.getElementById('message__birthday');
const erreurVille = document.getElementById('message__ville'); 
const erreurConditionVente = document.getElementById('message__conditionsUtilisation'); 

const dateBasse = new Date (1921, 1, 01);
const dateHaute = new Date (2011, 1, 01);
const dateNow = new Date(Date.now());


class resultat {
  constructor(endroit, valeur, message) {
    this.endroit = endroit;
    this.valeur = valeur;
    this.message = message;
  }
};

let resPrenom = new resultat(erreurPrenom, false, "Veuillez rentrer 2 caractères ou plus.");
let resNom = new resultat (erreurNom, false, "Veuillez rentrer 2 caractères ou plus.");
let resEmail = new resultat (erreurEmail, false, "Veuillez rentrer une adresse mail valide.");
let resBirthday = new resultat (erreurBirthday, false, "Merci de rentrer un date valide.");
let resTournois = new resultat (erreurQuantiteTournois, false, "Veuillez renseigner un nombre entre 0 et 99.");
let resVille = new resultat (erreurVille, false, "Veuillez indiquer une ville.");
let resCondition = new resultat (erreurConditionVente, false, "Veuillez accepter les conditions d'utilisation.");
let resTotals = [resPrenom, resNom, resEmail, resBirthday,resTournois, resVille, resCondition];
let conditionValidation =[false, false, false, false, false, false, false];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
};
// Ferme la modale
btnClose.addEventListener('click', function() {
  modalbg.style.display = "none";
});

// Fonction qui renvoi le message d'erreur en cas de mauvaise saisie
function messageErreur (ouInjecter, messageErreur, styleInput) {
  ouInjecter.innerText = messageErreur;
  styleInput.style.border = " 2px solid red"; 
};
//Fonction qui annule le message et la mise en forme en cas d'erreur
function annuleErreur (ouInjecter, messageErreur, styleSurInput) {
  ouInjecter.innerText = messageErreur;
  styleSurInput.style.border = "1px solid black"; 
};

//Ecoute l'input du nom et renvoie une erreur si celui ci est un nombre ou s'il a moins de 2 caratères.
firstName.addEventListener('change', function(e){
  if (/(^[a-zA-Z])([a-zA-Z\-\'])/.test(e.target.value)) {
    resPrenom.message = resPrenom.endroit.innerText = "" ;
    resPrenom.valeur = true;
    conditionValidation.splice(0,1, true)
  } else {
    resPrenom.message = resPrenom.endroit.innerText = "Veuillez rentrer 2 caractères ou plus." ;
    resPrenom.valeur = false;
    conditionValidation.splice(0,1, false)

    }
});

//Ecoute l'input du prenom et renvoie une erreur si celui ci est un nombre ou s'il a moins de 2 caratères.
lastName.addEventListener('change', function(e){
  if (/(^[a-zA-Z])([a-zA-Z\-\'])/.test(e.target.value)) {
    resNom.message = resNom.endroit.innerText = "" ;
    resNom.valeur = true;
    conditionValidation.splice(1,1, true)
  } else {
    resNom.message = resNom.endroit.innerText = "Veuillez rentrer 2 caractères ou plus." ;
    resNom.valeur = false;
    conditionValidation.splice(1,1, false)
  }

});

//Ecoute l'input de l'email et renvoie un resultat true si le format correpsond ou sinon message d'erreur.
email.addEventListener('change', function (e){
  if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i.test(e.target.value)){
    resEmail.message = resEmail.endroit.innerText = "" ;
    resEmail.valeur = true;
    conditionValidation.splice(2,1, true)
  } else {
    resEmail.message = resEmail.endroit.innerText = "Veuillez rentrer une adresse mail valide." ;
    resEmail.valeur = false;
    conditionValidation.splice(2, 1, false)
  }

});

//Ecoute l'input birthday et renvoie true si juste 
//Renvoie des messages d'erreurs si false en fonction de l'age rentré
birthday.addEventListener('change', function(e){
  let anniversaire = new Date(e.target.value);
  if((anniversaire >= dateBasse)&&(anniversaire <= dateHaute)){
    resBirthday.message = resBirthday.endroit.innerText = "" ;
    resBirthday.valeur = true;
    conditionValidation.splice(3, 1, true)
  } else if (anniversaire < dateBasse){
    resBirthday.message = resBirthday.endroit.innerText = "Vous me semblez un peu trop agé pour participer. Merci de rentrer une date valide." ;
    resBirthday.valeur = false;
    conditionValidation.splice(3, 1, false)
  } else if (anniversaire > dateNow){
    resBirthday.message = resBirthday.endroit.innerText = "Merci de rentrer un date valide." ;
    resBirthday.valeur = false; 
    conditionValidation.splice(3, 1, false)
  } else if ((anniversaire > dateHaute) && (anniversaire <= dateNow)){
    resBirthday.message = resBirthday.endroit.innerText = "Tu me semble un peu jeune pour participer, reviens nous voir dans quelques années." ;
    resBirthday.valeur = false; 
    conditionValidation.splice(3, 1, false)
  } else {
    resBirthday.message = resBirthday.endroit.innerText = "Merci de rentrer un date valide." ;
    resBirthday.valeur = false; 
    conditionValidation.splice(3, 1, false)
  }

})

//Ecoute l'input de la quantité de tournoi et renvoi une erreur si elle si compris entre 0-99 ou si lettres
nbrTournois.addEventListener('change', function(e) {
  if ((/[0-9]/.test(e.target.value)) && (e.target.value >= 0) && (e.target.value <100)){
    resTournois.message = resTournois.endroit.innerText = "" ;
    resTournois.valeur = true;
    conditionValidation.splice(4, 1, true)
  } else {
    resTournois.message = resTournois.endroit.innerText = "Veuillez renseigner un nombre entre 0 et 99." ;
    resTournois.valeur = false; 
    conditionValidation.splice(4, 1, false)
  }

});

//Ecoute les inputs de type radio compris dans la variable de type array villes
//Retourne le résultat dans une variable de type array. Si celui si est !=0 alors une ville est check
for (let i = 0; i < villes.length; i++){
  villes[i].addEventListener('change', function(){
    if (villes[i].checked){
      resVille.message = resVille.endroit.innerText = "" ;
      resVille.valeur = true;
      conditionValidation.splice(5, 1, true)
    } else {
        resVille.valeur = false; 
        resVille.message = resVille.endroit.innerText = "Veuillez indiquer une ville." ;
        conditionValidation.splice(5, 1, false)
      }
  })
  console.log(resVille.valeur)
};

//Ecoute l'input de condition d'utilisation et renvoie true si check et false sinon. 
conditionUtilisation.addEventListener('change', function (){
  if (conditionUtilisation.checked){
    resCondition.message = resCondition.endroit.innerText = "" ;
    resCondition.valeur = true;
    conditionValidation.splice(6, 1, true)
  } else {
    resCondition.message = resCondition.endroit.innerText = "Veuillez accepter les conditions d'utilisation." ;
    resCondition.valeur = false; 
    conditionValidation.splice(6, 1, false)
  }

});

function messageValidation () {
  formData.forEach(items => {
    items.style['visibility'] = 'hidden';
  });  
  let messsageValidation = document.createElement('p');
  messsageValidation.className = 'validation';
  messsageValidation.innerText = "Merci pour votre inscription !"
  form.appendChild(messsageValidation);

};
 let variableTest = true

/*
function test (constante){
  constante === true;
};
*/

function validationModale (e) {
  e.preventDefault(); 
  validationTableau()
  console.log(variableTest)

  if (variableTest === true) {
    messageValidation()
    fermeModal()
  }

}

function validationTableau () {
  for (let i = 0; i < resTotals.length; i++ ){
    if (resTotals[i].valeur === true) {
      return;
    } else {
    resTotals[i].endroit.innerText = resTotals[i].message
    variableTest = false 
    }
  }
}

btnSubmit.addEventListener('click', validationModale);


function fermeModal (){
  btnSubmit.setAttribute('value', 'Fermer');
  btnSubmit.addEventListener('click', function() {
    modalbg.style.display = "none";
  });  
}

