var express = require('express');
var router = express.Router();
const user = require('../controllers/userControllers/user');
const userType = require('../controllers/userControllers/usetType');
const privilage = require('../controllers/userControllers/privilege');
const checkAuth = require('../middleware/check-auth');


//DAPP
router.post("/searchByDID", user.searchByDID);
router.post("/addDID", user.addDID);
router.post("/updateDID", user.updateDID);
router.post("/getMeeting", user.getMeeting);















//user
router.post("/getAllUsers", user.getAllUsers);
router.post("/getUsersList", user.getUsersList);
router.post("/getUsersListByLeader", user.getUsersListByLeader);
router.post("/update", user.update);
// router.post("/register", user.register);
router.post("/signUp", user.signUp);
router.post("/userLogin", user.userLogin);
router.post("/getUserKeys", user.getUserKeys);
router.post("/saveNewUser", user.saveNewUser);
router.post("/getAllUsers", user.getAllUsers);
router.post("/searchUserById", user.searchUserById);
router.post("/sendLoginInformation", user.sendLoginInformation);
router.post("/createPassword", user.createPassword);
router.post("/getUserData", user.getUserData);

//userType
router.post("/getAllUserType", userType.getAllUserType);


//privilage
router.post("/getPrivilagesByUserType", privilage.getPrivilagesByUserType);

//Sms
router.post("/singalMessage", user.singalMessage);


//online registration
router.post("/onreg", user.checkForEmptyPinAndRegister);
router.post("/signUpPersanal", user.signUpPersanal);


//KUMI

router.post("/getDistric", user.getDistric);
router.post("/getCitys", user.getCitys);


router.post("/getLeaders", user.getLeaders);
router.post("/getTranings", user.getTranings);
router.post("/getTraningsByUsers", user.getTraningsByUsers);
router.post("/deleteTraning", user.deleteTraning);
router.post("/setTrening", user.setTrening);





router.post("/getOldData", user.getOldData);
router.post("/setOldTrening", user.setOldTrening);



module.exports = router;