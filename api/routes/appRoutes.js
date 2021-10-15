// api/routes/userAuth.js
const express = require('express');
const router = express.Router();

const { getMember,
    getHealthMetaData ,calculateBMI
} = require('../controller/appBMI.controller');

router.route('/member')
.get(getMember);
//.post()
//.put(updateMemberBMI);
//.delete();

router.route('/GenerateBMI')
.get(calculateBMI);


//router.route('/Healthdata')
//.get(getHealthMetaData);
//.post()
//.put();

module.exports=router;
