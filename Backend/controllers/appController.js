const moment = require('moment');


const main = (req, res) => {
    res.render('home', {
         title: 'my other page', 
         layout: 'main' 
    });
}


const register = (req, res) => {
    res.render('registro', {
         title: 'my other page', 
         layout: 'main' 
    });
}

const dashboard = (req, res) => {
    res.render('dashboard', {
         title: 'my other page', 
         layout: 'admin' ,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}
const reportes = (req, res) => {
    res.render('reportes', {
         title: 'my other page', 
         layout: 'admin' 
    });
}
const misReportes = (req, res) => {
    res.render('misReportes', {
         title: 'my other page', 
         layout: 'admin' 
    });
}
const consultas = (req, res) => {
    res.render('consultas', {
         title: 'my other page', 
         layout: 'admin' 
    });
}
const busqueda = (req, res) => {
    res.render('consultas', {
         title: 'my other page', 
         layout: 'admin' 
    });
}
const resultados = (req, res) => {
    res.render('resultados', {
         title: 'my other page', 
         layout: 'admin' 
    });
}

const user = (req, res) => {
    res.render('user', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}

const userCreate = (req, res) => {
    res.render('registroAuth', {
         title: 'Crear Usuarios', 
         layout: 'admin' ,
         fullname: req.session.admin.name + ' ' + req.session.admin.lastname,
         time: moment(new Date()).format('MM/DD/YY')
    });
}




module.exports = {
    main,
    register,
    dashboard,
    reportes,
    consultas,
    misReportes,
    resultados,
    userCreate,
    user
}