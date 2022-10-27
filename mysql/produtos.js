/*
const Sequelize = require("sequelize");
//const db_ecommerce = require('../mysql/conecta.js');

const db_ecommerce = new Sequelize("ecommerce","aws","awssis", {host: "localhost",dialect:"mysql"});

db_ecommerce.authenticate().then(function(){ console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha na conex�o com o banco de dados ecommerce! "+erro)
});

const Produtos=db_ecommerce.define("produtos",{
    id:          {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true },
    idexterno:   {type:Sequelize.STRING(20)},
    idcategoria: {type:Sequelize.INTEGER,notEmpty: true },
    descricaoext:   {type:Sequelize.STRING(100),notEmpty: true },
    descricaosite:  {type:Sequelize.STRING(100),notEmpty: true },
    msgsite      :  {type:Sequelize.STRING(100),notEmpty: true },
    complemento: {type:Sequelize.TEXT},
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
    idloja:      {type:Sequelize.INTEGER}
},
{  freezeTableName: true }   //para nao mudar o nome da tabela - por padrao o sequelize insere um S no final
);

Produtos.sync({force:false});

module.exports=Produtos;

*/