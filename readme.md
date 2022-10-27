Desenvolvi esta aplicação de e-commerce para estudo do Nodejs, ficou bem legal e funcional.
Parei no ponto de fazer o checkout com o Mercado Livre
O aplicativo possui painel de controle para o usuario para inserção de grupos de produtos e produtos 
bem como upload de fotos.

Tecnologias utilizadas
- Nodejs
- Expressjs
- Javascript
- Mysql
- ORM Sequelize

Instruções para instalação:

Ao instalar o nodejs tem que alterar a variavel de ambiente path para dizer onde
está instalado o node

Para testar, sair para o terminal (cmd) e digitar node -v e npm -v

Instalar o express e o express generator: 
npm install -g -s express express generator

Instalar o nodemailer para envio/recebimento de e-mails


Site nodemailer: https://nodemailer-com.translate.goog/usage/?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=nui,sc,elem
npm install nodemailer -g 

-g= instala globalmente para todos os projetos  -s = registra a instalação no 


Para configurar o express:

express --view=ejs nome-do-projeto -->ja cria a estrutra de pastas do projeto
conforme abaixo


bin          - onde fica o arqwuivo www de configuração do servidor
node_modules - onde ficam todas as dependencias instaladas automaticamente pelo npm install
public       - arquivos estáticos, tipo imagens, scripts, css
routes       - rotas para requisicoes http://
views        - armazena as pastas de exibicção (html) mas com extensão ejs por causa do view engine ejs instalado

depois de tudo instalado para rodar o sistema digitar:
Para preencher o packge.json:
npm init

instalar o HTTP-ERRORS
npm install http-errors --save


npm start ou NODEMON (pacote que monitora alterações nos fontes)
depois digitar: http://localhost:3000/#

O primeiro programa carregado é index.js que fica na pasta routes, em seguida ele chama o arquivo index.ejs passando alguns
parametros


