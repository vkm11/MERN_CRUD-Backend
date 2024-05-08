let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// Student Model
let studentSchema = require('../Models/School');
// CREATE Student
router.route("/create-school").post(async (req, res, next) => {
    await studentSchema
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
// READ Students
router.route("/").get(async (req, res, next) => {
    await studentSchema
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            res.json({
                data: result,
                message: "All school successfully fetched.",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Get Single Student
router.route("/get-school/:id").get(async (req, res, next) => {
    await studentSchema
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
// Update Student
router.route("/update-school/:id").put(async (req, res, next) => {
    await studentSchema
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
// Delete Student
router.route("/delete-school/:id").delete(async (req, res, next) => {
    await studentSchema
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