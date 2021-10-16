// api/routes/userAuth.js
const express = require('express');
const router = express.Router();

const { getMembers,
    getHealthMetaData , calculateBMI
} = require('../controller/appBMI.controller');

router.route('/members')
.get(getMembers);
//.post()
//.put(updateMemberBMI);
//.delete();

router.route('/GenerateBMI')
.post(calculateBMI);

router.route('/hcrange')
.get(getHealthMetaData);


//router.route('/Healthdata')
//.get(getHealthMetaData);
//.post()
//.put();

module.exports=router;
