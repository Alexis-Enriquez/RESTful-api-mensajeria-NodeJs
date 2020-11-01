const store = require('./store')

function addUser(name){
    return new Promise((resolve,reject)=>{
 
        if(!name){
            console.error('[messageController]: no hay usuario ')
            reject('el dato es incorrecto')
            return false
        }
 
        const fullUser = {
            name
        }
        
        store.add(fullUser)

        resolve(fullUser)
        
    })
    
    
}   



 function getUsers(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser))
    })
}
/*
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
} */

module.exports = {
    addUser,
     getUsers,
    /* updateMessage,
    deleteMessage */
}