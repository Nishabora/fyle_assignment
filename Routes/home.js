const express = require('express');
const router = express.Router();
const homeController = require("../Controllers/home.js");

router.get('/',homeController.getUser);

router.get('/searchUser',homeController.getUser)    

router.get('/getOwnerRepos',homeController.getOwnerRepos)
module.exports = router;
