let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// Section Model
let sectionSchema = require('../Models/Section');
// CREATE Section
router.route("/create-section").post(async (req, res, next) => {
    await sectionSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Section added successfully!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
router.route("/").get(async (req, res, next) => {
    await sectionSchema
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({
                data: result,
                message: "All items successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Get Single Section
router.route("/get-section/:id").get(async (req, res, next) => {
    await sectionSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Section successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Update
router.route("/update-section/:id").put(async (req, res, next) => {
    await sectionSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            console.log(result);
            res.json({
                data: result,
                msg: "Section successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
router.route("/delete-section/:id").delete(async (req, res, next) => {
    await sectionSchema
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                msg: "Section successfully Deleted.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;