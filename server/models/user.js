import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      max: 50,
    },

    password: {
      type: String,
      require: true,
      min: 5,
    },

    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transctions: Array,
    role: {
      type: String,
      default: "Admin",
      enum: { values: ["admin", "user", "superadmin"] },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
