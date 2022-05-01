const express = require('express');
const router = express.Router();
const Controllers=require('../Controllers/Controllers')

// Blog And Contact Save Data Routes 

router.route('/BlogData').post(Controllers.BlogSaveData);
router.route('/ContactData').post(Controllers.ContactSaveData);

// Blog Read , Read One , Update and Delete Routes
router.route('/BlogRead').get(Controllers.DisplayBlog);
router.route('/BlogReadOne/:slug').get(Controllers.DisplayOneBlog);
router.route('/BlogUpdate').put(Controllers.UpdateBlog);
router.route('/BlogDelete/:id').delete(Controllers.DeleteBlog);
router.route('/ContactRead').get(Controllers.DisplayContact);
router.route('/ContactDelete/:id').delete(Controllers.ContactDelete);
router.route('/ContactUpdate').put(Controllers.ContactUpdate);

// Login Routes
router.route('/Register').post(Controllers.AdminRegister)
router.route('/Login').post(Controllers.AdminLogin)
module.exports=router;