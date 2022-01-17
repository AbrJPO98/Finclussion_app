const express = require('express');
const router = express.Router();
const mainController = require('../controllers/appController')
const orderController = require('../controllers/orderController')

var sessionChecker = (req, res, next) => {
    
    if (req.session.admin && req.cookies.admin_sid) {
        next();
    } else {
        res.redirect('/');
    }    
  };
/* GET home page. */
router.get('/', sessionChecker,  mainController.dashboard);

router.get('/reportes', sessionChecker, mainController.reportes);
router.get('/mis-reportes', sessionChecker, mainController.misReportes);
router.get('/consultas', sessionChecker,  mainController.consultas);
router.get('/resultados', sessionChecker, mainController.resultados)
router.get('/user', sessionChecker, mainController.user)
router.get('/user/create', sessionChecker, mainController.userCreate)
router.get('/pedido/:orderId', sessionChecker, orderController.pedido)
router.get('/pedidos',sessionChecker, orderController.pedidos)
router.get('/pedidos/pendientes', sessionChecker, orderController.pedidosPendientes)
router.get('/pedidos/encamino', sessionChecker, orderController.pedidosEnCamino)
router.get('/pedidos/enprogreso', sessionChecker, orderController.pedidosEnProceso)
router.get('/pedidos/realizados', sessionChecker, orderController.pedidosRealizados)
router.post('/pedido/update', sessionChecker, orderController.updateOrderStatus)


module.exports = router;
