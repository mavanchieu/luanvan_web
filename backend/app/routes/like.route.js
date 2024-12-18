const express = require("express");
const like = require("../controllers/like.controller");

const router = express.Router();

router.route("/")
    .post(like.create)
    .get(like.findAll);
    

router.route("/:id")
    .delete(like.deleteOne);


router.route("/updateLike/:id")
    .put(like.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
