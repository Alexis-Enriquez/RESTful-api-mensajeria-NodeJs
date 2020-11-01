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

module.exports = {
    addUser,
     getUsers,

}