const express = require("express");
const collectionController = require("../controllers/collection.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "imageCollections/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{ name: "images", maxCount: 10 }]),
    collectionController.create
  )
  .get(collectionController.findAll);

router
  .route("/createSeasonalCollection/")
  .post(
    upload.fields([{ name: "images", maxCount: 10 }]),
    collectionController.createSeasonalCollection
  );

router
  .route("/seasonalCollection")
  .get(collectionController.findAllSeasonalCollection);

router
  .route("/deleteOneBrandCollection/:id")
  .delete(collectionController.deleteOneBrandCollection);

router
  .route("/deleteOneSeasonalCollection/:id")
  .delete(collectionController.deleteOneSeasonalCollection);

router
  .route("/updateSeasonalCollection/:id")
  .put(collectionController.updateSeasonalCollection);

//   .get(collectionController.findAll);
// router
//   .route("/updateCollection/:collectionId")
//   .put(
//     upload.fields([{ name: "images", maxCount: 10 }]),
//     collectionController.update
//   );

// router.route("/deleteOne/:id").delete(collectionController.deleteOne);

module.exports = router;
