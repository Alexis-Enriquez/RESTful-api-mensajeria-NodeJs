const store = require('./store')
const socket = require('../../socket').socket

function addMessage(chat, user, message,file){
    
    return new Promise((resolve,reject)=>{
       //el controlador valida y devuelve un error sino 
        if(!chat || !user || !message){
            console.error('[messageController]: no hay chat,  usuario o mensaje')
            reject('Los datos son incorrectos')
            return false
        }

        let fileUrl = ''
        if(file){
            fileUrl = 'http://localhost:3000/app/files/'+file.filename
        }
        //guarda los mensajes 
        const fullMessage = {
            chat,
            user,
            message,
            date: new Date(),
            file:fileUrl
        }
        //envia los mensajes al empaquetador
        store.add(fullMessage)

        //
        socket.io.emit('message',fullMessage)
        //devuelve el caso de exito
        resolve(fullMessage)
        
    })
    
    
}   

function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser))
    })
}

function updateMessage(id,message){
    return new Promise(async (resolve,reject)=>{
    if(!id || !message){
        reject('invalid data')
        return false
    }

    const result = await store.update(id, message)
    resolve(result)
    })
}

function deleteMessage(id){
    return new Promise((resolve,reject)=>{
        
        if(!id){
            reject('no se ha enviado un id')
        }
        store.remove(id)
        .then(()=>{
            resolve()
        })
        .catch(e =>{
            reject(e)
        })
        
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}