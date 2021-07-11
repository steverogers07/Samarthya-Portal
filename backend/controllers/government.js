mongo = require("../database/database.service");

let schema = require("../database/database.schema");
let Government = schema.government;


let create_government = async function(req,res,next) {
    let body = req.body;
    let alldata = new Government(body);
    try {
        await mongo.insertIntoCollection(alldata);
        let government = {};
        let governmentData = await Government.find({"email" : alldata.email});
        if (governmentData)
        return res.send({statusCode : 0 , statusMessage : "Government inserted successfully" , data : government});       
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid government info" , data : error});
    }
};

let read_government = async function(req,res,next) {
    let body = req.body;
    try {
        let GovernmentData = await mongo.findFromCollection(Government,body);
        if(GovernmentData.length !=0 ) {
            let government = {};
            government.government = GovernmentData[0];
            return res.status(201).send({statusMessage : "Government read success" , data : government});
        } else {
            return res.staus(403).send({statusMessage : "Government doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.status(501).send({statusMessage : "Invalid  info"});
    }
};


let read_all_government = async function(req,res,next) {
    try {
        let GovernmentData = await Government.find();
        if(GovernmentData.length!=0) {
            return res.status(201).json({statusMessage : "All Govt officials read successfully", data : GovernmentData});
        } else {
            return res.status(403).json({statusMessage : "No govt officials found", data : {}});
        }
    } catch (error) {
        return res.status(501).send({statusMessage : "Invalid  info"});
    }
}


let delete_government = async function(req,res,next) {
    let body = req.body;
    try {
        let governmentData = await mongo.findFromCollection(Government,body);
        if(governmentData.length !=0) {
            let government = {};
            government.government = governmentData[0];
            await mongo.deleteFromCollection(Government,body);
            return res.status(201).send({statusMessage : "Deleted Government" , data : government});
        } else {
            return res.status(403).send({ statusMessage : "Government doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.status(501).send({ statusMessage : "Invalid Government info" , data : error});
    }
};

let update_government = async function(req,res,next) {
    let body = req.body;
    let update_obj = {};
    update_obj.mobile = body.mobile;
    try {
        let is_government_exist = await Government.find({"mobile" : body.mobile});
        if(is_government_exist.length !== 0) {
            await mongo.updateCollection(Government,{"mobile" : body.mobile}, body);
            var GovernmentData = await Government.find({"mobile" : body.mobile});
            return res.status(201).send({statusMessage : "Government details updated successfully" , data : GovernmentData[0]});
        } else {
            console.log('inside else');
            return res.status(403).send({statusMessage : "No Government exist for given email" , data : {}})
        }
    } catch(error) {
        console.log(error);
        return res.status(501).send({satusMessage : "Invalid info" , data : error});
    }
};

module.exports = {
    create_government:create_government,
    read_government:read_government,
    read_all_government : read_all_government,
    delete_government:delete_government,
    update_government:update_government
}