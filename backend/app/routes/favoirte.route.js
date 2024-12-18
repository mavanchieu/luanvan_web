const express = require('express');
const   FavoriteController = require("../controllers/favorite.controller");

const router = express.Router();

router.route("/")
        .get(FavoriteController.findAll)
        .post(FavoriteController.create);

// fetch theo userId
router.route("/:id")
       // .get(FavoriteController.getAllId)
        // .put(FavoriteController.updateStatus)
        .delete(FavoriteController.deleteOne);

router.route("/deleteAll/:userId")
        .delete(FavoriteController.deleteAll);

router.route("/findByUserId/:userId")
        .get(FavoriteController.findByUserId);

module.exports = router;
