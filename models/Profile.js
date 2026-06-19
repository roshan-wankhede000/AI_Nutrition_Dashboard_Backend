import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },

    height: {
      type: Number,
      required: true
    },

    weight: {
      type: Number,
      required: true
    },

    preference: {
      type: String,
      enum: [
        "Vegetarian",
        "Vegan",
        "Eggetarian",
        "Non-Vegetarian"
      ],
      required: true
    },

    goal: {
      type: String,
      enum: [
        "Weight Loss",
        "Weight Gain",
        "Maintain Weight"
      ],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;