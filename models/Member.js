var JsonMember = { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 };
var JsonMember2 = { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 };
var JsonMember3 ={ "Gender": "Male", "HeightCm": 161, "WeightKg":85 };
var JsonMember4 ={ "Gender": "Male", "HeightCm": 180, "WeightKg": 77 };
var JsonMember5 ={ "Gender": "Female","HeightCm": 166,"WeightKg": 62};
var JsonMember6 ={ "Gender": "Female","HeightCm": 150, "WeightKg": 70};
var JsonMember7 ={ "Gender": "Female","HeightCm": 167, "WeightKg": 82};

const memberdata = [];

createJsondata = () =>
{
memberdata.push(JsonMember);
memberdata.push(JsonMember2);
memberdata.push(JsonMember3);
memberdata.push(JsonMember4);
memberdata.push(JsonMember5);
memberdata.push(JsonMember6);
memberdata.push(JsonMember7);
console.log("member pushed");
console.log(memberdata[0]["Gender"]);
};

module.exports =
{ 
    createJsondata
}

