let = mongo = require("../database/database.service");
let schema = require("../database/database.schema");
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
let nodemailer = require("nodemailer");
const {google} = require("googleapis");
let smtpTransport = require('nodemailer-smtp-transport');
let jwt = require("jsonwebtoken");
let fs = require("fs");
let handlebars = require("handlebars");

let User = schema.user;
let Grievance = schema.grievance;

const oAuth2Client = new google.auth.OAuth2(
	process.env.clientId,
	process.env.clientSecret,
	process.env.redirecturl
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.refreshToken });

  

let get_access_token=async function()
{
	const accessToken = await oAuth2Client.getAccessToken();
	return accessToken;
}

let transporter = nodemailer.createTransport({
	service: "Gmail",
	 //host: 'smtp.zoho.com',
	 //port : 465,
	 //secure : true,
	auth: {
		type: 'OAuth2',
        user: process.env.NodemailerEmail,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: get_access_token(),
	},
});

let user_signup = async function(req,res,next) {
    let body = req.body;
    let alldata = new User(body);
    try {
        let is_user_exist = await User.find({mobile: alldata.mobile});
        if(is_user_exist.length === 0) {
            alldata.password = bcrypt.hashSync(req.body.password,SALT_WORK_FACTOR);
            alldata.UpdatedAt = Date.now();
            await mongo.insertIntoCollection(alldata);
            let user = {};
            let userData = await User.find({ Email: alldata.Email });
            userData[0].Password = "";
            return res.status(201).json({ statusMessage: "User inserted successfully", data: user });   
        } else {
            return res.status(409).json({ statusMessage: "User already exist for this phone no.", data: {} });
        }
    } catch(error) {
        return res.status(501).json({ statusMessage: "Error in catch", data: error });
    }
};

let user_login = async function (req, res, next) {
	let body = req.body;
	try {
		let is_user_exist = await User.find({ "mobile": req.body.mobile });
        console.log('Hey')
		if (is_user_exist.length !== 0) {
			let userData = is_user_exist[0];
			if (bcrypt.compareSync(req.body.Password, userData.password)) {
				return res.status(201).json({ statusMessage: "Login successful", data: is_user_exist[0] });
			} else {
				return res.status(401).json({ statusMessage: "Incorrect password entered", data: {} });
			}
		} else {
			return res.status(403).json({ statusMessage: "User doesn't exist", data: {} });
		}
	} catch (error) {
        console.log("Error in catch : ", error);
		return res.status(501).json({ statusMessage: "Error in catch", data: error });
	}
};

let read_user = async function(req,res,next) {
    let body = req.body;
    try {
        let userData = await mongo.findFromCollection(User,body);
        if(userData.length !=0 ) {
            let user = {};
            user.user = userData[0];
            user.user.password = '';
            return res.status(201).send({statusMessage : "User read success" , data : user});
        } else {
            return res.staus(403).send({statusMessage : "User doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.status(501).send({statusMessage : "Invalid user info" , data : error});
    }
}

let read_all_users = async function(req,res,next) {
    try {
        let users = await mongo.findFromCollection(User);
        let temp_arr = [];
        for(var i=0;i<users.length;i++) {
            temp_arr.push(users[i]);
        }
        let user = {};
        user.user = temp_arr;
        return res.status(201).send({API : "READ_USERS_API", statusMessage : "User read success" , data : user});
    } catch(error) {
        console.log("Error in catch : ", error);
        return res.status(501).send({statusMessage : "Error in catch" , data : error});
    }
}

let delete_user = async function(req,res,next) {
    let body = req.body;
    try {
        let userData = await mongo.findFromCollection(User,body);
        if(userData.length !=0) {
            let user = {};
            user.user = userData[0];
            user.user.password = '';
            await mongo.deleteFromCollection(User,body);
            return res.status(201).send({statusMessage : "Deleted user" , data : user});
        } else {
            return res.status(403).send({ statusMessage : "User doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.status(501).send({ statusMessage : "Invalid user info" , data : error});
    }
}

let update_user = async function(req,res,next) {
    let body = req.body;
    let update_obj = {};
    update_obj.mobile = body.mobile;
    try {
        let is_user_exist = await User.find({"mobile" : body.mobile});
        if(is_user_exist.length !== 0) {
            await mongo.updateCollection(User,{"mobile" : body.mobile}, body);
            let user = {};
            var userData = await User.find({"mobile" : body.mobile});
            user.user = userData[0];
            user.user.password = '';
            return res.status(201).send({statusMessage : "User updated successfully" , data : user});
        } else {
            console.log('inside else');
            return res.status(403).send({tatusMessage : "No user exist for given email" , data : {}})
        }
    } catch(error) {
        console.log(error);
        return res.status(501).send({atusMessage : "Invalid info" , data : error});
    }
}


let mail_helper = async function(args) {
    let grievance = await Grievance.find({"_id" : args.GrievanceId});
    let smc = await User.find({"_id" : grievance[0].SMCId, "UserType" : "SMC"});
    fs.writeFile(grievance[0].topic + "-" + "SchoolName" + ".pdf", grievance[0].pdf.toString('UTF-8'), {encoding : 'base64'}, (err) => {
        console.log("File created");
    })
    let htmlToSend = args.content;
	return new Promise((resolve, reject) => {
		let mailOptions = {
			to: args.email,
			subject: args.subject,
			html: htmlToSend,
            attachments: [ {
                filename : grievance[0].topic + "-" + "SchoolName" + ".pdf",
                path : "./"  + grievance[0].topic + "-" + "SchoolName" + ".pdf"
            }]
		};
        transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log(`Error while sending mail : ${err}`);
            reject(err);
        } else {
            console.log("Mail sent");
            fs.unlinkSync("./" + grievance[0].topic + "-" + "SchoolName" + ".pdf");
            resolve(true);
        }
        });
	});
}


let mailing_api = async function(req,res,next) {
    let body = req.body;
    try {
        let data = {};
        let mail_response = await send_mail(body);
        if(mail_response == true) {
            return res.status(201).json({statusMessage : "Mail sent successfully", data : {}});
        } else {
            return res.status(422).json({ statusMessage: "Error while sending mail, Invalid Email", data: mail_response.err });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({atusMessage : "Invalid info" , data : error});
    }
}


module.exports = {
    user_signup : user_signup,
    user_login : user_login,
    read_user : read_user,
    read_all_users : read_all_users,
    update_user : update_user,
    delete_user : delete_user,
    mailing_api : mailing_api,
    mail_helper : mail_helper
}