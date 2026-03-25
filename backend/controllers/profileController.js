const EmployeeProfile = require("../models/employeeProfile");

exports.getProfile = async (req, res) => {

    try {
        const profile = await EmployeeProfile.findOne({
            where: { user_id: req.user.id }
        });

        if (!profile) {
            return res.json({
                message: "Profile not found",
                profile: null
            });
        }
        res.json({profile});

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.upsertProfile = async (req, res) => {

    try {
        const userId = req.user.id;

        let profile = await EmployeeProfile.findOne({
            where: { user_id: userId }
        });

        const allowedFields = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            secondary_email: req.body.secondary_email,
            age: req.body.age,
            blood_group: req.body.blood_group,
            address: req.body.address,
            gender: req.body.gender,
            about: req.body.about,
            pan: req.body.pan,
            aadhar: req.body.aadhar,
            phone: req.body.phone,
            work_address: req.body.work_address,
            permanent_address: req.body.permanent_address,
            institution: req.body.institution,
            specialization: req.body.specialization,
            completion_date: req.body.completion_date
        };
        if (profile) {
            await profile.update(allowedFields);

        } else {
            profile = await EmployeeProfile.create({
                ...allowedFields,
                user_id: userId
            });
        }

        const isComplete =
            profile.first_name &&
            profile.last_name &&
            profile.secondary_email &&
            profile.age &&
            profile.address &&
            profile.gender &&
            profile.phone

        profile.is_profile_complete = !!isComplete;
        await profile.save();

        res.json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};