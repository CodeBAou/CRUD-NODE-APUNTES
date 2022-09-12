const mongoose = require('mongoose');

//conexion base de datos mongoose
const dbConnection = async() => {
    
    try{
        mongoose.connect(process.env.MONGODB_CNN);
    } catch (error){ 
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports= {
    dbConnection
}
