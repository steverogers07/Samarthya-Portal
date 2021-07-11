mongo = require("../database/database.service");
let schema = require("../database/database.schema");

let Followup = schema.folloup;
let Grievance = schema.grievance;

let create_followup = async function(req,res,next) {
    let body = req.body;
    body.FollowupDate.split("-").reverse().join("-");
    try {
        let allData = new Followup(body);
        allData.FollowupDate = Date.now();
        if(!body.FollowupNo) {
            allData.FollowupNo = 1;
        }
        await mongo.insertIntoCollection(allData);
        return res.status(201).json({statusMessage : "Followup inserted successfully", data : allData});
    } catch (error) {
        console.log("error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let update_followup = async function(req,res,next) {
    let body = req.body;
    try {
        let followup = await Followup.find({"GrievanceId" : body.GrievanceId});
        if(followup.length !=0) {
            let alldata = body;
            if(!body.FollowupNo) {
                alldata.FollowupNo = followup[0].FollowupNo + 1;
            }
            // let newDate = new Date(body.FollowupDate);
            // alldata.$push = {FollowupDate : newDate};
            alldata.FollowupDate = followup[0].FollowupDate;
            alldata.FollowupDate.push(Date.now(body.FollowupDate));
            await mongo.updateCollection(Followup, {"GrievanceId" : body.GrievanceId}, alldata);
            followup = await Followup.find({"GrievanceId" : body.GrievanceId});
            return res.status(201).json({statusMessage : "Followup updated successfully", data : followup[0]});
        } else {
            return res.status(403).json({statusMessage : "No Followups found for this Grievance Id", data : {}});
        }
    } catch(error) {
        console.log("error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let read_followup = async function(req,res,next) {
    let body = req.body;
    try {
        let followup = await Followup.find({"GrievanceId" : body.GrievanceId});
        if(followup.length !=0) {
            let obj = {};
            let grievance = await Grievance.find({"_id" : followup[0].GrievanceId});
            obj.Grievance = grievance[0];
            obj.Followup = followup[0];
            return res.status(201).json({statusMessage : "Followup read success", data : obj});
        } else {
            return res.status(403).json({statusMessage : "No followups found for this Grievance Id", data : {}});
        }
    } catch(error) {
        console.log("erro in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let read_all_followups = async function(req,res,next) {
    let ans = [];
    try {
        let followups = await Followup.find();
        if(followups.length!=0) {
            for(var i=0;i<followups.length; i++) {
                let obj = {};
                obj.Followup = followups[i];
                let grievance = await Grievance.find({"_id" : followups[i].GrievanceId});
                obj.Grievance = grievance[0];
                ans.push(obj);
            }
            return res.status(201).json({statusMessage : "Followups read successfully", data : ans});
        } else {
            return res.status(403).json({statusMessage : "No followups found", data : {}});
        }
    } catch (error) {
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}


module.exports = {
    create_followup : create_followup,
    update_followup : update_followup,
    read_followup : read_followup,
    read_all_followups : read_all_followups
}