const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const joi = require('joi');


    const server = Hapi.server({
        port: 3000,
        host: "localhost",
        routes:{
            cors:true
        }
    })

    server.app.db=mongoose.connect("mongodb+srv://amush:021900armine@hapiapi-o5cn0.mongodb.net/test?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology: true 
    })
    const init = async() =>{
        await server
        .register({plugin:require('./routes/users')},
        {routes:{prefix:'/users'}})
    
   .catch(err=>{
       console.log(err);
   })
   await server.start()
   console.log(`Server running at:${server.info.uri}`)
}
init()