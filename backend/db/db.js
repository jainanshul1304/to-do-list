const {Sequelize}  = require("sequelize");
const sequelize  = new Sequelize(process.env.database, process.env.USER, process.env.PASSWORD, {
    host : 'localhost',
    dialect : "mysql"
})
const dbConnect = async()=>{

    try{
        await sequelize.authenticate();
        console.log("Connection established succesfully!");
    }
    catch(error){
        console.log("Error occured" + error);
        throw error;
    }
}

module.exports = {dbConnect,sequelize};