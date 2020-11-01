const { populate } = require('./model')
const Model = require('./model')




//acciones para la base 

function addMessage(message){
    const myMessage = new Model(message)
    myMessage.save()
}

function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        let filter = {}
        if(filterUser !== null){
            filter = {user:filterUser}
        }
        Model.find(filter)
            .populate('user') //reveer en documentacion como es el concepto de popular informacion
            .exec((error,populated)=>{
                if(error){
                    reject(error)
                    return false
                }
                resolve(populated)
            })
    })
}

async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id:id
    })
    foundMessage.message = message
    const newMessage = await foundMessage.save()
    return newMessage
}

function deleteMessage (id){
    return Model.deleteOne({
        _id:id
    })
}

//exports 

module.exports={
    add: addMessage,
    list: getMessages,
    update: updateText,
    remove:deleteMessage
}