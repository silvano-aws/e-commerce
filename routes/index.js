// Inicio do controle de versão como Git: Fev/2022
// Este programa é chamado quando navegador acessa
// a pagina padrao vai http://awsinformatica.ddns.net:3000:ou uma das rotas definidas aqui
// Este modulo carrega o exppress e cria as rotas 

// Instruções sobre querys com sequelize
//https://sequelize.org/master/manual/model-querying-basics.html#operators


//======================= PONTO MUITO IMPORTANTE - TEM QUESER FEITO COMO ESTÁ AQUI SENÃO NÃO FUNCIONA =============
const { SSL_OP_ALL } = require('constants');
const express = require('express');
const router = express.Router();
// Instruções de uso Formidable: https://www.luiztools.com.br/post/como-fazer-upload-de-arquivos-em-node-js/
//There is a very good module for working with file uploads

var formidable = require('formidable'); 
const fs=require('fs');
//const { partials } = require('handlebars'); nao usa mais

//"use strict";
const nodemailer = require("nodemailer");


//====== P/uload de imagens usando o Multer ========
const multer = require('multer');
const upload = multer({ dest: 'public/images/produtos' });

var anomeimagem=[]; // para guardar o nome das imagens
var nomeimagem='';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/produtos/')
  },
    filename: function (req, file, cb) {
      nomeimagem=Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
      cb(null,nomeimagem); //Appending extension
      anomeimagem.push(nomeimagem); //Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }

});

const Upload = multer({storage: storage},3).any();

// Includes crypto module -para criptografia de senhas
const crypto = require('crypto');


// Salvar imagens no Mysql com Sequelize
//https://gist.github.com/saumyasuhagiya/bd29a46533a726960c10c79b1b8b4445

//=======================================Criptografia de senhas

// fonte: https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options
// Node.js program to demonstrate the    
// crypto.createCipheriv() method
 

 
// Defining algorithm
const algorithm = 'aes-256-cbc';
 
// Defining key
//const key = crypto.randomBytes(32);

//console.log('key--> gerada '+key.toString('hex'));
 
// Defining iv
//const iv = crypto.randomBytes(16);

 /*
https://pt.stackoverflow.com/questions/470891/criptografas-senha-com-crypto-no-node-js

//cryptar
function encryptedPwd(pwd){
  const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
  const key = crypto.createHash('sha256').update(String(pwd)).digest('base64').substr(0, 32);//pwd.toString().substr(0, 32);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  let encrypted = cipher.update(String(pwd), 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
}

//descryptar
   const testes1 = value => {
      const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
      const key = value.substr(0, 32);
      const cipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
      let encrypted = cipher.update(String(value), 'hex', 'utf8') + cipher.final('hex');
      return encrypted;
    }var http = require('http');


*/

 

// Carrega o arquivo de conexao e criacao das tabelas do sistema
const Sequelize=require("sequelize");
//notacoes destrutcturing --> { } a partir do ECMAScript 2015
// tira uma constante de um objeto

const { Op } = require("sequelize"); // PARA SER USADO COMO OPERADOR NAS QUERYS

const db_ecommerce = new Sequelize("ecommerce","aws","awssis", {host: "localhost",dialect:"mysql"});
const { Clientes   } = require("../mysql/conecta");
const { Itenspedido} = require("../mysql/conecta");
const { Loja       } = require("../mysql/conecta");
const { Categorias } = require("../mysql/conecta");
const { Produtos   } = require("../mysql/conecta");
const { Pedidos    } = require("../mysql/conecta");
const { Usuarios   } = require("../mysql/conecta");
const { Contaemail } = require("../mysql/conecta");
const { Security   } = require("../mysql/conecta");

const { Console } = require('console');

//===================================================================================================================
/*
// An encrypt function
function encrypt(text) {
  var _key='' ;
  var _iv=''  ;
  Security.findAll({where:{ id:1}})      
      .then(function(allsec){
         _key=allsec[0].skey;
         _iv=allsec[0].siv;
         console.log('***** allsec *****');
         //console.log(allsec);
         console.log('chave retornada '+_key.toString('hex'));
         console.log('iv retornado '+iv.toString('hex'));
         //console.log('sid retornado '+sid);
        }
      )
      .catch(function(erro) {console.log(erro)})
  
}; 
*/

//const iv = crypto.randomBytes(16).toString('hex')


// ================= funcoes retiradas do site: 
// https://marquesfernandes.com/tecnologia/criptografando-e-armazenando-senhas-com-nodejs-melhores-praticas/




function sha512(senha, salt){
  var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
  hash.update(senha);
  var hash = hash.digest('hex');
  return {
      salt,
      hash,
  };
} 

  function gerarSenha(senha) {
    var salt = crypto.randomBytes(16).toString('hex'); // Vamos gerar o salt
    var senhaESalt = sha512(senha, salt); // Pegamos a senha e o salt
    // A partir daqui você pode retornar a senha ou já salvar no banco o salt e a senha
    console.log('Senha Hash: ' + senhaESalt.hash);
    console.log('Salt: ' + senhaESalt.salt);
  };


gerarSenha('1235');


function login(senhaDoLogin, saltNoBanco, hashNoBanco) {
  var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
  return hashNoBanco === senhaESalt.hash;
}



//=======================================================================




// *** CORS ***
// Libera troca de arquivos entre o servidor e computadores remotos em outros domínios
router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { title: 'AWS E-commerce V 1.0' });
});

//Rotina para ler um arquivo json na pasta public/json - OK
router.get('/dadosloja',function(req,res){
   var db;
   var jdata = fs.readFileSync('public/json/loja.json','utf-8');
   db=JSON.parse(jdata);
   res.render('mensagens',{txtmsg:db.nome});
}
);

// rota de autentificacao se o usuario autenticar direciona  para a pagina de configurações
router.post("/configadm",async function(req,res){

  //console.log('Senha usuario informada '+req.body.loginsenha );
  //console.log('Senha usuario criptografada '+ _senha);

    await Usuarios.findAll({ where:{ email:req.body.loginemail}})
      .then(function(qryusu){
         if (qryusu.length>0){
           // verifica a senha digitada
           if (login(req.body.loginsenha, qryusu[0].salt, qryusu[0].senha)){
              res.render('painel', { title: 'Painel Administrativo' })
           }else{
            res.render('mensagens',{txtmsg:'Senha inválida, tente novamente!',icone:"images/alert.jpg"})
           }
         }else{
           res.render('mensagens',{txtmsg:'E-mail não cadastrado!',icone:"images/alert.jpg"})
         }})
     .catch(function(erro) {res.render("mensagens",{txtmsg:"Erro no select: "+ erro,icone:"images/alert.jpg"})  
});
})

// Rota para Edição de dados da Empresa - OK
router.get("/buscadadosloja",async function(req,res){
 //console.log('Busca dados da loja');
  await Loja.findAll( {where:{ id:2}})
   .then(function(qryloja){
      if (qryloja.length>0){
         //console.log('qryloja maior que zero......!!!!!');
         dados=JSON.stringify(qryloja,null,2); //transforma o resultado da query num objeto json
         //console.log(dados);
         res.json(dados);
      }
      else{
        //console.log('qryloja igual a zero......!!!!!');
        res.render('mensagens',{txtmsg:'Loja não encontrada',icone:"images/alert.jpg"});
      }})
  .catch(function(erro) {res.render("mensagens",{txtmsg:"Erro no select: "+ erro,icone:"images/alert.jpg"})  
});
})

// Rota para Edição de dados da Empresa - OK
router.get("/buscadadosemail",async function(req,res){
 
  await Contaemail.findAll( {where:{ id:1}})
   .then(function(qryemail){
      if (qryemail.length>0){
         console.log('qryemail');
         dados=JSON.stringify(qryemail,null,2); //transforma o resultado da query num objeto json
         //console.log(dados);
         res.json(dados);
      }
      else{
        res.render('mensagens',{txtmsg:'Email não encontrado',icone:"images/alert.jpg"});
      }})
  .catch(function(erro) {res.render("mensagens",{txtmsg:"Erro no select: "+ erro,icone:"images/alert.jpg"})  
});
})



// Inclui clientes (dados para compras) se não existir
router.post("/addcliente", async function(req,res){
       await Clientes.findAll({
       //where: {email:req.body.email,celular:req.body.celular}
       where: { [Op.or]:[{celular:req.body.celular},{email:req.body.email}] } // verifica se o email ou celular digitado ja foi cadastrado 
      }).then(function(qrycli){
         if (qrycli.length===0){
           Clientes.create(
             {nome:req.body.nome,
              celular:req.body.celular,                               
              email:req.body.email,                      
              senha:req.body.senha,
              cpfcnpj:req.body.cnpjcpf,
              cep1:req.body.cep1,
              bairro1:req.body.bairro1,
              cidade1:req.body.cidade1,
              estado1:req.body.estado1,
              logradouro1:req.body.logradouro1,
              numero1:req.body.numero1,
              cep2:req.body.cep2,
              bairro2:req.body.bairro2,
              cidade2:req.body.cidade2,
              estado2:req.body.estado2,
              logradouro2:req.body.logradouro2,
              numero2:req.body.numero2,
              adm:false,
              idexterno:0,
              idloja:1
            })
              .then(function() {res.render('mensagens',{icone:"images/positivo.png/",txtmsg:'Prezado cliente, você foi cadastrado com sucesso em nosso banco de dados!.Esperamos que faça boas compras e volte sempre!'})})
              .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ erro})})
           }
       else{
           res.render('mensagens',{icone:"images/alert.jpg",txtmsg:'Cliente já cadastrado'})
       }  
     })
     .catch(function(erro) {res.render('mensagens',{icone:"images/alert.jpg",txtmsg:'Erro no select: '+ erro})});
});



//============================== USO DO MULTER PARA CARREGAMENTO DE IMAGENS ==================================================// 
/*

var anomeimagem=[]; // para guardar o nome das imagens
var nomeimagem=''    // para receber a formulado nome da imagem
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/produtos/')
  },
      filename: function (req, file, cb) {
         nomeimagem=Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1] ;         
         cb(null,nomeimagem );   
         anomeimagem.push(nomeimagem);
     }
});
*/

//const Upload = multer({storage: storage},3).any();

//===================================================== MULTER ==============================================================//



//Insere produtos se nao existir
router.post("/addproduto",Upload,async function(req,res){
   const _descsite=req.body.descricaosite; 
   const _idext=req.body.idexterno;        

   const _id=parseInt(req.body.id);
   const _peso       =!req.body.peso       ? null:parseFloat(req.body.peso       );   
   const _preco      =!req.body.preco      ? null:parseFloat(req.body.preco      ); 
   const _precoprom  =!req.body.precoprom  ? null:parseFloat(req.body.precoprom  ); 
   const _qtdestoque =!req.body.qtdestoque ? null:parseFloat(req.body.qtdestoque ); 
   const _qtdembal   =!req.body.qtdembal   ? null:parseFloat(req.body.qtdembal   ); 
   const _qtdprom    =!req.body.qtdprom    ? null:parseFloat(req.body.qtdprom    ); 
   const _altura     =!req.body.altura     ? null:parseFloat(req.body.altura     ); 
   const _largura    =!req.body.largura    ? null:parseFloat(req.body.largura    ); 
   const _comprimento=!req.body.comprimento? null:parseFloat(req.body.comprimento); 
   const _categoria  =!req.body.categoria  ? null:parseFloat(req.body.categoria);

   console.log('id externo '+_idext+ ' descricao site '+_descsite);
   console.log('Categoria :'+req.body.categoria);

    await Produtos.findAll( { where: { [Op.or]:[{descricaosite:_descsite},{idexterno:_idext}]} })
    .then(function(qryprod){
      if (qryprod.length===0){
          Produtos.create(
              { idexterno:_idext, //req.body.idexterno,   
                idcategoria:_categoria, //req.body.idcategoria,
                descricaoext:req.body.descricaoext,
                descricaosite:req.body.descricaosite,          
                msgsite:req.body.msgsite,     
                complemento:req.body.complemento,
                un:req.body.un,         
                peso:_peso, //req.body.peso,       
                preco:_preco, //req.body.preco,      
                precoprom:_precoprom,  //req.body.precoprom,  
                qtdestoque:_qtdestoque, //req.body.qtdestoque, 
                qtdembal:_qtdembal, //req.body.qtdembal,   
                qtdprom:_qtdprom, //req.body.qtdprom,    
                codbarras:req.body.codbarras,  
                altura:_altura, //req.body.altura,     
                largura:_largura, //req.body.largura,    
                comprimento:_comprimento, //req.body.comprimento,
                cores:req.body.cores,      
                tamanhos:req.body.tamanhos,   
                img1:anomeimagem[0],//req.body.img1,       
                img2:anomeimagem[1] ,        
                img3:anomeimagem[2] ,        
                idloja:req.body.idloja})
                .then(function(){res.render('mensagens',{txtmsg:'Produto, cadastrado com sucesso!.',icone:'images/positivo.png'})})
                .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ erro,icone:'images/alert.jpg'})})

      }else{
          res.render('mensagens',{txtmsg:'Produto já Cadastrado!',icone:"images/positivo.png"})
      }      
      nomeimagem='';
      anomeimagem=[];
}).catch(function(erro) {res.render('mensagens',{txtmsg:'Erro no select: '+ erro,icone:"images/alert.jpg"})})
});

/* duplicidade
//Rota para listar contatos
// OBS: VERIFICAR COMO USA O HANDLEBArS PARA PASSAR E EXIBIR PARAMETROS
router.get('/listaproduto', async function(req, res) {
//  Produtos.findAll({order: [['descricaosite','asc'],['idcategoria','DESC']]})
  try
  {
     await Produtos.findAll({order:[ ['descricaosite','asc'] ]});
     res.render('listaprodutos', { title: 'LISTA DE PRODUTOS A VENDA' ,data: new Date(),arraycont : allprod});
  } 
  catch (error)
  {
    res.render('mensagens',{txtmsg:'Erro no select: '+ error,icone:"images/alert.jpg"});
  }   
});  
*/

//Altera dados do produto localizando pelo id
//chamado pelo modulo listaprodutos.ejs
router.post('/editaproduto',Upload,async function(req, res){
   // Converte os campos para gravação     
   //console.log('array anomeimagem');
   //console.log(anomeimagem.length);

   const _id=parseInt(req.body.id);
   const _peso       =!req.body.peso       ? null:parseFloat(req.body.peso       );   
   const _preco      =!req.body.preco      ? null:parseFloat(req.body.preco      ); 
   const _precoprom  =!req.body.precoprom  ? null:parseFloat(req.body.precoprom  ); 
   const _qtdestoque =!req.body.qtdestoque ? null:parseFloat(req.body.qtdestoque ); 
   const _qtdembal   =!req.body.qtdembal   ? null:parseFloat(req.body.qtdembal   ); 
   const _qtdprom    =!req.body.qtdprom    ? null:parseFloat(req.body.qtdprom    ); 
   const _altura     =!req.body.altura     ? null:parseFloat(req.body.altura     ); 
   const _largura    =!req.body.largura    ? null:parseFloat(req.body.largura    ); 
   const _comprimento=!req.body.comprimento? null:parseFloat(req.body.comprimento); 
   const _categoria  =!req.body.categoria  ? null:parseFloat(req.body.categoria);
   console.log('Select passado na rota edita produto',req.body.categoria);

  try
  {
   await Produtos.update(
       { idexterno:req.body.idexterno,   
         idcategoria:req.body.idcategoria,
         descricaoext:req.body.descricaoext,
         descricaosite:req.body.descricaosite,          
         msgsite:req.body.msgsite,     
         complemento:req.body.complemento,
         detalhamento:req.body.detalhamento,
         un:req.body.un,         
         peso:_peso, //req.body.peso,       
         preco:_preco, //req.body.preco,      
         precoprom:_precoprom, //req.body.precoprom,  
         qtdestoque:_qtdestoque, //req.body.qtdestoque, 
         qtdembal:_qtdembal, //req.body.qtdembal,   
         qtdprom:_qtdprom, //req.body.qtdprom,    
         codbarras:req.body.codbarras,  
         altura:_altura, //req.body.altura,     
         largura:_largura, //req.body.largura,    
         comprimento:_comprimento, //req.body.comprimento,
         idcategoria:_categoria,
         cores:req.body.cores,      
         tamanhos:req.body.tamanhos,   
         img1:anomeimagem[0],//req.body.img1,       
         img2:anomeimagem[1] ,        
         img3:anomeimagem[2] ,        
         idloja:req.body.idloja
       } ,{where:{id:_id}}); 
       nomeimagem='';
       anomeimagem=[];
       res.render('mensagens',{txtmsg:'Produto, alterado com sucesso!.',icone:'images/positivo.png'});
   }   
  catch (error)
  {
    res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ error,icone:'images/alert.jpg'});
  }
})

//Altera dados do produto localizando pelo id
router.post('/editacategoria',async function(req, res){
  console.log('id da categoria: '+req.body.id_cat);
  // Converte os campos para gravação     
  const _id=parseInt(req.body.id_cat);
 try
 {
  await Categorias.update(
      { idexterno:req.body.idexterno_cat,   
        idpai:req.body.idpai_cat,
        descricao:req.body.descricao_cat,
      } ,{where:{id:_id}}); 
      res.render('mensagens',{txtmsg:'Categoria, alterada com sucesso!.',icone:'images/positivo.png'});
  }   
 catch (error)
 {
   res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ error,icone:'images/alert.jpg'});
 }
})


//Rota para listar categorias
router.get('/listacategoria', async function(req, res) {
 //Produtos.findAll({order: [['descricaosite','DESC'],['idcategoria','DESC']]})
 await Categorias.findAll({order:[ ['descricao','asc'] ]})
    .then(function(allprod){res.render('listacategorias', { title: 'LISTA DE CATEGORIA DE PRODUTOS' ,data: new Date(),arraycont : allprod})})
    .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro no select: '+ erro,icone:"images/alert.jpg"})})
 });  


 //Rota para listar prodtos
router.get('/listaproduto', async function(req, res) {
  //Produtos.findAll({order: [['descricaosite','DESC'],['idcategoria','DESC']]})
  await Produtos.findAll({order:[ ['descricaosite','asc'] ]})
     .then(function(allprod){res.render('listaprodutos', { title: 'LISTA DE PRODUTOS A VENDA' ,data: new Date(),arraycont : allprod})})
     .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro no select: '+ erro,icone:"images/alert.jpg"})})
  });  
 


// Inclui categoriasse não existir
router.post("/addcategoria", async function(req,res){
  // Converte os campos para gravação     
   var _id_pai_cat = 0  
   if (!req.body.idpai_cat===null){
      _id_pai_cat = parseInt(req.body.idpai_cat);
   };

  await Categorias.findAll({where: { descricao:req.body.descricao_cat }})
       .then(function(qrycat)
       {
         if (qrycat.length===0)
         {
          Categorias.create({
          descricao:req.body.descricao_cat,
          idpai:_id_pai_cat,
          idexterno:req.body.idexterno_cat})
          .then(function(){res.render('mensagens',{txtmsg:'Categoria, cadastrada com sucesso!.',icone:'images/positivo.png'})})
          .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ erro,icone:'images/alert.jpg'})})   
         }
         else
         {
           res.render('mensagens',{txtmsg:'Categoria já Cadastrado!',icone:"images/alert.jpg"})
         }
       })
       .catch(function(error){res.render('mensagens',{txtmsg:'Erro o Select: '+error,icone:"images/alert.jpg"})
       })      
})




router.post("/editaemail", async function(req,res){
  // Converte os campos para gravação     

         //OBS: NÃO POD TER - NOS NAMES DOS INPUTS PQ DÁ ERRO

     try
        { 
        await  Contaemail.update({
            idloja:1,      
            host:req.body.emailsmtp,        
            pop3:req.body.emailpop,      
            sender:req.body.emailsender,      
            reply:req.body.emailreply,       
            comcopia:req.body.emailcc,    
            user:req.body.emailuser,        
            pass:req.body.emailpassword,        
            receipt:req.body.emailreceipt,     
            auth:req.body.emailauth,        
            autpop3:req.body.emailauthpop3,     
            redirecion:req.body.emailredirecion, 
            emailredir:req.body.emailredir,  
            smtpport:req.body.emailsmtpportsmtp,    
            smtpusessl:req.body.emailusessl},   
            {where: {id:1 }});
            //assinatura:''  
            //msg1:'',        
            //msg2:'',        
            res.render('mensagens',{txtmsg:'Dados alterados com sucesso!.',icone:"images/positivo.png"   });
          } 
            catch(error)
           {
             res.render('mensagens',{txtmsg:'Erro na gravação dos dados de e-mail! '+ error,icone:"images/alert.jpg"});
           }  
          }); 

// altera os dados da loja com dados vindos do formulario 
// Por enquanto tabela de registro unico
router.post("/alteraloja", async function(req,res){

 try
 { 
    await Loja.update({
       fantasia:   req.body.fantasia, 
       nome:       req.body.nome,        
       responsavel:req.body.responsavel, 
       celular:    req.body.celular,     
       telefone:   req.body.telefone,    
       email:      req.body.email,        
       senha:      req.body.senha,       
       cpfcnpj:    req.body.cpfcnpj,     
       ie:         req.body.ie,          
       cep:        req.body.cep,         
       bairro:     req.body.bairro,      
       cidade:     req.body.cidade,      
       estado:     req.body.estado,      
       logradouro: req.body.logradouro,  
       numero:     req.body.numero,      
       logotipo:   req.body.logotipo,    
       banner:     req.body.banner},   
       {where: {id:1 }});
   res.render('mensagens',{txtmsg:'Dados alterados com sucesso!.',icone:"images/positivo.png"   });
 } 
   catch(error)
  {
    res.render('mensagens',{txtmsg:'Erro na gravação dos dados da loja! '+ error,icone:"images/alert.jpg"});
  }  
 }); 
 

module.exports = router;




/* Cabeçalhos HTTP
res.format ({
   'text/plain': function() {
      res.send('hey');
   },

   'text/html': function() {
      res.send('hey'); 
   },

   'application/json': function() {
      res.send({ message: 'hey' });
   },

   'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
   }
});
*/

router.get("/retornacategoriamenu", async function(req,res){
  console.log('Retornando Categorias');
  var menu_categoria = '';
  await Categorias.findAll({order:[ ['descricao','asc'] ]})
       .then(function(qrycat)
       {  
         for (item of qrycat){ 
            menu_categoria +=  '  <a class="dropdown-item" href="#"'+' onclick="'+'buscaProdutoscategoria('+item.id.toString()+');">' + item.descricao + '</a> '
         }
         console.log(menu_categoria);
         res.send(menu_categoria);
       })      
       .catch(function(error)
       {
         res.render('mensagens',{txtmsg:'Erro no select de categorias! '+ error,icone:"images/alert.jpg"});
       })  
       
});

// chamada pela funcao: setacategoriacadprod() em listraprodutos.ejs
//retorna a descricao da categoria - usado no cadatro do produto (janela modal)
router.get("/retornacategoriacadproduto", async function(req,res){
  //console.log('Retornando Categorias');
  var selec_categoria = '';
  await Categorias.findAll({order:[ ['descricao','asc'] ]})
       .then(function(qrycat)
       {  
         for (item of qrycat){ 
            
             selec_categoria+='<option value="'+item.id.toString()+'">'+item.descricao+'</option>'
           }
         console.log(selec_categoria);
         res.send(selec_categoria);
       })      
       .catch(function(error)
       {
         res.render('mensagens',{txtmsg:'Erro no select de categorias! '+ error,icone:"images/alert.jpg"});
       })  
       
});


// Pesquisa de produtos
// Mostra o resultado da pesquisa de item
// no navegador: http://awsinformatica.ddns.net:3000/filtraprodutos/nome do produto
router.get("/filtraprodutos/:produto?", async function(req,res){
  var part1_div='<div class="product-grid"> <div class="content_box-grid"><a href="#">'
  var part2_div='';
  var imgprod='';
  var descriprod='';
  var precoprod='';
  var msgprod=''
  var detalhamento=''
  //se o produto não for definido, joga nulo, se não pega o produto
  var prod=(typeof(req.params.produto) === "undefined" ? "" : req.params.produto)

     console.log('requiscao produto '+prod);
     await Produtos.findAll({where : { descricaosite : {[Op.like]:'%'+prod+'%' } } })
     .then(function(qryprod){ 
       console.log('produtos retornados:');
       console.log(qryprod.length);    
       for (item of qryprod){ 
          if (item.img1 !== null||item.img1!==""){
              imgprod=item.img1
          }else{
            imgprod='sem_imagem.jpg'
          }
          idprod=item.id ;//.toString();
          descriprod=item.descricaosite; //.trim();
          precoprod=item.preco; //.toString();
          msgprod=item.msgsite;

          // troca as quebras de linha da string para quebras de linha HTML
          if (item.detalhamento!=null){  
             detalhamento = item.detalhamento.replace(/(?:\r\n|\r|\n)/g, '<br>');
          }   

          part2_div+=part1_div;
            
          part2_div+='<img src="images/produtos/'+imgprod+'" width="33.33%" height="150px" style="margin-bottom:5px" class="img-responsive watch-right"'+
          ' onclick="chamamodaldetalhes'+"('#form-detalhes','/images/produtos/"+imgprod+"','"+descriprod+"','"+'<h4>'+detalhamento+'</h4>'+"');"+'" alt=""/> </a>'+
          '<p> <label for="qtd-comprar">Qtd. </label> <input class="qtdint3" id="qtdcompra_'+idprod +'" type="number" size="4" value ="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57"> </input> '+
          ' </div> <a class="btn btn-success btn-lg" href="#" style="margin-bottom:5px" role="button"' +
          ' onclick="adicionaitemcarrinho('+idprod+','+"'"+descriprod+"'"+','+'getElementById('+"'"+'qtdcompra_'+idprod+"').value"+','+precoprod+');"'+
          '>Comprar</a> </p>' +
          ' <h5>'+descriprod+'<strong> - R$'+precoprod+'</strong> </h5>' +
          ' <h5 style='+'"color:red">'+msgprod+'</h5> </div>'

       }

       part2_div+='<div class="clearfix"> </div>'
       console.log(part2_div); 
       res.end(part2_div); 

      })
       .catch(function(error) {
        res.render('mensagens',{txtmsg:'Erro no select de produtos! '+ error,icone:"images/alert.jpg"})})
});


router.get("/filtraprodutoscategoria/:categoria?", async function(req,res){
  var part1_div='<div class="product-grid"> <div class="content_box-grid">'
  var part2_div='';
  var imgprod='';
  var descriprod='';
  var precoprod='';
  var msgprod=''
  //se o produto não for definido, joga nulo, se não pega o produto
  const _categoria=parseFloat(req.params.categoria);
  await Produtos.findAll(
    {where : { idcategoria:_categoria }})
      .then(function(qryprod){ 
       console.log('produtos retornados:');
       console.log(qryprod.length);    
       for (item of qryprod){ 
          if (item.img1 !== null||item.img1!==""){ //se não tiver imagem cadastrada exibe uma padrão
              imgprod=item.img1
          }else{
            imgprod='sem_imagem.jpg'
          }
          descriprod=item.descricaosite //.trim();
          precoprod=item.preco //.toString();
          msgprod=item.msgsite;

          // troca as quebras de linha da string para quebras de linha HTML
          if (item.detalhamento!=null){  
            detalhamento = item.detalhamento.replace(/(?:\r\n|\r|\n)/g, '<br>');
          }   

          part2_div+=part1_div;

          part2_div+='<img src="images/produtos/'+imgprod+'" width="33.33%" height="150px" style="margin-bottom:5px" class="img-responsive watch-right"'+
          ' onclick="chamamodaldetalhes'+"('#form-detalhes','/images/produtos/"+imgprod+"','"+descriprod+"','"+'<h4>'+detalhamento+'</h4>'+"');"+'" alt=""/> </a>'+
          '<p> <label for="qtd-comprar">Qtd. </label> <input class="qtdint3" id="qtdcompra_'+idprod +'" type="number" size="4" value ="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57"> </input> '+
          ' </div> <a class="btn btn-success btn-lg" href="#" style="margin-bottom:5px" role="button"' +
          ' onclick="adicionaitemcarrinho('+idprod+','+"'"+descriprod+"'"+','+'getElementById('+"'"+'qtdcompra_'+idprod+"').value"+','+precoprod+');"'+
          '>Comprar</a> </p>' +
          ' <h5>'+descriprod+'<strong> - R$'+precoprod+'</strong> </h5>' +
          ' <h5 style='+'"color:red">'+msgprod+'</h5> </div>'

/*
          part2_div+='<img src="images/produtos/'+imgprod+'" width="33.33%" style="margin-bottom:5px" class="img-responsive watch-right"'+
          ' onclick="chamamodaldetalhes'+"('#form-detalhes','/images/produtos/"+imgprod+"','"+descriprod+"','"+'<h4>'+detalhamento+'</h4>'+"');"+'" alt=""/> </a>'+
          '<p> <label for="qtd-comprar">Qtd. </label> <input class="qtdint3" id="qtdcompra_'+idprod +'" type="text" size="4"> </input> '+
          ' </div> <a class="btn btn-success btn-lg" href="#" style="margin-bottom:5px" role="button"' +
          ' onclick="adicionaitemcarrinho('+idprod+','+"'"+descriprod+"'"+','+'getElementById('+"'"+'qtdcompra_'+idprod+"').value"+','+precoprod+');"'+
          '>Comprar</a> </p>' +
          ' <h5>'+descriprod+'<strong> - R$'+precoprod+'</strong> </h5>' +
          ' <h5 style='+'"color:red">'+msgprod+'</h5> </div>'

*/          
       }

       part2_div+='<div class="clearfix"> </div>'
       console.log(part2_div); 
       res.end(part2_div); 

      })
       .catch(function(error) {
        res.render('mensagens',{txtmsg:'Erro no select de produtos! '+ error,icone:"images/alert.jpg"})})
});


//rota para teste de troca de aqruivos via HTTP
router.get('/testejson',async function(req,res){
  res.format ({
      //'application/json' 'text/plain'
    'application/json'
      : await function() {
        // para testar com o c:\web\json\tete2-json.html
        //fs.readFile('public/json/teste.json','utf-8', function(err,data){
        //para testar com o c:\web\json\heroes.html  
        fs.readFile('public/json/superheroes.json','utf-8', function(err,data){
        //fs.readFile('public/json/estados.json','utf-8', function(err,data){
           if(err){
             return console.log("Erro ao ler arquivo");
           }
         var jsonData = JSON.parse(data); // faz o parse para jsons
         console.log(jsonData);
         //res.send(data);
         res.json(jsonData);
         //res.end();
       })
      }
   }) 
});

router.get('/sendmail',function(req,res){
 //conta este criada em: https://mailtrap.io/inboxes
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c4a11df32b53d7",
      pass: "7999d4b6210507"
    }
  });

  // send mail with defined transport object
  var message = {
    from: "noreplay@aws-ecommerce.com.br", // sender address
    to: "sbf.aws@gmail.com, silvano.faria@awsinformatica.com.br", // list of receivers
    subject: "Teste de envio de email", // Subject line
    text: "Olá, este é um teste de envio. /n/n Att. AWS E-commerce", // plain text body
    html: "<b>Olá, este é um teste de envio<br><br> Att., AWS E-commerce </b>", // html body
  }

  transporter.sendMail(message,function(err){
    if(err){
       return console.log('Erro: Status400');
    }else{
      return console.log('Email enviado com sucesso!');
    }
  })
})

router.post('/fileupload', function (req, res) {
    var form = new formidable.IncomingForm();
    var prod
      form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath; //nome do input que recebe o arquivo
      var newpath = 'uploads/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
         if (err) throw err;
      })
    var _dbjson;
    var _jdata;
    //console.log('Lendo arquivo produtos.json');
    _jdata=fs.readFileSync('uploads/produtos.json') //,'utf-8')
    _dbjson=JSON.parse(_jdata) 
    //console.log('Escrevendo arquivo json...') 
    //console.log(_dbjson)
    for (let i=0;i<_dbjson.produtos.length;i++) {
        //console.log('for -> id: '+_dbjson.produtos[i].ideexterno)
          Produtos.findAll(
          {where : { idexterno:_dbjson.produtos[i].ideexterno }})
          .then((qryprod)=>{
                
                if (qryprod.length===0){
                  
                   Produtos.create(
                    { idexterno    : _dbjson.produtos[i].ideexterno,   
                      idcategoria  : _dbjson.produtos[i].idecategoria, 
                      descricaoext : _dbjson.produtos[i].descricaoext,
                      descricaosite: _dbjson.produtos[i].descricaosite,  
                      complemento  : _dbjson.produtos[i].complemento,
                      detalhamento : _dbjson.produtos[i].detalhamento,
                      un           : _dbjson.produtos[i].un,         
                      preco        : _dbjson.produtos[i].preco,      
                      qtdestoque   : _dbjson.produtos[i].qtdestoque,  
                      qtdembal     : 1,    
                      codbarras    : _dbjson.produtos[i].codbarras,  
                      img1         : _dbjson.produtos[i].img1,       
                      idloja       :1})
                      
                      .then(console.log('Produto: '+_dbjson.produtos[i].ideexterno +' cadastrado com sucesso!'))
                      .catch(function(erro) {res.render('mensagens',{txtmsg:'Erro na gravação dos dados! '+ erro,icone:'images/alert.jpg'})})
                      //msgsite:req.body.msgsite,     
                      //peso:_peso, //req.body.peso,       
                      //precoprom:_dbjson.produtos[i].preco,   
                      //qtdprom:_qtdprom, //req.body.qtdprom,    
                      //altura:_altura, //req.body.altura,     
                      //largura:_largura, //req.body.largura,    
                      //comprimento:_comprimento, //req.body.comprimento,
                      //cores:req.body.cores,      
                      //tamanhos:req.body.tamanhos,   
                      //img2:anomeimagem[1] ,        
                      //img3:anomeimagem[2] ,        
                    
                   //console.log('O produto '+_dbjson.produtos[i].ideexterno+' pode ser cadastrado')                     
                  }
               else{
                  console.log('Produto '+_dbjson.produtos[i].descricaoext+' já cadastrado, importação não permitida!');
                 }   
             
          }) 
          
          } //for
          
})  
  res.write('File uploaded and moved!');
  res.end();
})    


   /*
    Usuarios.findAll().then((qryusu)=>{
          Usuarios.create(
               {  nome   :_dbjson.nome,
                  celular:_dbjson.celular,
                  email  :_dbjson.email,
                  senha  :_dbjson.senha,
                  salt   :_dbjson.salt,
                  admin  :_dbjson.admin,
                  idloja :_dbjson.idloja
               });
   */

      

/*
// funcionou legal - dez 2021
var http = require('http');
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'uploads/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
*/

