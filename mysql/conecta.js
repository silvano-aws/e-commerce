/*
   ESTE SCRIPT CONECTA COM O BANCO DE DADOS E CRIA AS TABELAS DO SISTEMA

*/
   
//conexao com Mysql

//const { CHAR, TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const fs=require('fs');
// Includes crypto module
const crypto = require('crypto');



/*
// Os dados da conexao podereriam ficar num arquivo config.jsom

{
    "development": {
        "dialect": "mysql",
        "port": 3306,
        "host": "localhost",
        "database": "findserv",
        "username": "root",
        "password": "awssis",
        "logging": false
    }
const config = require('../mysql/config.json')[env]

const db_empresairla  sequelize = new Sequelize(config.database, config.username, config.password, config)

*/
          //Parametros  Sequelize(banco,usuairo,senha,{objeto json servidor:,qualbanco:s})
/*
          Exemplo de criacao do banco com parametros
          
          const sequelize = new Sequelize("db_name", "username", "password", 
          {
            logging: false,
            host: "localhost",
            dialect: "mysql",
            dialectOptions: {
              // useUTC: false, //for reading from database
              dateStrings: true,
              typeCast: true,
              timezone: "+05:30"
            },
            timezone: "+05:30", //for writing to database
            operatorsAliases: false
          });
 */         
const db_ecommerce = new Sequelize("ecommerce","aws","Farioli2015!#@",
          {host:"localhost",dialect:"mysql"}
);

//index.js
//localhost

// note Dell
//const db_ecommerce = new Sequelize("ecommerce","aws","awssis", {host:"192.168.15.24",dialect:"mysql"});

//funcao anonima assincrona para conexão com o banco de dados
(async () => {
   await db_ecommerce.authenticate()
   .then(function(){ console.log("Conectado com sucesso!")
      db_ecommerce.sync();
    })
   .catch(function(erro){console.log("Falha na conexão com o banco de dados ecommerce! "+erro)});
});

const Clientes=db_ecommerce.define("clientes",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    nome:        {type:Sequelize.STRING(100),notEmpty: true },
    celular:     {type:Sequelize.STRING(16) ,notEmpty: true ,isNumeric: true },
    email:       {type:Sequelize.STRING(100),notEmpty: true ,isEmail: true },
    senha:       {type:Sequelize.STRING(32) ,notEmpty: true },    
    cpfcnpj:     {type:Sequelize.STRING(14) },      
    cep1:        {type:Sequelize.STRING(09) },      
    bairro1:     {type:Sequelize.STRING(50) },      
    cidade1:     {type:Sequelize.STRING(50) },      
    estado1:     {type:Sequelize.STRING(02) },      
    logradouro1: {type:Sequelize.STRING(100) },      
    numero1:     {type:Sequelize.STRING},      
    cep2:        {type:Sequelize.STRING(09) },      
    bairro2:     {type:Sequelize.STRING(50) },      
    cidade2:     {type:Sequelize.STRING(50) },      
    estado2:     {type:Sequelize.STRING(02) },      
    logradouro2: {type:Sequelize.STRING(100) },      
    numero2:     {type:Sequelize.STRING},
    idexterno:   {type:Sequelize.INTEGER},
    idloja:      {type:Sequelize.INTEGER} 
},
    {  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);

const Usuarios=db_ecommerce.define("usuarios",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    nome:        {type:Sequelize.STRING(100),notEmpty: true },
    celular:     {type:Sequelize.STRING(16) ,notEmpty: true ,isNumeric: true,},
    email:       {type:Sequelize.STRING(100),notEmpty: true ,isEmail: true,},
    senha:       {type:Sequelize.STRING(128) ,notEmpty: true }, 
    salt:        {type:Sequelize.STRING(32),notEmpty: true},
    admin:       {type:Sequelize.BOOLEAN},    
    idloja:      {type:Sequelize.INTEGER    }
    },
    {  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);
  
const Loja=db_ecommerce.define("loja",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    fantasia:    {type:Sequelize.STRING(100)},
    nome:        {type:Sequelize.STRING(100)},
    responsavel: {type:Sequelize.STRING(50)},
    celular:     {type:Sequelize.STRING(16) ,},
    telefone:    {type:Sequelize.STRING(13) ,},
    email:       {type:Sequelize.STRING(100),},
    senha:       {type:Sequelize.STRING(32) ,},    
    cpfcnpj:     {type:Sequelize.STRING(18) },      
    ie:          {type:Sequelize.STRING(11) },
    cep:         {type:Sequelize.STRING(09) },      
    bairro:      {type:Sequelize.STRING(50) },      
    cidade:      {type:Sequelize.STRING(50) },      
    estado:      {type:Sequelize.STRING(02) },      
    logradouro:  {type:Sequelize.STRING(100)},      
    numero:      {type:Sequelize.STRING(6)},
    logotipo:    {type:Sequelize.STRING(100)},
    img1:        {type:Sequelize.STRING(100)},
    banner:      {type:Sequelize.STRING(100)},
    corfundo:    {type:Sequelize.STRING(15)},
    tipo:        {type:Sequelize.STRING(100)}  
},
    {  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);

const Pedidos=db_ecommerce.define("pedidos",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    idcliente:   {type:Sequelize.INTEGER},
    idloja:      {type:Sequelize.INTEGER},
    vlritens:    {type:Sequelize.DECIMAL(13, 2)},
    vlrfrete:    {type:Sequelize.DECIMAL(13, 2)},
    vlrtotal:    {type:Sequelize.DECIMAL(13, 2)},
    empfrete:    {type:Sequelize.STRING(20)},
    formapgto:   {type:Sequelize.STRING(20)},
    qtdparcelas: {type:Sequelize.INTEGER},
    emppgto:     {type:Sequelize.STRING(20)},
    fretegratis: {type:Sequelize.BOOLEAN},
    situacao:    {type:Sequelize.STRING(25)} //RECEBIDO,EM SEPARACAO,ENVIADO P/TRANSPOTADORA,CANCELADO
},
{  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);

const Itenspedido=db_ecommerce.define("itenspedido",{
        idpedido:    {type:Sequelize.INTEGER},
        idproduto:   {type:Sequelize.INTEGER},
        seq:         {type:Sequelize.INTEGER}, 
        descricao:   {type:Sequelize.STRING(100),notEmpty: true },
        un:          {type:Sequelize.STRING(2),notEmpty: true },
        preco:       {type:Sequelize.DECIMAL(13, 2)},
        qtd:         {type:Sequelize.DECIMAL(10, 2)},
        core:        {type:Sequelize.STRING(10)}, //"PRETO/BRANCO/VERMELHO/AZUL/AMARELO/ROXO/ROSA/CINZA/LILAS"   
        tamanho:     {type:Sequelize.STRING(4)} //"PP/P/M/G/GG/XG/XL/XXL" OU "33/34/35/36/37/38/39/40/41/42/43/44/45/46"
    },
    {  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
    );
    
const Categorias=db_ecommerce.define("categorias",{
        id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
        idpai:       {type:Sequelize.INTEGER}, 
        idexterno:   {type:Sequelize.STRING(10)},
        descricao:   {type:Sequelize.STRING(50),notEmpty: true }
    },
    {  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
 );

 const Produtos=db_ecommerce.define("produtos",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    idexterno:   {type:Sequelize.STRING(20)},
    idcategoria: {type:Sequelize.INTEGER,notEmpty: true },
    descricaoext:   {type:Sequelize.STRING(100),notEmpty: true },
    descricaosite:  {type:Sequelize.STRING(100),notEmpty: true },
    msgsite      :  {type:Sequelize.STRING(100),notEmpty: true },
    complemento: {type:Sequelize.TEXT},
    detalhamento:{type:Sequelize.TEXT},
    un:          {type:Sequelize.STRING(2),notEmpty: true },
    peso:        {type:Sequelize.DECIMAL(10, 2)},
    preco:       {type:Sequelize.DECIMAL(13, 2)},
    precoprom:   {type:Sequelize.DECIMAL(13, 2)},
    qtdestoque:  {type:Sequelize.DECIMAL(10, 2)},
    qtdembal:    {type:Sequelize.DECIMAL(10, 2)},
    qtdprom:     {type:Sequelize.DECIMAL(10, 2)},
    codbarras:   {type:Sequelize.STRING(13)},
    altura:      {type:Sequelize.DECIMAL(10, 2)},
    largura:     {type:Sequelize.DECIMAL(10, 2)},
    comprimento: {type:Sequelize.DECIMAL(10, 2)},
    cores:       {type:Sequelize.STRING(100)}, //"PRETO/BRANCO/VERMELHO/AZUL/VERDE/AMARELO/ROXO/ROSA/CINZA/LILAS"   
    tamanhos:    {type:Sequelize.STRING(100)}, //"PP/P/M/G/GG/XG/XL/XXL" OU "33/34/35/36/37/38/39/40/41/42/43/44/45/46"
    img1:        {type:Sequelize.STRING(100)},
    img2:        {type:Sequelize.STRING(100)},
    img3:        {type:Sequelize.STRING(100)},
    idloja:      {type:Sequelize.INTEGER},
    naoexibir:   {type:Sequelize.BOOLEAN}
},
{  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);


const Contaemail=db_ecommerce.define("contaemail",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    idloja:      {type:Sequelize.INTEGER},
    host:        {type:Sequelize.STRING(200),notEmpty: true },
    pop3:        {type:Sequelize.STRING(200)},
    sender:      {type:Sequelize.STRING(200)},
    reply:       {type:Sequelize.STRING(200)},
    comcopia:    {type:Sequelize.STRING(200)}, 
    user:        {type:Sequelize.STRING(200)},
    pass:        {type:Sequelize.STRING(15)},
    receipt:     {type:Sequelize.BOOLEAN},
    auth:        {type:Sequelize.BOOLEAN},
    autpop3:     {type:Sequelize.BOOLEAN},
    msg1:        {type:Sequelize.STRING(200)},
    msg2:        {type:Sequelize.STRING(200)},
    redirecion : {type:Sequelize.STRING(200)},
    emailredir:  {type:Sequelize.STRING(200)},
    smtpport:    {type:Sequelize.INTEGER},
    smtpusessl:  {type:Sequelize.BOOLEAN}, 
    assinatura:  {type:Sequelize.STRING(100)}
},
{  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);

const Security=db_ecommerce.define("security",{
    id:     {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    siv  :   {type:Sequelize.BLOB},
    skey :   {type:Sequelize.BLOB}
},
{  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);


//============== Cria ou recria as tabelas - force= true - recria a tabela

const lforce=false;
// Sincroniza as tabelas ou cria se não existir ->lforse=true
Clientes.sync({force:lforce});
Itenspedido.sync({force:lforce});
Loja.sync({force:lforce});
Categorias.sync({force:lforce});
Usuarios.sync({force:lforce});
Pedidos.sync({force:lforce}); 
Produtos.sync({force:lforce});
Contaemail.sync({force:lforce});
Security.sync({force:lforce});

//Insere usuario ADMINISTRADOR se não existir

/*
// Associação  das tabelas
Clientes.belongsTo(Loja,{foreignKey:'idloja',allowNull:false});
Usuarios.belongsTo(Loja,{foreignKey:'idloja',allowNull:false});
Produtos.belongsTo(Loja,{foreignKey:'idloja',allowNull:false});
Pedidos.belongsTo(Loja,{foreignKey:'idloja',allowNull:false});

Pedidos.belongsTo(Clientes,{foreignKey:'idcliente',allowNull:false});
Itenspedido.belongsTo(Pedidos,{foreignKey:'idpedido',allowNull:false});
//Itenspedido.belongsTo(Produtos,{foreignKey:'idproduto',allowNull:false});
//Produtos.belongsTo(Itenspedido,{foreignKey:'idproduto',allowNull:false});
*/

Produtos.belongsTo(Categorias,{foreignKey:'idcategoria',allowNull:true});

// Configurações Iniciais
/*
function iniciasecurity(){
   Security.findAll().then((qrsecu) => {
       if (qrsecu===0){
          const _key = crypto.randomBytes(32);
          const _iv = crypto.randomBytes(16);
          console.log('_iv --->'+_iv.toString('hex'));
          Security.create({
             skey:_key,
             siv:_iv           
          })
       }
   })
};

iniciasecurity();
*/

// Se a tabela estiver vazia cadastra  um usuário padrao
//jdata = fs.readFileSync('public/json/usuarios.json', 'utf8');
//dbjson=JSON.parse(jdata);
 function insereusuario(){
    var _dbjson;
    var _jdata;
    Usuarios.findAll().then((qryusu)=>{
      if (qryusu.length === 0) {
          console.log('Lendo arquivo usuarios.json');
          _jdata=fs.readFileSync('public/json/usuarios.json')
          _dbjson = JSON.parse(_jdata); // faz o parse para jsons
          Usuarios.create(
               {  nome   :_dbjson.nome,
                  celular:_dbjson.celular,
                  email  :_dbjson.email,
                  senha  :_dbjson.senha,
                  salt   :_dbjson.salt,
                  admin  :_dbjson.admin,
                  idloja :_dbjson.idloja
               });
      }   
    })
}              

insereusuario()

// Se a tabela estiver vazia cadastra  uma Loja padrao
//jdata = fs.readFileSync('public/json/loja.json', 'utf8');
//dbjson=JSON.parse(jdata);

function insereloja(){}
   var jdata
   var dbjson
    Loja.findAll().then((qryloja) =>{
      if (qryloja.length===0){
         console.log('Lendo arquivo loja.json');
         jdata=fs.readFileSync('public/json/loja.json','utf-8');
         dbjson = JSON.parse(jdata); // faz o parse para jsons
         Loja.create(
            {  nome:dbjson.nome,     
               fantasia:dbjson.fantasia,  
               responsavel:dbjson.responsavel,
               celular:dbjson.celular,    
               telefone:dbjson.telefone,   
               email:dbjson.email,      
               senha:dbjson.senha,      
               cpfcnpj:dbjson.cpfcnpj,    
               ie:dbjson.ie,         
               cep:dbjson.cep,        
               bairro:dbjson.bairro,     
               cidade:dbjson.cidade,     
               estado:dbjson.estado,     
               logradouro:dbjson.logradouro, 
               numero:dbjson.numero,     
               logotipo:dbjson.logotipo,   
               banner:dbjson.banner,     
               tipo:dbjson.tipo       
            }
          ); 
      }  
    });

jdata=''
dbjson=''

//configuracao incial tabela email
//async () =>{
//    try{
fs.readFile('public/json/contaemail.json','utf-8', function (err, jdata) {
        if (err) {
            return console.log("Erro ao ler arquivo usuarios.json");
        }
        dbjson = JSON.parse(jdata); // faz o parse para jsons
        Contaemail.findAll().then((qryemail) => {
            if (qryemail.length === 0) {
                Contaemail.create(
                    {
                        idloja:dbjson.idloja,
                        host:dbjson.host,
                        pop3:dbjson.pop3,
                        sender:dbjson.sender,
                        reply:dbjson.reply,
                        comcopia:dbjson.comcopia,
                        user:dbjson.user,
                        pass:dbjson.pass,
                        receipt:dbjson.receipt,
                        auth:dbjson.auth,
                        autpop3:dbjson.autpop3,
                        msg1:dbjson.msg1,
                        msg2:dbjson.msg2,
                        redirecion:dbjson.redirecion,
                        emailredir:dbjson.emailredir,
                        smtpport:dbjson.smtpport,
                        smtpusessl:dbjson.smtpusessl,
                        assinatura:dbjson.assinatura

                    }
                );
            }
        } 

        );

    });

//}catch(erro){console.log(error)}
//};
 
 // ==== Exporta os nomes das tabelas para poderem ser usados em outros moddulos (.js)

 module.exports={Sequelize,db_ecommerce,Usuarios,Clientes,Itenspedido,Loja,Categorias,Produtos,Pedidos,Contaemail,Security};
 
 
 
 
 
 

