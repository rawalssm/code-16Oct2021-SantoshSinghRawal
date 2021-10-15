// get data from DB my sql
const db = require('../../config/db');
const memberdata = require('../../models/Member.js');
const BMICategory = require('../../models/HealthMetadata.js');
var mysql = require('mysql');
//var BMICategoryes = [];

//  endpoints to get user information
exports.getMember = async (req, res) => 
{
    // if connection is successful
    db.dbconn.query("SELECT * from customer", function (err, result, fields) 
    {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      console.log("reached here to get member data ")
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        console.log(row.name);

        res.status(200).json({
            error:false, 
            message:'server is up and running from routes',
            data:row      
        });

    });
    });

    
}

async function  getHealthMetaData  ( BMICategoryes )
{
  
    // if connection is successful
    db.dbconn.query("SELECT * from BMIHealthRisk", function (err, result, fields) 
    {
      // if any error while executing above query, throw error
      if (err) throw err;
      // iterate for all the rows in result
      Object.keys(result).forEach(function(key) {
        var hdata = result[key];
       // console.log(BMICategory);
       var myJsonObj =  "' \"BMIId\" :" + hdata.BMIId +  " \"BMI_Max\" : " + hdata.BMI_Max  +  " \"BMI_Min\" : " + hdata.BMI_Min  + "'"
       BMICategoryes.push( myJsonObj );
       console.log("insided the function "+ myJsonObj );
       
    });
    });
 
}

exports.updateMemberBMI = async (rows) => 
{
    // if connection is successful
    db.dbconn.query("Insert into MemberBMI (MemberId,BMICatgoryHRiskId,startdate) values ?",[rows], function (err, result, fields) 
    {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
    });

} 

exports.calculateBMI = async (req, res) => 
{
    var  now = new Date();
    //  data setup
    var JsonMember = { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 };
    var JsonMember2 = { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 };
    var JsonMember3 ={ "Gender": "Male", "HeightCm": 161, "WeightKg":85 };
    var JsonMember4 ={ "Gender": "Male", "HeightCm": 180, "WeightKg": 77 };
    var JsonMember5 ={ "Gender": "Female","HeightCm": 166,"WeightKg": 62};
    var JsonMember6 ={ "Gender": "Female","HeightCm": 150, "WeightKg": 70};
    var JsonMember7 ={ "Gender": "Female","HeightCm": 167, "WeightKg": 82};
    
    var memberdata = [];
        
    memberdata.push(JsonMember);
    memberdata.push(JsonMember2);
    memberdata.push(JsonMember3);
    memberdata.push(JsonMember4);
    memberdata.push(JsonMember5);
    memberdata.push(JsonMember6);
    memberdata.push(JsonMember7);
    console.log("member pushed");
    var height;
    var WeightKg;
    var myObj , calculatedBMI,calculatedBMICategoryId;

    var BMICats = [];   
    console.log("Initiliting "+ BMICats.length);
    
    
      //// promise block

try{
    
   
    db.dbconn.query("SELECT * from BMIHealthRisk", function (err, result, fields) 
        {
      // if any error while executing above query, throw error
      if (err) throw err;
      // iterate for all the rows in result
      Object.keys(result).forEach(function(key) {
        var hdata = result[key];
       // console.log(BMICategory);
       var myjsonString =  "{ \"BMIId\" :" + hdata.BMIId +  ", \"BMI_Max\" : " + hdata.BMI_Max  +  " ,\"BMI_Min\" : " + hdata.BMI_Min  + "}"
       var myjsonObj = JSON.parse(myjsonString);
       BMICats.push( myjsonObj );
       console.log("Inline "+ myjsonObj );
       
    });
    now = Date();
    console.log("Post populatoin " + BMICats.length + '- '+ now);
    });

    setTimeout( function () {
    //.then( () => { 
       console.log("Post block "+BMICats.length);

    for (let i = 0; i < memberdata.length; i++)
    {
        console.log(memberdata[i]);
        height = memberdata[i]["HeightCm"];
        WeightKg = memberdata[i]["WeightKg"];
        now = Date();
    console.log("finished the for block - "+ i + '- '+ now );
    calculatedBMI = WeightKg/(height/100);
     
    //member.BMI = calculatedBMI;
    
    //get metadata
    //getHealthMetaData(BMICategoryes);
    //console.log("fetched data "+ BMICategoryes);

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
    } // for block

    console.log(memberdata[i]["Gender"] + ' - '+ height + ' - '+ WeightKg + ' - '+ calculatedBMI + ' - '+ calculatedBMICategoryId );
    console.log(BMICats.length);
    } // FOR BLOCK
    }, 3000); // then block
    //Update Member in DB
   // updateMemberBMI(memberdata);

   res.status(200).json({
    error:false, 
    message:'server is up and running from routes data saved to database'
  });

} catch (err)
    {
        console.log("Erro in catch block");
        res.status(500).json({
            error:true, 
            message:'server is not up and running from routes',
            data:null      
        });
    }
}
