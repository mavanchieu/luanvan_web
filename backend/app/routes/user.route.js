const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imageUsers/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.route("/").post(users.create).get(users.findAll);

router.route("/login").post(users.login);

router.route("/logout").get(users.logout);

router.route("/:id").get(users.findById);

router.route("/deleteOne/:id").delete(users.deleteOne);

router.route("/updateUser/:id").put(users.update);

router.route("/updateImage").put(upload.single("image"), users.updateImage);

// router.route("/:id")
//     .put(users.update);

module.exports = router;
