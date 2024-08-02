let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();
const bcrypt = require('bcryptjs');
// User Model
let userSchema = require('../Models/User');
// CREATE User
// router.route("/create-user").post(async (req, res, next) => {
//     const salt = await bcrypt.genSalt(10);
//     userSchema.password = await bcrypt.hash(password, salt);
//     await userSchema
//         .create(req.body)
//         .then((result) => {
           
//             res.json({
//                 data: result,
//                 message: "User added successfully!",
//                 status: 200,
//             });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// });


router.route('/create-user').post(async (req, res, next) => {
    try {
        const { password, ...userData } = req.body; // Extract password and other user data

        if (!password) {
            return res.status(400).json({
                message: 'Password is required.',
                status: 400,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user with the hashed password
        const newUser = await userSchema.create({
            ...userData,
            password: hashedPassword,
        });

        res.json({
            data: newUser,
            message: 'User added successfully!',
            status: 200,
        });
    } catch (err) {
        console.error(err);
        next(err); // Forward the error to the error handling middleware
    }
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
// router.route("/update-user/:id").put(async (req, res, next) => {
//     const salt = await bcrypt.genSalt(10);
//     userSchema.password = await bcrypt.hash(password, salt);
//     await userSchema
//         .findByIdAndUpdate(req.params.id, {
//             $set: req.body,
//         })
//         .then((result) => {
//             console.log(result);
//             res.json({
//                 data: result,
//                 msg: "Data successfully updated.",
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });


function isPasswordHashed(password) {
    // bcrypt hash format starts with $2b$, $2a$, or $2y$
    return /^(\$2[aby]\$)[\d]{2}\$/.test(password);
}

router.route('/update-user/:id').put(async (req, res) => {
    try {
        const { password } = req.body;

        // If a new password is provided and it's not already hashed, hash it
        if (password && !isPasswordHashed(password)) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        } else if (password) {
            // If the password is already hashed, retain it as-is
            req.body.password = password;
        }

        const result = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!result) {
            return res.status(404).json({
                msg: 'User not found',
            });
        }

        // Successfully updated
        res.json({
            data: result,
            msg: 'Data successfully updated.',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Internal server error',
            error: err.message,
        });
    }
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