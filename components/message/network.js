const express = require('express')
const multer = require('multer')

const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()


const upload = multer({
    dest:'public/files',
})


router.get('/',(req,res)=>{ 
    const filterMessages = req.query.user || null
   controller.getMessages(filterMessages)
    .then((messageList)=>{
        response.success(req,res, messageList, 200)
    })
    .catch(e=>{
        response.error(req,res, 'Unexpected Error',500, e)
    })
   
})

router.post('/',upload.single('file'),(req,res)=>{  
    //ida al sevidor
    const {chat,user, message}= req.body
    controller.addMessage(chat,user,message,req.file)
    //respuesta del servidor
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201)
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