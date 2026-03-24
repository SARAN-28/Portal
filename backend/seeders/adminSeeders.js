const bcrypt = require("bcrypt");
const User = require("../models/user");

const seedAdmin = async () => {

    const adminEmail = process.env.ADMIN_EMAIL

    const existingAdmin = await User.findOne({
        where: { email: adminEmail }
    });

    if (!existingAdmin) {

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

        await User.create({
            name: "Admin1",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin user seeded successfully");
    } else {

        console.log("Initial Admin already exists");
    }
};
module.exports = seedAdmin;