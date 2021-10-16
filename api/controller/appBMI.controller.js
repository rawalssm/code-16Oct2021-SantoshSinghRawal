// get data from DB my sql
const ormtool = require('../../config/db');
var mysql = require('mysql');
const MemberBMI = ormtool.db.MemberBMI;
const HealthMetadata = ormtool.db.HealthMetadata;
//var BMICategoryes = [];

//  endpoints to get user information
exports.getMembers = async (req, res) => 
{
    MemberBMI.findAll()
        .then(data => {
                res.send(data);
            })
      .catch(err => {
                res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving MemberBMI."
                });
      });
};


exports.getHealthMetaData = async (req, res) =>
{
    HealthMetadata.findAll()
        .then(data => {
                res.send(data);
            })
      .catch(err => {
                res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving MemberBMI."
                });
      });
 
}

getHealthMetaData2 = async () =>
{
    HealthMetadata.findAll()
        .then(data => {
                return data ;
            })
      .catch(err => {
                return ( "Some error occurred while retrieving MemberBMI." );
      });
 
}

createMemberBMI = async (member) => 
{
    MemberBMI.create(member)
        .then(data => {
        console.log(data);
        })
    .catch(err => {
        console.log("Error - while inserting the data");
    });
} 

exports.calculateBMI = async (req, res) => 
{
    var  now = new Date();
    console.log("starting ......... ");
    var height =0 ;
    var WeightKg=0;
    var Gender ="None";
    var myObj , calculatedBMI , calculatedBMICategoryId;
    var BMICats = [];   
    console.log("Initiliting "+ BMICats.length);
    
try{
    console.log("Starting try block " );
   data = getHealthMetaData2();
      Object.keys(data).forEach(function(key) {
        var hdata = result[key];
        var myjsonString =  "{ \"BMIId\" :" + hdata.BMIId +  ", \"BMI_Max\" : " + hdata.BMI_Max  +  " ,\"BMI_Min\" : " + hdata.BMI_Min  + "}"
        var myjsonObj = JSON.parse(myjsonString);
            BMICats.push( myjsonObj );
        });
    now = Date();
    console.log("Post populatoin " + BMICats.length + '- '+ now);

    // get query data
    height = req.query.HeightCm;
    WeightKg = req.query.WeightKg;
    Gender = req.query.Gender;

// wait for DB response
    setTimeout( function () {
    now = Date();
    calculatedBMI = WeightKg/(height/100);
    // get the BMI category and HRisk
    for (let i = 0; i < BMICats.length; i++)
    {
        //if ( BMICat.BMI_MIN === 'undefined'  )
        console.log(BMICats[i]["BMI_Min"] );
        if (!( BMICats[i]["BMI_Min"] )  )
        {
            if (calculatedBMI <= BMICats[i]["BMI_Max"] )
            calculatedBMICategoryId=BMICats[i]["BMIId"];
            
        }
        else if ( !( BMICats[i]["BMI_Max"] ) )
        {
            if (calculatedBMI > BMICats[i]["BMI_Min"] )
            {
                calculatedBMICategoryId=BMICats[i]["BMIId"];
            }
        }
        else
        {
            if ( calculatedBMI > BMICats[i]["BMI_Min"] && calculatedBMI <= BMICats[i]["BMI_Max"] )
                calculatedBMICategoryId=BMICats[i]["BMIId"];
                
        }
    } // for block BMICats

    var memberbmi =  
    {
        Gender: Gender,
        HeightCm : height ,
        WeightKg :WeightKg ,
        BMICategoryId :calculatedBMICategoryId
    }

    //Update Member in DB
    createMemberBMI(memberbmi);

    console.log(Gender + ' - '+ height + ' - '+ WeightKg + ' - '+ calculatedBMI + ' - '+ calculatedBMICategoryId );
    res.status(200).json({
        error:false, 
        data: Gender + ' - '+ height + ' - '+ WeightKg + ' - '+ calculatedBMI + ' - '+ calculatedBMICategoryId
    });
    }, 1000 ); // timeout for 1 seconds

}catch (err)
        {
        console.log("Error in catch block");
        res.status(500).json({
            error:true, 
            message:'server is not up and running from routes',
            data:Gender + ' - '+ height + ' - '+ WeightKg + ' - '+ calculatedBMI + ' - '+ calculatedBMICategoryId 
        });
    }
}
