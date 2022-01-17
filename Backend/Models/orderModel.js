const mongoose = require('mongoose');
const orderSchema = require('../schemas/orderSchema')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')

const handleError = (err)=>{
    console.log(err);
}

const getOrders = async () => {
    try{
        let Orders =  mongoose.model('Orders', orderSchema);
        const orders = await Orders.find({},null, {sort: {createdAt: -1}}).catch(handleError)
        return orders;
    }catch(e){
        console.log(e);
        return res.json({'err':e, 'msg':'Ha ocurrido un error'})
    }
    
}

const getOrderByStatus = async (status) => {
    try{
        let Orders =  mongoose.model('Orders', orderSchema);
        const orders = await Orders.find({status:status},null, {sort: {createdAt: -1}}).catch(handleError)
        return orders;
    }catch(e){
        console.log(e);
        return res.json({'err':e, 'msg':'Ha ocurrido un error'})
    }
}

const getOrderByUserId =async () => {

}

const getOrdersByOrderId = async (randDateId) => {
    try{
        let Orders =  mongoose.model('Orders', orderSchema);
        const orders = await Orders.find({"randDateId":randDateId}).catch(handleError)
        return orders;
    }catch(e){
        console.log(e);
        return false
    }
}

const updateOrder = async (randDateId, status, comment, user) => {
    console.log('randDateId',randDateId)
    console.log('status',status)
    console.log('comment',comment)
    const comments = {
        msg: comment,
        createdAt: moment(),
        createdBy: user
    }
    try{
        let Orders =  mongoose.model('Orders', orderSchema);
        const orders = await Orders.findOneAndUpdate({"randDateId":randDateId},
        {
         $set:{status: status,updatedAt: moment()}, $push: { comments: comments }
        }
        ).catch(handleError)
        return orders;
    }catch(e){
        console.log(e);
        return false
    }
}

module.exports = {
    getOrders,
    getOrderByStatus,
    getOrderByUserId,
    getOrdersByOrderId,
    updateOrder
}