const express = require("express");
const brand = require("../controllers/brand.controller");

const router = express.Router();

router.route("/")
    .post(brand.create)
    .get(brand.findAll);
    

router.route("/:id")
    .delete(brand.deleteOne);


router.route("/updateBrand/:id")
    .put(brand.update);
// router.route("/login")
//     .post(users.login);

// router.route("/logout")
//     .get(users.logout);

// router.route("/:id")
//     .get(users.findById);
    
    
// router.route("/:id")
//     .put(users.update);  

module.exports = router;
