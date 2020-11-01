const Model = require('./model')
 

function addUser(user){
    const newUser = new Model(user)
    newUser.save()
}

async function getUsers(filterUser){
    let filter = {}
    if(filterUser !== null){
        filter = {name:filterUser}
    }
   const users = await Model.find(filter) 
   return users
}

//exports 

module.exports={
    add: addUser,
     list: getUsers,
}