//const e = require("cors");

//var itenscarrinho=[];
//var pesquisar=document.getElementById('pesquisa');
var objreq = new XMLHttpRequest();
var dadosloja;
var dadoslj;

$(document).ready(function(){
  //https://blog.igorescobar.com/2012/05/06/masks-with-jquery-mask-plugin/ (manual)
  /* mascara para celular (Jquery) */      
    $(".celular").mask("(00) 00000-0000");
    $("#inputcel").mask("(00) 00000-0000");
    $(".telefone").mask("(00) 00000-0000");
    $(".codbarras").mask("0000000000000");
    $(".un").mask("AAAA");
    $(".uf").mask("AA");
    $(".vlrunitario").mask("00000000.00",{reverse:true});
    $(".vlrtotal").mask("000000000.00",{reverse:true});
    $(".cep").mask("00000-000");
    $(".cpf").mask("000.000.000-78");
    $(".cnpj").mask("00.000.000.0000/00");
    $(".qtddecimal").mask("000000000.99");
    $(".qtdinteiro").mask("000000000");
    $(".qtdint1").mask("0");
    $(".qtdint2").mask("00");
    $(".qtdint3").mask("000");
    $(".qtdint4").mask("0000");
    $(".qtdint5").mask("00000");
    $(".qtdint6").mask("000000");
    $(".data").mask("00/00/0000");
  
  });

 // ACESSA A ROTA PRA BUSCAR PRODUTOS E MONTAR A DIV  

 function buscaProdutospesquisa(chave){
 
    if ((chave.toLowerCase().indexOf('<script>')>0) || (chave.toLowerCase().indexOf('</script>')>0)){
      window.alert('Termo não permitido!')
      return null  
    }

      if (chave===''){
        chave='%20'
      }

      //alert('Chave passada '+chave);
  
      var objreqprod = new XMLHttpRequest();
      objreqprod.responseType = 'text/html,charset=utf-8';
      objreqprod.open('GET', "/filtraprodutos/"+chave,true); //envia a solicitacao
      document.getElementById('produtopesquisar').value="";  //limpa o input da pesquisa
      objreqprod.send();
      objreqprod.onload=function(){
         // Insere o html retornado na div 
         document.getElementById('exibeprodutos').innerHTML=objreqprod.response;
      };

};

function buscaProdutoscategoria(chave){

  alert('Categoria a pesquisar produtos '+chave + ' '+typeof chave);
  const _chave=chave.toString();
  var objreqprod = new XMLHttpRequest();
  objreqprod.responseType = 'text/html,charset=utf-8';
  objreqprod.open('GET', "/filtraprodutoscategoria/"+chave);    //envia a solicitacao
  var element=document.getElementById('exibeprodutos');
  objreqprod.send();
  // sem o metodo onload não funciona
  objreqprod.onload=function(){
     var produtos_exibir=objreqprod.response;
     element.innerHTML=produtos_exibir;
  }
  //objreqprod.end();
};

/*Tabela contaemail
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int          | NO   | PRI | NULL    | auto_increment |
| idloja     | int          | YES  |     | NULL    |                |
| host       | varchar(200) | YES  |     | NULL    |                |
| pop3       | varchar(200) | YES  |     | NULL    |                |
| sender     | varchar(200) | YES  |     | NULL    |                |
| reply      | varchar(200) | YES  |     | NULL    |                |
| comcopia   | varchar(200) | YES  |     | NULL    |                |
| user       | varchar(200) | YES  |     | NULL    |                |
| pass       | varchar(15)  | YES  |     | NULL    |                |
| receipt    | tinyint(1)   | YES  |     | NULL    |                |
| auth       | tinyint(1)   | YES  |     | NULL    |                |
| autpop3    | tinyint(1)   | YES  |     | NULL    |                |
| msg1       | varchar(200) | YES  |     | NULL    |                |
| msg2       | varchar(200) | YES  |     | NULL    |                |
| redirecion | varchar(200) | YES  |     | NULL    |                |
| emailredir | varchar(200) | YES  |     | NULL    |                |
| smtpport   | int          | YES  |     | NULL    |                |
| smtpusessl | tinyint(1)   | YES  |     | NULL    |                |
| assinatura | varchar(100) | YES  |     | NULL    |                |
| createdAt  | datetime     | NO   |     | NULL    |                |
| updatedAt  | datetime     | NO   |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
*/

// chamado pelo menu do modulo painel.ejs
function chamamodalemail(){
   var objreqemail = new XMLHttpRequest();
   var dadosemail
   objreqemail.responseType = 'json';
   objreqemail.open('GET', "/buscadadosemail/");    //envia a solicitacao
   objreqemail.ContentType = 'text/html,charset=utf-8';
   // abre  a solicitacao com acao GET e endereço do webservice
   objreqemail.send();
   // sem o metodo onload não funciona
   objreqemail.onload=function(){
      dadosemail=objreqemail.response; // recebe o objeto Json
      dadosemail=JSON.parse(dadosemail); //transfoma para um objeto Javascript
   }
    $('#editaemail').on('shown.bs.modal',function() {
      var modal = $(this);
      //modal.find('.modal-body input').val('Rosemeire Oliveira Faria'); //se fosse somente 1 input
      //alert('SMTP '+ dadosemail[0].host)     
      modal.find("#email-smtp").val(dadosemail[0].host) 
      modal.find("#email-pop").val(dadosemail[0].pop3)
      modal.find("#email-sender").val(dadosemail[0].sender) 
      modal.find("#mail-reply").val(dadosemail[0].reply)
      modal.find("#email-cc").val(dadosemail[0].comcopia) 
      modal.find("#email-user").val(dadosemail[0].user)
      modal.find("#email-password").val(dadosemail[0].pass)
      modal.find("#email-receipt").val(dadosemail[0].receipt)
      modal.find("#email-auth").val(dadosemail[0].auth) 
      modal.find("#email-auth-pop3").val(dadosemail[0].autpop3)
      modal.find("#email-redirecion").val(dadosemail[0].redirecion)
      modal.find("#email-port-smtp").val(dadosemail[0].smtpport)
      modal.find("#email-use-ssl").val(dadosemail[0].smtpusessl)
      modal.find("#email-redir").val(dadosemail[0].emailredir)
    })       

}

/*
aqui somente para consulta
      onclick="_sendmail(getElementById('email-smtp').value,
               getElementById('email-port-smtp').value,
               getElementById('email-use-ssl').value,
               '{'+getElementById('email-user').value+','+getElementById('email-password').value+'}',
               getElementById('email-sender'),
               getElementById('email-sender'),
              'Teste de Envio',
              'Testando envio e-mail e-commerce');" 

*/





function testaemail(_smtp,_port,_ssl,_auth,_sender,_to,_subj,_text){
  alert("SMTP: "+_smtp+"\n Port: "+_port+"\n SSL: "+_ssl+"\n User/Pass: "+_auth+"\n Sender: "+_sender+"\n To: "+_to+"\n Subject: "+_subj+"\n Text: "+_text)

};


/*
  Esta funcion busca os dados da loja via http
  e também carrega os dados no formulario modal
  para edicao e gravacao dos novos dados
  Rotina para pegar os dados da tabela de Loja e por na tela modal - OK
*/

// chamado pelo menu do modulo painel.ejs
function chamamodalloja(){

  var objreq = new XMLHttpRequest();  

   //cria uma nova instancia do objeto XMLHttprequest  
   //var objreq = new XMLHttpRequest();
   //define o tipo de resposta da transacao como json
   objreq.responseType = 'json';
   objreq.open('GET', "/buscadadosloja/");    //envia a solicitacao
   objreq.ContentType = 'text/html,charset=utf-8';
   // abre a solicitacao com acao GET e endereço do webservice
   objreq.send();
   // sem o metodo onload não funciona
   objreq.onload=function(){
      dadosloja=objreq.response; // recebe o objeto Json
      dadosloja=JSON.parse(dadosloja); //transfoma para um objeto Javascript
   }
  // Rotina para pegar os dados da tabela de Loja e por na tela modal
    // Rotina para pegar os dados da tabela de Loja e por na tela modal
    $('#cadastraloja').on('shown.bs.modal',function() {
      //alert('Nome Fantasia '+dadosloja[0].fantasia)// a partir desta linha não funciona
       var modal = $(this)
       //modal.find('.modal-body input').val('Rosemeire Oliveira Faria'); //se fosse somente 1 input

       modal.find('.modal-title').text('Edição de Dados da Empresa');
       modal.find('#nomefantasia').val(dadosloja[0].fantasia); //deu certo
       modal.find('#nomeempresa').val(dadosloja[0].nome); //deu certo
       modal.find('#nomerespons').val(dadosloja[0].responsavel); //deu certo
       modal.find('#celrespons').val(dadosloja[0].celular); //deu certo
       modal.find('#emailrespons').val(dadosloja[0].email); //deu certo
       modal.find('#empcnpjcpf').val(dadosloja[0].cpfcnpj); //deu certo
       modal.find('#empie').val(dadosloja[0].ie); //deu certo
       modal.find('#emplogotipo').val(dadosloja[0].logotipo); //deu certo
       modal.find('#empbanner').val(dadosloja[0].banner); //deu certo
       modal.find('#empcep1').val(dadosloja[0].cep); //deu certo
       modal.find('#emplogradouro1').val(dadosloja[0].logradouro); //deu certo
       modal.find('#empcidade1').val(dadosloja[0].cidade); //deu certo
       modal.find('#empbairro1').val(dadosloja[0].bairro); //deu certo
       modal.find('#empuf1').val(dadosloja[0].estado); //deu certo
       modal.find('#empnumero1').val(dadosloja[0].numero); //deu certo
       

     })   
 };


// ACESSA A ROTA PRA BUSCAR AS CATEGORIAS E MONTAR O MENU - OK
function buscaCategorias(){
  var objreqcat = new XMLHttpRequest();  
  objreqcat.responseType = 'text/html,charset=utf-8';
  objreqcat.open('GET', "/retornacategoriamenu");     //envia a solicitacao
  var element = document.getElementById('menu_categorias')
  objreqcat.send();
  // sem o metodo onload não funciona
  objreqcat.onload=function(){
     var menu_categoria=objreqcat.response; // recebe o objeto Json
     element.innerHTML =menu_categoria;  
  }
  //objreqcat.end();
};

// ACESSA A ROTA PRA BUSCAR AS CATEGORIAS E MONTAR O MENU - OK
function setaCategoriacadprod(){
  var objreqcat = new XMLHttpRequest();  
  objreqcat.responseType = 'text/html,charset=utf-8';
  var element = document.getElementById('prod-categoria');
  objreqcat.open('GET', "/retornacategoriacadproduto");     //envia a solicitacao
  objreqcat.send();
  // sem o metodo onload não funciona
  objreqcat.onload=function(){
     var categoria_prod=objreqcat.response; // recebe o objeto Json
     element.innerHTML=categoria_prod;  
     console.log(categoria_prod);
  }
  //objreqcat.end();
};


// nao esata funcionando para modulos via include
//pesquisar.addEventListener('click',clicar);
       
function clicar(){
    alert('Não foram localizados produtos referentes a sua pesquisa..!');
return true;    
}

/*
// Escutador de eventos (click) para todos os inputs
for (i=0;i<insprod.length;i++){
     //alert(i);
     insprod[i].addEventListener('click',insereitemcarrinho)  ;  
       
}

*/

/* conforme api do nodejs mas não funcionou
function TestaHttpJson(){
  alert('TestaHttpJson');
  get('http://awsinformatica.ddns.net:3000/testejson', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};
*/


function comprar(frm){
    var itemcomprado;
    itemcomprado=[frm.codprod.value,frm.descprod.value,frm.qtdprod.value];
    alert(itemcomprado[0]);
    itenscarrinho.push(itemcomprado)  ;
    alert(itenscarrinho[0][1]);
    //alert(itenscarrinho.prototype.length);
  }


      // Exemplo de JavaScript para desativar o envio do formulário, se tiver algum campo inválido.
      (function() {
        'use strict';

        window.addEventListener('load', function() {
          // Selecione todos os campos que nós queremos aplicar estilos Bootstrap de validação customizados.
          var forms = document.getElementsByClassName('needs-validation');

          // Faz um loop neles e previne envio
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
 



$(function(){
   $('#submitlogin').on('click',function(){
      $('#msglogin').textvalue='<p>'+message.msg+'</p>';     
   //   $.get('/login', function(res) {
   //     $('#msglogin').html(res);
   // })
 })
});


// Funcao para tirar do campo tudo que não seja numero
function limpanumero(campo){
  var camporet='';    
  var i 
  const numeros="1234567890"		
  //alert('Campo Antes: '+campo);
  for (i=0;i<campo.length;i++){
    if (numeros.includes( campo.substring(i,i+1)) ){
       camporet+=campo.substring(i,i+1);
     }
   }
  return(camporet); 
 } ; 			
 
/*
 
Call a modal with id myModal with a single line of JavaScript:  $('#myModal').modal(options)

Name	    Type	 Default	Description
--------------------------------------------------------------------------------------
backdrop	boolean or the string 'static' true	Includes a modal-backdrop element. 
          Alternatively, specify static for a backdrop which doesn't close the modal on click.
keyboard	boolean	true	 Closes the modal when escape key is pressed
focus	    boolean	true	 Puts the focus on the modal when initialized.
show	    boolean	true	 Shows the modal when initialized.
*/

 
  function adicionaitemcarrinho(id,descricao,qtd,preco){
    itenscarrinho.push([id,descricao,qtd,preco])
    alert(`Item: ${descricao} adicionado ao carrinho! Qtd. de itens no carrinho = ${itenscarrinho.length}`)   
    getElementById('qtdcompra_'+id).value=''

  };   

  function deletaitemcarrino(ind){
    itenscarrinho.splice(ind)
  }
//chama a janela modal e altera os parametros
 // fonte: https://pt.stackoverflow.com/questions/76576/alterar-src-de-imagem
 function chamamodaldetalhes(janela,imagem,descricao,detalheproduto){
   //alert(detalheproduto); //somente para teste
    if (detalheproduto===null){
      detalheproduto='Sem Detalhamento'
    };
    $(janela).modal('show');
    $('#titulo-modal').html("Detalhes Produto");
    $('#imagem-modal').attr("src", imagem);
    $('#p-modal').html(descricao);
    $('#detalhe-prod').html(detalheproduto);
};


  function chamamodalcheckout(janela){

    if (itenscarrinho.length==0){
      alert('Você ainda não possui itens o carrinho!');
      return null;
    }

    $(janela).modal('hide');
    $(janela).modal('show');
    //alert(janela);
    var linha='';
    var vlritens=0.00;
    var qtditens=0;
    var totitem=0
    linha='<div class="table-responsive">' 
     linha+= '<table class="table table-hover" style="width: 95%;margin: auto">'+
             '<thead>' +
                '<th>Item </th>'+
                '<th>Descrição</th>'+
                '<th>Qtd.</th>'+
                '<th>Vlr.Unitário</th>'+
                '<th>Vlr.Total</th>'+ 
                '<th> Exclui </th>'
             '</thead>'+
             '<tbody>'
                for(var i=0;i<=itenscarrinho.length-1;i++){
                   totitem=itenscarrinho[i][2]*itenscarrinho[i][3]
                   linha+= 
                   '<tr>'+
                      '<td>' + (i+1)                 + '</td>'+                
                      '<td>' + itenscarrinho[i][1] + '</td>'+                
                      '<td>' + itenscarrinho[i][2].toString() + '</td>'+                
                      '<td>' + itenscarrinho[i][3].toString() + '</td>'+
                      '<td>' + totitem.toString() + '</td>'+
                      '<td>' +
                      '<a class="btn btn-outline-danger btn-sm" onclick="excluiItemCarrinho('+i+')"'+  // data-toggle="modal" data-target="#"'+ 
                          ' role="button">Exc</a>' + '</td>'
                   '</tr>'
                   vlritens+=(itenscarrinho[i][2]*itenscarrinho[i][3]);
                }
    linha+='</tbody>' + '</table> </div>'  
    qtditens=i;
    $('#produtos-checkout').html(linha); 
    $('#qtd-itens-checkout').text(qtditens);
    $('#vlr-total-checkout').html('<hr> <p>' + 'Total do Pedido R$'+vlritens+'</p>');

    //$('#titulo-modal').html("Detalhes Produto");
  };



$(function(){
   $('#btnlimpapesquisa').on('click',function(){
      alert('Clicou o botao LIMPAR'); 	
      $('#produtos').html(""); 
   });
});

/* Exclui um item específico da matriz do carrinho de compras e refaz a lista 
   na janela modal : modalforms.ejs--> checkout2
*/   

function excluiItemCarrinho(ind){
  var linha='';
  var vlritens=0.00;
  var qtditens=0;
  var totitem=0

  if (confirm('Confirma a exclusão do item '+ind+'?') ){
         itenscarrinho.splice(ind,1);
         if (itenscarrinho.length==0){
       alert('Você ainda não possui itens o carrinho!');
       return null;
     }
         //alert(janela);
     linha='<div class="table-responsive">' 
      linha+= '<table class="table table-hover" style="width: 95%;margin: auto">'+
              '<thead>' +
                 '<th>Item </th>'+
                 '<th>Descrição</th>'+
                 '<th>Qtd.</th>'+
                 '<th>Vlr.Unitário</th>'+
                 '<th>Vlr.Total</th>'+ 
                 '<th> Exclui </th>'
              '</thead>'+
              '<tbody>'
                 for(var i=0;i<=itenscarrinho.length-1;i++){
                    totitem=itenscarrinho[i][2]*itenscarrinho[i][3]
                    linha+= 
                    '<tr>'+
                       '<td>' + (i+1)                 + '</td>'+                
                       '<td>' + itenscarrinho[i][1] + '</td>'+                
                       '<td>' + itenscarrinho[i][2].toString() + '</td>'+                
                       '<td>' + itenscarrinho[i][3].toString() + '</td>'+
                       '<td>' + totitem.toString() + '</td>'+
                       '<td>' +
                       '<a class="btn btn-outline-danger btn-sm" onclick="excluiItemCarrinho('+i+')"'+  // data-toggle="modal" data-target="#"'+ 
                           ' role="button">Exc</a>' + '</td>'
                    '</tr>'
                    vlritens+=(itenscarrinho[i][2]*itenscarrinho[i][3]);
                 }
     linha+='</tbody>' + '</table> </div>'  
     qtditens=i;
     $('#produtos-checkout').html(linha); 
     $('#qtd-itens-checkout').text(qtditens);
     $('#vlr-total-checkout').html('<hr> <p>' + 'Total do Pedido R$'+vlritens+'</p>');
    }    }    function msg(){
  alert('Estou me atualizando em novas tecnologias, Deus me ajude a prosperar!');
};
   
function validarCPF(inputCPF){
  var soma = 0;
  var resto;
  var inputCPF = document.getElementById('cpf').value;

  if(inputCPF == '00000000000') return false;
  for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if((resto == 10) || (resto == 11)) resto = 0;
  if(resto != parseInt(inputCPF.substring(9, 10))) return false;

  soma = 0;
  for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
  resto = (soma * 10) % 11;

  if((resto == 10) || (resto == 11)) resto = 0;
  if(resto != parseInt(inputCPF.substring(10, 11))) return false;
  return true;
}


/*
    /*
      $.ajax({  
        url:'/editaloja',  
        method:'get',  
        dataType:'json',
        contentType: "text/plain",
        success:function(response){  
          console.log('Tudo certo...!!!!');
        },  
        error:function(response){  
            console.log('server error');  
        } 
         
        $.post('http://awsinformatica.ddns.net:3000/editaloja', function(res) {

*/

/*
//Acao para o botão pesquisa de produtos
$(function(){
   $("#pesquisaproduto").on("click",function(){
    buscaProdutos()
   })  
});
*/

  
  /*
  //exemplo de como executar uma query em outra pagina e trazer o resultado para uma div
  //supondo que a classe da div chama .resultado e a pagina de calculo ou query = load.php
  //fonte: https://www.youtube.com/watch?v=FVJtuYHnCuE
  $ajax({
    url:"load.php",
    success:function(result){
      $(".resultado").html(result);
    },
    error:function(error){
      $(".resultado").html("Erro na pesquisa!");
    }
  })
  */



/*
var editing_text_element;
// get text into editor on modal show
$('#DetailsModal').on('show.bs.modal', function(e) {
    editing_text_element = $(e.relatedTarget).find('p');
    $(this).find('modal-text-editor').val(editing_text_element.text());
});

// save text to <p> tag after saving
$('#DetailsModal').find('btn-primary').on('click', function(e) {
    var edited_text = $('#DetailsModal').find('modal-text-editor').val();
    editing_text_element.text(edited_text);
});

// clear modal upon close
$('#DetailsModal').on('hidden.bs.modal', function(e) {
    $(this).find('modal-text-editor').val('');
});


 /*
//Funcao para Validadcao de e-mail
 function validacaoEmail(field) {
  const usuario = field.substring(0, field.indexOf("@"));
  const dominio = fieldsubstring(field.indexOf("@")+ 1, field.length);
  const retorno=true;
  if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@")==-1) &&
      (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) &&
      (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) &&
      (dominio.indexOf(".") >=1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
  //document.getElementById("msgemail").innerHTML="E-mail válido";
  //alert("E-mail valido");
      retorno = true;
  }
  else{
  //document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
  //alert("E-mail invalido");
      retorno = false;
  }
   return retorno;
  }

*/


/*
Eventos das janelas modais
$('#myModal').on('hidden.bs.modal', function (e) {
  // do something...
})

Eventos possíveis para janelas modais
Event type	           Description
show.bs.modal	         This event fires immediately when the show instance method is called. If caused by a click, the clicked element
                        is available as the relatedTarget property of the event.
shown.bs.modal	       This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete).
                       If caused by a click, the clicked element is available as the relatedTarget property of the event.
hide.bs.modal 	       This event is fired immediately when the hide instance method has been called.
hidden.bs.modal	       This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
hidePrevented.bs.modal This event is fired when the modal is shown, its backdrop is static and a click outside the modal or an escape 
                       key press is performed with the keyboard option or data-bs-keyboard set to false.
*/

/*
eventClick:  function(event) {
  $('#modal').attr('data-id', event.event.id).modal();
}


E pegando essa informação no outro documento:

('#modal').on('show.bs.modal', function () {
  var id = $(this).data("id");
  //Ajax
});

*/

