//====== P/uload de imagens usando o Multer ========
const multer = require('multer');
const upload = multer({ dest: 'images/produtos/' });
//===================================================

//============================== USO DO MULTER PARA CARREGAMENTO DE IMAGENS ==================================================// 
var anomeimagem=[]; // para guardar o nome das imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/produtos/')
  },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]); //Appending extension
      anomeimagem.push(Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }

});

const Upload = multer({storage: storage},3).any();

module.exports={multer,anomeimagem,upload};