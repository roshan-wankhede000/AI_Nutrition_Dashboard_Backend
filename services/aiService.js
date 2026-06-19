import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateNutritionPlan = async (profile) => {
  const prompt = `
Generate a 1-day nutrition plan.

Return ONLY valid JSON.

User Profile:
Age: ${profile.age}
Gender: ${profile.gender}
Height: ${profile.height} cm
Weight: ${profile.weight} kg

Preference: ${profile.preference}
Goal: ${profile.goal}

Return JSON in this format:

{
  "meals":[
    {
      "meal":"Breakfast",
      "time":"8:00 AM",
      "foods":[
        {
          "name":"Oats",
          "quantity":"100g",
          "calories":350,
          "protein":15,
          "carbs":50,
          "fat":8
        }
      ]
    }
  ]
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  let response =
    completion.choices[0].message.content;

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(response);
};