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
     const data = await HealthMetadata.findAll( { attributes : ['BMI_Max' , 'BMI_Min' , 'id' ]} );
     console.log("All HealthMetadata:", + data.length + JSON.stringify(data, null, 2));
    //  data.forEach(element => {
    //     BMICats.push( element );
    //  });
    // now = Date();
    // console.log("Post populatoin " + data.length + '- '+ JSON.stringify(BMICats, null, 2));

    // get query data
    height = req.query.HeightCm;
    WeightKg = req.query.WeightKg;
    Gender = req.query.Gender;

// wait for DB response
    setTimeout( function () {
    now = Date();
    calculatedBMI = WeightKg/(height/100);
    // get the BMI category and HRisk
    for (let i = 0; i < data.length ; i++)
    {
        
       console.log(data[i]["BMI_Min"] );
        if (!( data[i]["BMI_Min"] )  )
        {
            if (calculatedBMI <= data[i]["BMI_Max"] )
            calculatedBMICategoryId=data[i]["id"];
            
        }
        else if ( !( data[i]["BMI_Max"] ) )
        {
            if (calculatedBMI > data[i]["BMI_Min"] )
            {
                calculatedBMICategoryId=data[i]["id"];
            }
        }
        else
        {
            if ( calculatedBMI > data[i]["BMI_Min"] && calculatedBMI <= data[i]["BMI_Max"] )
                calculatedBMICategoryId=data[i]["id"];
                
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
