const moment = require('moment');
const { forEach } = require('underscore');
const orderModel = require('../Models/orderModel')
require('dotenv').config()
const nodemailer = require('nodemailer');

const pedidos = async (req, res) => {
    let orders = []
    try{
        orders = await orderModel.getOrders();
        
        
    }catch(e){
        console.log('error', e)
    }

    res.render('pedidos', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         orders: orders,
         type: 'Todos',
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const pedido = async (req, res) => {
    let order = []
    let isRecogerEnLocal = false;
    try{
        order = await orderModel.getOrdersByOrderId(req.params.orderId);
        
        
    }catch(e){
        console.log('error', e)
    }

    if(order && order.length > 0){
        isRecogerEnLocal = order[0].recogerEnLocal;
    }

    console.log('order', order)

    res.render('pedido', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         order: order[0],
         isRecogerEnLocal: isRecogerEnLocal,
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const pedidosPendientes = async (req, res) => {
    let orders = []
    try{
        orders = await orderModel.getOrderByStatus('pending');
        
        
    }catch(e){
        console.log('error', e)
    }

    res.render('pedidos', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         type: 'Pendientes',
         orders: orders,
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const pedidosRealizados =  async (req, res) => {
    let orders = []
    try{
        orders = await orderModel.getOrderByStatus('delivered');
        
        
    }catch(e){
        console.log('error', e)
    }

    res.render('pedidos', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         type: 'Realizados',
         orders: orders,
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const pedidosEnCamino =  async (req, res) => {
    let orders = []
    try{
        orders = await orderModel.getOrderByStatus('inprogress');
        
        
    }catch(e){
        console.log('error', e)
    }

    res.render('pedidos', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         type: 'En Camino',
         orders: orders,
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const pedidosEnProceso =  async (req, res) => {
    let orders = []
    try{
        orders = await orderModel.getOrderByStatus('processing');
        
        
    }catch(e){
        console.log('error', e)
    }

    res.render('pedidos', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         type: 'En Proceso',
         orders: orders,
         img_url: process.env.SERVER_URL,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const updateOrderStatus =  async (req, res)=> {

    const {status, comment, randDateId, clientName, userId, orderId, clientEmail} = req.body;
    let update = null;
    try{
        update = await orderModel.updateOrder(randDateId, status, comment, userId);  
        // http://localhost:3099/orden-confirmacion/7ae41d8c-adab-49a2-a67c-525bfff3ff6a
        const output = `
            <h1>Pet Depot Store</h1>
            <p>Hola ${clientName}, tu pedido ha sido actualizado, para darle seguimiento da click en el siguiente enlace: </p>
            <a href="${process.env.SERVER_URL}/orden-confirmacion/${orderId}">Seguir tu pedido</a>`;

            var transporter = nodemailer.createTransport({
                //host: "smtp.ethereal.email",
                //port: 587,
                //secure: false, // true for 465, false for other ports
                service: 'gmail',
                auth: {
                    user: "pdepotstore@gmail.com", // generated ethereal user
                    pass: "pdst.2021", // generated ethereal password
                },
            });

            var mailOptions = {
                from: "Pet Depot Store", // sender address
                to: `${clientEmail}`, // list of receivers
                subject: "Tu Pedido ha sido actualizado", // Subject line
                text: "tu pedido ha sido actualizado, para darle seguimiento da click en el siguiente enlace", // plain text body
                html: output // html body
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sendMail()', error)
                    // return res.status(500).send(error.message)
                } else {
                    console.log("Email Enviado con éxito");
                    // return res.status(200).jsonp(req.body);
                }
            })


        return res.json({success: true})
    }catch(e){
        console.log('error', e)
        return res.json({success: false})
    }

}


module.exports = {
    pedidos,
    pedidosPendientes,
    pedidosRealizados,
    pedido,
    updateOrderStatus,
    pedidosEnCamino,
    pedidosEnProceso
}