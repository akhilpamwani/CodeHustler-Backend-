const express = require('express');
const router = express.Router();
const Controllers=require('../Controllers/Controllers')

router.route('/SaveData').post(Controllers.BlogSaveData);
router.route('/ContactData').post(Controllers.ContactSaveData);

module.exports=router;