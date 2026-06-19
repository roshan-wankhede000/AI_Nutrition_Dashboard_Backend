import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
});

const mealSchema = new mongoose.Schema({
  meal: String,
  time: String,
  foods: [foodSchema]
});

const nutritionPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    meals: [mealSchema],

    totalCalories: {
      type: Number,
      default: 0
    },

    totalProtein: {
      type: Number,
      default: 0
    },

    totalCarbs: {
      type: Number,
      default: 0
    },

    totalFat: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const NutritionPlan = mongoose.model(
  "NutritionPlan",
  nutritionPlanSchema
);

export default NutritionPlan;