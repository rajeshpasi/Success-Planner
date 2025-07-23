import bcrypt  from "bcryptjs";
import User from "../models/user.model.js";


const userService = {
    async createUser({ fullName: {firstName, lastName}, email, password, role = "user", Picture, provider = "self", googleId }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName: {firstName,lastName},
            email,
            password: hashedPassword,
            role,
            Picture,
            provider,
            googleId
        });
        return await user.save();
    },
    async getUserByEmail(email) {
        return await User.findOne({ email });
    },
};

export default userService;