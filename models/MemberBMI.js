module.exports = (sequelize, Sequelize) => {
    const MemberBMI = sequelize.define("memberbmi", 
    {
    Gender: {  type: Sequelize.STRING},
    HeightCm : { type: Sequelize.FLOAT },
    WeightKg :  { type: Sequelize.FLOAT },
    BMICategoryId :{ type: Sequelize.INTEGER },
    datainserted :{ type: Sequelize.STRING }
    });
    
    
    return MemberBMI;
    
    };