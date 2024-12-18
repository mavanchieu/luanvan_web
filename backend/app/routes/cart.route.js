const express = require("express");
const cart = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .post(cart.create)
    .get(cart.findAll);
    
router.route("/findByUserId/:userId")
    .get(cart.findByUserId);

router.route("/:id")
    .delete(cart.deleteOne);

router.route("/deleteAll/:userId")
    .delete(cart.deleteAll);



router.route("/updateCart/:id")
    .put(cart.update);

    

// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
