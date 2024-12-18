const express = require("express");
const size = require("../controllers/size.controller");

const router = express.Router();

router.route("/")
    .post(size.create)
    .get(size.findAll);
    

router.route("/getAll")
    .get(size.getAll);
    

router.route("/:id")
    .delete(size.deleteOne);


router.route("/updateSize/:id")
    .put(size.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
