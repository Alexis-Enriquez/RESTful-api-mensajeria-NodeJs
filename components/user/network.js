const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()




router.get('/',(req,res)=>{ 
    const filterUser = req.query.name || null
   controller.getUsers(filterUser)
    .then((userList)=>{
        response.success(req,res, userList, 200)
    })
    .catch(e=>{
        response.error(req,res, 'Unexpected Error',500, e)
    })
   
})



router.post('/',(req,res)=>{  

    const {name}= req.body
    controller.addUser(name)
   
    .then((fullUser)=>{
        response.success(req,res,fullUser,201)
    })
    .catch(e =>{
        response.error(req,res,'informacion invalida',500,e)
    })
})

router.patch('/:id',(req,res)=>{
    const {id} = req.params
    const {message} = req.body
    controller.updateMessage(id, message)
    .then((data)=>{
        response.success(req, res, data, 200)
    })
    .catch(e=>{
        response.error(req,res,'error interno',500,e)
    })
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params
    controller.deleteMessage(id)
    .then(()=>{
        response.success(req,res,'mensaje borrado correctamente',200)
    })
    .catch(e =>{
        response.error(req,res,"no se ha podido eliminar",500,e)
    })
})
module.exports = router