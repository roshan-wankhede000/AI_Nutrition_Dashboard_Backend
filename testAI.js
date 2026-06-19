import dotenv from "dotenv";
dotenv.config();

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

import { generateNutritionPlan } from "./services/aiService.js";

const profile = {
  age: 25,
  gender: "Male",
  height: 175,
  weight: 75,
  preference: "Vegetarian",
  goal: "Weight Gain",
};

try {
  const result = await generateNutritionPlan(profile);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error);
}