let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// User Model
let userSchema = require('../Models/User');
// CREATE User
router.route("/create-user").post(async (req, res, next) => {
    await userSchema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "User added successfully!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});
// Read User
router.route("/").get(async (req, res, next) => {
    await userSchema
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
// Get Single User
router.route("/get-user/:id").get(async (req, res, next) => {
    await userSchema
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
// Update User
router.route("/update-user/:id").put(async (req, res, next) => {
    await userSchema
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
// Delete User
router.route("/delete-user/:id").delete(async (req, res, next) => {
    await userSchema
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({
                msg: "Data successfully deleted.",
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;