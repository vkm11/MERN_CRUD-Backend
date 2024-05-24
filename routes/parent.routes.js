let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// User Model
let parentSchema = require('../Models/Parent');
// CREATE User
router.route("/create-parent").post(async (req, res, next) => {
    await parentSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Parent added successfully!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// get parent
router.route("/").get(async (req, res, next) => {
    await parentSchema
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
// Get Single Parent
router.route("/get-parent/:id").get(async (req, res, next) => {
    await parentSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Parent successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Update User
router.route("/update-parent/:id").put(async (req, res, next) => {
    await parentSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            console.log(result);
            res.json({
                data: result,
                msg: "Parent successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;