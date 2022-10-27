//<script>
const header = document.querySelector('header');
const section = document.querySelector('section');

//variavel que vai receber o arquivo .json
//const reqURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
const reqURL = 'http://localhost:3000/testejson/';

//cria uma nova instancia do objeto XMLHttprequest  
var objreq = new XMLHttpRequest();

// abre a solicitacao com acao GET e endere�o do webservice
//	objreq.open('GET', reqURL); -- passado para o click do botao

//define o tipo de resposta da transacao como json
objreq.responseType = 'json';


//envia a solicitacao
 //     objreq.send(); -- passado para o click do botao

objreq.onload=function(){
   var superHeroes = objreq.response;
   populateHeader(superHeroes);
 showHeroes(superHeroes);
}

function populateHeader(jsonObj) {
 var myH1 = document.createElement('h1');
 myH1.textContent = jsonObj['squadName'];
 header.appendChild(myH1);
 var myPara = document.createElement('p');
 myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'][0];
 header.appendChild(myPara);
}

function showHeroes(jsonObj) {
 var heroes = jsonObj['members'];

 for (var i = 0; i < heroes.length; i++) {
   var myArticle = document.createElement('article');
   var myH2      = document.createElement('h2');
   var myPara1   = document.createElement('p');
   var myPara2   = document.createElement('p');
   var myPara3   = document.createElement('p');
   var myList    = document.createElement('ul');

   myH2.textContent = heroes[i].name;
   myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
   myPara2.textContent = 'Age: ' + heroes[i].age;
   myPara3.textContent = 'Superpowers:';

   var superPowers = heroes[i].powers;
   for (var j = 0; j < superPowers.length; j++) {
     var listItem = document.createElement('li');
     listItem.textContent = superPowers[j];
     myList.appendChild(listItem);
   }

   myArticle.appendChild(myH2);
   myArticle.appendChild(myPara1);
   myArticle.appendChild(myPara2);
   myArticle.appendChild(myPara3);
   myArticle.appendChild(myList);

   section.appendChild(myArticle);
 }
}

$(function(){
   $('#linkheroes').on('click',function(){
       objreq.open('GET', reqURL);
   objreq.send();		
   });
})

$(function(){
   $('#limpar').on('click',function(){
       //alert('clicou o botao LIMPAR'); 	
    $('header').html("");
    $('section').html("");
    });
})

//</script> 