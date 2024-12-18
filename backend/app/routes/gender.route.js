const express = require("express");
const gender = require("../controllers/gender.controller");

const router = express.Router();

router.route("/")
    .post(gender.create)
    .get(gender.findAll);
    

router.route("/:id")
    .delete(gender.deleteOne);


router.route("/updateGender/:id")
    .put(gender.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
