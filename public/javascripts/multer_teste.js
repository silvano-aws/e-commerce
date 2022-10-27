//referencia: https://medium.com/collabcode/upload-e-compress%C3%A3o-de-imagens-com-nodejs-68109eed066e

const multer=require('multer');

var anomeimagem=[];
var nomeimagem='';

 // Os objetos e suas funções são automaticamentes executadas pela biblioteca, no momento do Upload.
 // Nessas funções, teremos acesso a requisição, a alguns dados do arquivo, e um callback que vamos

// Vamos expotar nosso módulo multer, que vamos executar passando as nossas configurações

     
    // Como deve ser feito o armazenamento dos arquivos?
const storage= multer.diskStorage({

        // Qual deve ser o destino deles?
        destination: (req, file, cb) => {
         
            // Setamos o destino como segundo paramêtro do callback
            cb(null, 'images/produtos/');
        },

                
        filename: (req, file, cb)=> {
            nomeimagem=Date.now().toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1] ;   
            console.log('nome da imagem '+nomeimagem);
            cb(null,nomeimagem );   
            anomeimagem.push(nomeimagem);
      
        },

        /*
        // E como devem se chamar?
        filename: (req, file, cb) => {
       
            // Setamos o nome do arquivo que vai ser salvado no segundo paramêtro
            // Apenas concatenei a data atual com o nome original do arquivo, que a biblioteca nos disponibiliza.
            nomeimagem=Date.now().toString() + '-' + file.originalname
            cb(null,nomeimagem );
            anomeimagem.push[nomeimagem];
        }
        */
    

    // Como esses arquivos serão filtrados, quais formatos são aceitos/esperados?
    fileFilter: (req, file, cb) => {
     
            // Procurando o formato do arquivo em um array com formatos aceitos
      	     // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
            const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype );

            // O formato do arquivo bateu com algum aceito?
            if(isAccepted){
                // Executamos o callback com o segundo argumento true (validação aceita)
                return cb(null, true);
            }
            
            // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
            return cb(null, false);
    }
})

const upload = multer({ dest: 'images/produtos/' });

module.exports={multer,anomeimagem,upload};