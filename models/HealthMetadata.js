module.exports = (sequelize, Sequelize) => {
    const HealthMetadata = sequelize.define("bmihealthrisk", 
    {
    BMI_Max: {  type: Sequelize.FLOAT},
    BMICategory : { type: Sequelize.STRING    },
    HealthRisk :  { type: Sequelize.STRING },
    BMI_Min :{ type: Sequelize.FLOAT }
    });
    
    
    return HealthMetadata;
    
    };