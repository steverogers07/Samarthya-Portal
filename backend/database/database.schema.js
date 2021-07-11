var mongoose = require('mongoose');

const User = new mongoose.Schema( {
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        // required: true,
        configurable : true
    },
    UserType: {
        type: String, 
        enum: [
            "SMC",
            "Samarthya"
        ],
        default: "SMC",
        required: true,
    },
    email: {
        type: String,
        // required: true
    },
    mobile: {
        type: Number,
        required: false
    },
    SchoolId: {
        type: String,
        required: false
    },
    SchoolName: {
        type: String,
        required: false
    },
    SchoolRegion: {
        type: String,
        required: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: Date,
    dateOfBirth: {
        type: Date
    }
}, {
    autoIndex: false,
    writeConcern: {
        j: true,
        wtimeout: 1000
    }
});

var Users = mongoose.model("users", User);

module.exports.user = Users;


const Government_schema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    authority:
     {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required:true
    }
}, {
    autoIndex: false,
    writeConcern: {
        j: true,
        wtimeout: 1000
    }
});
var Governments = mongoose.model("government", Government_schema);

module.exports.government = Governments;


const Smc_schema = new mongoose.Schema( {
    SMCId: [{
        type: "ObjectId",
        ref: "Users"
      }],
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, {
    autoIndex: false,
    writeConcern: {
        j: true,
        wtimeout: 1000
    }
});
var Smc = mongoose.model("smc", Smc_schema);

module.exports.smc = Smc;


const Grievance_schema = new mongoose.Schema({
    SMCId : {
        type: "ObjectId",
        ref: "Users"
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: Date,
    category: String,
    topic: String,
    issue: String,
    officialId:{
        id: {
            type: "ObjectId",
            ref: "Governments"
        }
    },
    status: {
        type: String, 
        enum: [
            "Unresolved",
            "Partially Resolved",
            "Resolved"
        ],
        default: "Unresolved",
        required: true,
    },
    socialMedia: {
        type: Boolean,
        default : false
    },
    pdf: Buffer
}, {
    autoIndex: false,
    writeConcern: {
        j: true,
        wtimeout: 1000
    }
});

var Grievances = mongoose.model("grievances", Grievance_schema);
module.exports.grievance = Grievances;


const Followup_schema = new mongoose.Schema({
    GrievanceId : {
        type: "ObjectId",
        ref: "Grievances"
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: Date,
    FollowupDate : [{
        type : Date
    }],
    FollowupNo : {
        type : Number
    },
    Description : {
        type : String
    }
}, {
    autoIndex: false,
    writeConcern: {
        j: true,
        wtimeout: 1000
    }
})

var Followup = mongoose.model("folloup", Followup_schema);
module.exports.folloup = Followup;


