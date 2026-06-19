import Profile from "../models/Profile.js";
import NutritionPlan from "../models/NutritionPlan.js";

import {
  generateNutritionPlan
} from "../services/aiService.js";


// Generate Plan
export const generatePlan = async (
  req,
  res
) => {
  try {

   const profile = req.body;

if (
  !profile.age ||
  !profile.gender ||
  !profile.height ||
  !profile.weight ||
  !profile.preference ||
  !profile.goal
) {
  return res.status(400).json({
    success: false,
    message: "All fields are required"
  });
}

    

    const aiPlan =
      await generateNutritionPlan(
        profile
      );

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    aiPlan.meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        totalCalories +=
          food.calories || 0;

        totalProtein +=
          food.protein || 0;

        totalCarbs +=
          food.carbs || 0;

        totalFat +=
          food.fat || 0;
      });
    });

    const nutritionPlan =
      await NutritionPlan.create({
        userId: req.user.id,

        meals: aiPlan.meals,

        totalCalories,

        totalProtein,

        totalCarbs,

        totalFat
      });

    res.status(201).json({
      success: true,
      nutritionPlan
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getNutritionPlan =
  async (req, res) => {

    try {

      const plans =
        await NutritionPlan.find({
          userId: req.user.id
        }).sort({
          createdAt: -1
        });

      res.status(200).json({
        success: true,
        plans
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };

  // update nutritionPlan

  export const updateNutritionPlan =
  async (req, res) => {

    try {

      const plan =
        await NutritionPlan.findById(
          req.params.id
        );

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found"
        });
      }

      if (
        plan.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden"
        });
      }

      plan.meals = req.body.meals;

      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;

      plan.meals.forEach((meal) => {
        meal.foods.forEach((food) => {
          totalCalories +=
            Number(food.calories) || 0;

          totalProtein +=
            Number(food.protein) || 0;

          totalCarbs +=
            Number(food.carbs) || 0;

          totalFat +=
            Number(food.fat) || 0;
        });
      });

      plan.totalCalories =
        totalCalories;

      plan.totalProtein =
        totalProtein;

      plan.totalCarbs =
        totalCarbs;

      plan.totalFat =
        totalFat;

      await plan.save();

      res.status(200).json({
        success: true,
        plan
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };