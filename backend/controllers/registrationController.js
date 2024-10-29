const bcrypt = require('bcryptjs');
const { createUser } = require('../services/registrationService');

registrationHandler = async(req,res)=>{
    const{email, password} = req.body;
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    try{
        if(!email || !password){
            return res.status(400).send(false);
        }
        await createUser({email, hashPassword});
        return res.status(200).send(true);
    }
    catch(err){
        console.log("Error occured : " + err);
        throw err;
    }
}

module.exports = {registrationHandler};