const mongoose = require('mongoose'),
    Schema = mongoose.Schema,   
    moment = require('moment')

//Track how many times a unique url has been opened
const OrderSchema = new Schema({ 
  orderId: String, 
  detallesFacturacion: {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    nombreEmpresa: String
  }, //nombre*, apellido*, telefono*, email*, nombre de la empresa  
  detallesDeEnvio: {
    provincia: { type: String, required: false },
    canton: { type: String, required: false },
    distrito: { type: String, required: false },
    direccionExacta: { type: String, required: false },
    zip: String,
    notasAd: String
  }, //provincia*, canton*, distrito*, direccionExacta*, ZIP, notasAdicionales
  pedido: [], //{url_img, nombre, descripcion, cantidad, precio }
  subTotal: String,
  total: String,
  iva: String,
  metodoDePago: { type: String, required: true },
  imagenComprobante: String, //null
  status: String, //pending -> por defecto
  ipComprador: String, //Capturar el IP desde el servidor -> nicetohave, null
  ordenAnonima: Boolean,
  clientId: {}, //null
  createdAt: { type: Date, default: function(){return moment()} },  
  updatedAt: Date,
  randDateId: { type: String, default: ()=>{
    var d = new Date();
    return d.getTime();
  } },
  recogerEnLocal: Boolean,
  updatedBy: String,
  comments:[]
});


module.exports = OrderSchema