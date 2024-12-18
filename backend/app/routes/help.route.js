const express = require("express");
const help = require("../controllers/help.controller");

const router = express.Router();

router.route("/findByUserId/:userId")
    .get(help.findByUserId);

router.route("/")
    .post(help.create)
    .get(help.findAll);
    

router.route("/:id")
    .delete(help.deleteOne);


router.route("/updateHelp/:id")
    .put(help.update);

router.route("/replyQuestion/:id")
    .put(help.replyQuestion);

// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
