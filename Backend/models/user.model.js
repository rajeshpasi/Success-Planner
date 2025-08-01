import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {firstName: { type: String, required: true }, lastName: { type: String, required: true }},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    Picture: { type: String },
    terms: { type: Boolean, required: true },
    provider: {type: String, required: true, enum: ["self", "google"], default: "self"},
    googleId: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
export { userSchema, User };
