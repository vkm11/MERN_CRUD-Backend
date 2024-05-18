let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
// User Model
let roleSchema = require('../Models/Role');
// CREATE User
router.route("/create-role").post(async (req, res, next) => {
    // await roleSchema
    //     .create(req.body)
    //     .then((result) => {
    //         res.json({
    //             data: result,
    //             message: "Role added successfully!",
    //             status: 200,
    //         });
    //     })
    //     .catch((err) => {
    //         return next(err);
    //     });
    try {
        // Check if the role already exists
        const existingRole = await roleSchema.findOne({ name: req.body.name });
        if (existingRole) {
            return res.status(400).json({
                message: "Role name is already added",
                status: 400,
            });
        }

        // Create new role
        const result = await roleSchema.create(req.body);
        res.status(200).json({
            data: result,
            message: "Role added successfully!",
            status: 200,
        });
    } catch (err) {
        next(err);
    }
});
// Read User
router.route("/").get(async (req, res, next) => {
    await roleSchema
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
router.route("/get-role/:id").get(async (req, res, next) => {
    await roleSchema
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
router.route("/update-role/:id").put(async (req, res, next) => {
    await roleSchema
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
router.route("/delete-role/:id").delete(async (req, res, next) => {
    await roleSchema
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