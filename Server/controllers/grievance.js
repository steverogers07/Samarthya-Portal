mongo = require("../database/database.service");
let schema = require("../database/database.schema");
let userController = require("../controllers/user");
const cron=require('node-cron');

let Grievance = schema.grievance;
let Government = schema.government;
let User = schema.user;
let Followup = schema.folloup;
let Smc = schema.smc;

let create_grievance = async function(req,res,next) {
    let body = req.body;
    let alldata = new Grievance(body);
    try {
        alldata.UpdatedAt = Date.now();
        alldata.status = "Unresolved";
        await mongo.insertIntoCollection(alldata);
        return res.status(201).json({statusMessage: "Grievance inserted successfully", data: alldata});
    } catch(error) {
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let read_grievance = async function(req,res,next) {
    let body = req.body;
    try {
        let grievances = await Grievance.find({"SMCId" : body.SMCId});
        if(grievances.length!=0) {
            return res.status(201).json({statusMessage : "Grievances for this SMC Id read successfully", data : grievances});
        } else {
            return res.status(403).json({statusMessage : "No grievances found for this SMC Id", data : {}});
        }
    } catch(error) {
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let read_all_grievances = async function(req,res,next) {
    let body = req.body;
    try {
        let grievances = await Grievance.find();
        if(grievances.length!=0) {
            return res.status(201).json({statusMessage : "All Grievances read successfully", data : grievances});
        } else {
            return res.status(403).json({statusMessage : "No grievances found", data : {}});
        }
    } catch(error) {
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let update_grievance = async function(req,res,next) {
    let body = req.body;
    try {
        let grievance = await Grievance.find({"_id" : body.GrievanceId});
        if(grievance.length !=0) {
            await mongo.updateCollection(Grievance, {"_id" : body.GrievanceId}, body);
            let grievance = await Grievance.find({"_id" : body.GrievanceId});
            let user = await User.findById({"_id" : grievance[0].SMCId});
            if(grievance[0]['status'] == 'Resolved') {
                const accountSid = process.env.twilioAccountId;
                const authToken = process.env.twilioAuthToken;
                const client = require('twilio')(accountSid, authToken);
                client.messages
                .create({
                    body: 'Your Grievance is resolved now!',
                    from: '+12016694615',
                    to: '+918127880868'    // My Number
                })
                .then(message => console.log(message.sid))
                .catch(err => console.log(err));
            }
            else if(grievance[0]['status'] == 'Partially Resolved') {
                const accountSid = process.env.twilioAccountId;
                const authToken = process.env.twilioAuthToken;
                const client = require('twilio')(accountSid, authToken);
                client.messages
                .create({
                    body: 'Your Grievance is Partially resolved now!',
                    from: '+12016694615',
                    to: '+918127880868'     // My Number
                })
                .then(message => console.log(message.sid))
                .catch(err => console.log(err));
            }
            return res.status(201).json({statusMessage : "Grievance updated successfully", data : grievance[0]});
        } else {
            return res.status(403).json({statusMessage : "No grievances found for this Grievance Id", data : {}});
        }
    } catch(error) {
        console.log("Error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

let send_mail = async function(req,res,next) {
    let body = req.body;
    try {
        let grievance = await Grievance.find({"_id" : body.GrievanceId});
        if(grievance.length !=0) {
            let official = await Government.find({"_id" : grievance[0].officialId});
            let smc = await User.find({"_id" : grievance[0].SMCId, "UserType" : "SMC"});
            if(official.length!=0) {
                let args = {
                    GrievanceId : grievance[0]._id,
                    email : official[0].email,
                    subject : grievance[0].topic,
                    content : `Dear ${official[0].name}, ${smc[0].SchoolName} School is facing the following issue related to ${grievance[0].topic}. \n\n
                                We request you to please look into the matter and try to resolve it and let know the concerned people ASAP. \n\n\n\n
                                Thanks & Regards \n
                                Team Samarthya `                   
                }
                let mail_response = await userController.mail_helper(args);
                if(mail_response == true) {
                    return res.status(201).json({statusMessage : "Mail sent successfully", data : grievance[0]});
                } else {
                    return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                }
            } else {
                return res.status(402).json({statusMessage : "No government official found for corresponding to this GrievanceId", data : {}});
            }
        } else {
            return res.status(403).json({statusMessage : "No grievances found for this Grievance Id", data : {}});
        } 
    } catch(error) {
        console.log("Error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}

cron.schedule('0 * * * *', async () => {
    try {
        let grievances = await Grievance.find({"status" : "Unresolved"});
        for(var i=0;i<grievances.length; i++) {
            let diff = new Date().getTime() - grievances[i].CreatedAt;
            let diffInDays = diff/(1000 * 3600 * 24);
            if(diffInDays>0 && diffInDays<01) {
                let followups = await Followup.find({"GrievanceId" : grievances[i]._id});
                if(followups.length!=0) {
                    let followupDate = followups[0].FollowupDate;
                    let size = followupDate.length;
                    let latest_followup = followupDate[size-1];
                    let followupdiff = new Date().getTime() - latest_followup;
                    let followupDiffInDays = followupdiff/(1000 * 3600 * 24);
                    if(followupDiffInDays > 30 && followupDiffInDays<90) {
                        let allData = {};
                        allData.FollowupNo = followups[0].FollowupNo + 1;
                        allData.FollowupDate = followups[0].FollowupDate;
                        allData.FollowupDate.push(Date.now());
                        await mongo.updateCollection(Followup, {"_id" : followups[0]._id}, allData);
                        let official = await Government.find({"_id" : grievances[i].officialId});
                        let smc = await User.find({"_id" : grievances[i].SMCId, "UserType" : "SMC"});
                        if(official.length!=0) {
                            let args = {
                                GrievanceId : grievances[i]._id,
                                email : official[0].email,
                                subject : grievances[i].topic,
                                content : `Dear ${official[0].name}, ${smc[0].SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                            This is followup number: ${allData.FollowupNo} with reference to above matter .We request you to please look into the matter and try to 
                                            resolve it and let know the concerned people ASAP. \n\n\n\n
                                            Thanks & Regards \n
                                            Team Samarthya `                   
                            }
                            let mail_response = await userController.mail_helper(args);
                            if(mail_response == true) {
                                return res.status(201).json({statusMessage : "Mail sent successfully", data : grievances[i]});
                            } else {
                                return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                            }                    
                        }                        
                    } else {
                        smc = await User.find({"_id" : grievances[i].SMCId});
                        let SchoolName = smc[0].SchoolName;
                        let official = await Government.find({"authority" : "state"});
                        await mongo.updateCollection(Grievance, {"_id" : grievances[i]._id}, {officialId : official[0]._id});
                        console.log(official[0].email);
                        let args = {
                            GrievanceId : grievances[i]._id,
                            email : official[0].email,
                            subject : grievances[i].topic,
                            content : `Dear ${official[0].name}, ${SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                        The issue has been followed up from local level. We request you to please look into the matter and try to 
                                        resolve it and let know the concerned people ASAP. \n\n\n\n
                                        Thanks & Regards \n
                                        Team Samarthya `                   
                        }
                        let mail_response = await userController.mail_helper(args);
                        if(mail_response == true) {
                            return res.status(201).json({statusMessage : "Mail sent successfully", data : grievances[i]});
                        } else {
                            return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                        }
                    }
                } else {
                    let followup_data = {
                        "GrievanceId" : grievances[i]._id,
                        "FollowupNo" : 1,
                        "CreatedAt" : Date.now(),
                        "FollowupDate" : Date.now()
                    }
                    followup_data = new Followup(followup_data);
                    await mongo.insertIntoCollection(followup_data);
                    let official = await Government.find({"_id" : grievances[i].officialId});
                    let smc = await User.find({"_id" : grievance[0].SMCId, "UserType" : "SMC"});
                    if(official.length!=0) {
                        let args = {
                            GrievanceId : grievances[i]._id,
                            email : official[0].email,
                            subject : grievances[i].topic,
                            content : `Dear ${official[0].name}, ${smc[0].SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                        This is your 1st followup with reference to above matter .We request you to please look into the matter and try to 
                                        resolve it and let know the concerned people ASAP. \n\n\n\n
                                        Thanks & Regards \n
                                        Team Samarthya `                   
                        }
                        let mail_response = await userController.mail_helper(args);
                        if(mail_response == true) {
                            return res.status(201).json({statusMessage : "Mail sent successfully", data : grievance[i]});
                        } else {
                            return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                        }                    
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
})

let schedule_reminder = async function(req,res,next) {
    try {
        let grievances = await Grievance.find({"status" : "Unresolved"});
        for(var i=0;i<grievances.length; i++) {
            let diff = new Date().getTime() - grievances[i].CreatedAt;
            let diffInDays = diff/(1000 * 3600 * 24);
            if(diffInDays>0 && diffInDays<01) {
                let followups = await Followup.find({"GrievanceId" : grievances[i]._id});
                if(followups.length!=0) {
                    let followupDate = followups[0].FollowupDate;
                    let size = followupDate.length;
                    let latest_followup = followupDate[size-1];
                    let followupdiff = new Date().getTime() - latest_followup;
                    let followupDiffInDays = followupdiff/(1000 * 3600 * 24);
                    if(followupDiffInDays > 30 && followupDiffInDays<90) {
                        let allData = {};
                        allData.FollowupNo = followups[0].FollowupNo + 1;
                        allData.FollowupDate = followups[0].FollowupDate;
                        allData.FollowupDate.push(Date.now());
                        await mongo.updateCollection(Followup, {"_id" : followups[0]._id}, allData);
                        let official = await Government.find({"_id" : grievances[i].officialId});
                        let smc = await User.find({"_id" : grievances[i].SMCId, "UserType" : "SMC"});
                        if(official.length!=0) {
                            let args = {
                                GrievanceId : grievances[i]._id,
                                email : official[0].email,
                                subject : grievances[i].topic,
                                content : `Dear ${official[0].name}, ${smc[0].SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                            This is followup number: ${allData.FollowupNo} with reference to above matter .We request you to please look into the matter and try to 
                                            resolve it and let know the concerned people ASAP. \n\n\n\n
                                            Thanks & Regards \n
                                            Team Samarthya `                   
                            }
                            let mail_response = await userController.mail_helper(args);
                            if(mail_response == true) {
                                return res.status(201).json({statusMessage : "Mail sent successfully", data : grievances[i]});
                            } else {
                                return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                            }                    
                        }                        
                    } else {
                        smc = await User.find({"_id" : grievances[i].SMCId});
                        let SchoolName = smc[0].SchoolName;
                        let official = await Government.find({"authority" : "state"});
                        await mongo.updateCollection(Grievance, {"_id" : grievances[i]._id}, {officialId : official[0]._id});
                        console.log(official[0].email);
                        let args = {
                            GrievanceId : grievances[i]._id,
                            email : official[0].email,
                            subject : grievances[i].topic,
                            content : `Dear ${official[0].name}, ${SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                        The issue has been followed up from local level. We request you to please look into the matter and try to 
                                        resolve it and let know the concerned people ASAP. \n\n\n\n
                                        Thanks & Regards \n
                                        Team Samarthya `                   
                        }
                        let mail_response = await userController.mail_helper(args);
                        if(mail_response == true) {
                            return res.status(201).json({statusMessage : "Mail sent successfully", data : grievances[i]});
                        } else {
                            return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                        }
                    }
                } else {
                    let followup_data = {
                        "GrievanceId" : grievances[i]._id,
                        "FollowupNo" : 1,
                        "CreatedAt" : Date.now(),
                        "FollowupDate" : Date.now()
                    }
                    followup_data = new Followup(followup_data);
                    await mongo.insertIntoCollection(followup_data);
                    let official = await Government.find({"_id" : grievances[i].officialId});
                    let smc = await User.find({"_id" : grievance[0].SMCId, "UserType" : "SMC"});
                    if(official.length!=0) {
                        let args = {
                            GrievanceId : grievances[i]._id,
                            email : official[0].email,
                            subject : grievances[i].topic,
                            content : `Dear ${official[0].name}, ${smc[0].SchoolName} School is facing the following issue related to ${grievances[i].topic}. \n\n
                                        This is your 1st followup with reference to above matter .We request you to please look into the matter and try to 
                                        resolve it and let know the concerned people ASAP. \n\n\n\n
                                        Thanks & Regards \n
                                        Team Samarthya `                   
                        }
                        let mail_response = await userController.mail_helper(args);
                        if(mail_response == true) {
                            return res.status(201).json({statusMessage : "Mail sent successfully", data : grievance[i]});
                        } else {
                            return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
                        }                    
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error in catch : ", error);
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
}


module.exports = {
    create_grievance : create_grievance,
    read_all_grievances : read_all_grievances,
    read_grievance : read_grievance,
    update_grievance : update_grievance,
    send_mail : send_mail,
    schedule_reminder : schedule_reminder
}