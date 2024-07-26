let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
let teacherSchema = require('../Models/Teacher.js');
// CREATE Teacher
router.route("/create-teacher").post(async (req, res, next) => {
    await teacherSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully added!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// READ Teacher
router.route("/").get(async (req, res, next) => {
    await teacherSchema
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
// Get Single Teacher
router.route("/get-teacher/:id").get(async (req, res, next) => {
    await teacherSchema
        .findById(req.params.id)
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Update Teacher
router.route("/update-teacher/:id").put(async (req, res, next) => {
    await teacherSchema
        .findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        .then((result) => {
            console.log(result);
            res.json({
                data: result,
                msg: "Data successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
// Delete Teacher
router.route("/delete-teacher/:id").delete(async (req, res, next) => {
    await teacherSchema
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                msg: "Data successfully updated.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;