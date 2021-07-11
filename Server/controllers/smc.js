mongo = require("../database/database.service");

let schema = require("../database/database.schema");

let Smc = schema.smc;

let create_smc = async function(req,res,next) {
    let body = req.body;
    let alldata = new Smc(body);
    try {
        await mongo.insertIntoCollection(alldata);
        return res.status(201).json({statusMessage : " inserted successfully", data : alldata});       
    } catch(error) {
        return res.status(501).send({statusMessage : "Invalid  info"});
    }
};

let read_all_smc = async function(req,res,next) {
    try {
        let smcs = await mongo.findFromCollection(Smc);
        let temp_arr = [];
        for(var i=0;i<smcs.length;i++) {
            temp_arr.push(smcs[i]);
        }
        let  smc= {};
        smc.smc = temp_arr;
        return res.satus(201).send({API : "READ_SMCS_API", statusMessage : "smc read success" , data : smc});
    } catch(error) {
        return res.status(501).send({statusMessage : "Invalid smcs info" , data : error});
    }
};

let read_smc = async function(req,res,next) {
    let body = req.body;
    try {
        let smcs = await Smc.find({"SMCId" : body.SMCId});
        if(smcs.length!=0) {
            return res.status(201).json({statusMessage : "SMC members read success", data : smcs});
        } else {
            res.status(403).json({statusMessage : "No SMC members found for this SMC Id", data : {}});
        }
    } catch(error) {
        return res.status(501).send({statusMessage : "Invalid smcs info" , data : error});
    }
};

let delete_smc = async function(req,res,next) {
    let body = req.body;
    try {
        let smcrData = await mongo.findFromCollection(Smc,body);
        if(smcData.length !=0) {
            let smc = {};
            smc.smc = smcData[0];
            await mongo.deleteFromCollection(Smc,body);
            return res.status(201).send({statusMessage : "Deleted smc" , data : smc});
        } else {
            return res.status(403).send({ statusMessage : "smc doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.status(501).send({ statusMessage : "Invalid smc info" , data : error});
    }
};

let update_smc = async function(req,res,next) {
    let body = req.body;
    let update_obj = {};
    update_obj.mobile = body.mobile;
    try {
        let is_smc_exist = await Smc.find({"mobile" : body.mobile});
        if(is_smc_exist.length !== 0) {
            await mongo.updateCollection(Smc,update_obj, body);
            let smc = {};
            var smcData = await Smc.find({"mobile" : body.mobile});
            smc.smc = smcData[0];
            return res.status(201).send({statusMessage : "Smc updated successfully" , data : smc});
        } else {
            console.log('inside else');
            return res.status(403).send({statusMessage : "No smc exist for given email" , data : {}})
        }
    } catch(error) {
        console.log(error);
        return res.status(501).send({satusMessage : "Invalid info" , data : error});
    }
};

module.exports = {
    create_smc:create_smc,
    read_all_smc:read_all_smc,
    read_smc:read_smc,
    delete_smc:delete_smc,
    update_smc:update_smc
}