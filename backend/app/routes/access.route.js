const express = require("express");
const access = require("../controllers/access.controller");

const router = express.Router();

router.route("/")
    .post(access.create)
    .get(access.findAll);
    

// router.route("/:id")
//     .delete(access.deleteOne);


// router.route("/updateAccess/:id")
//     .put(access.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
