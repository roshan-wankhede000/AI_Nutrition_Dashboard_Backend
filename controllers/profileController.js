import Profile from "../models/Profile.js";


// Calculate BMI
const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;

  return Number(
    (
      weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1)
  );
};


// Calculate IBW
const calculateIBW = (gender, height) => {

  const inches = height / 2.54;

  if (gender === "Male") {
    return Number(
      (
        50 +
        2.3 * (inches - 60)
      ).toFixed(1)
    );
  }

  return Number(
    (
      45.5 +
      2.3 * (inches - 60)
    ).toFixed(1)
  );
};



// CREATE PROFILE
export const createProfile = async (
  req,
  res
) => {

  try {

    const {
      age,
      gender,
      height,
      weight,
      preference,
      goal
    } = req.body;

    const existingProfile =
      await Profile.findOne({
        userId: req.user.id
      });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message:
          "Profile already exists. Use update API."
      });
    }

    const profile =
      await Profile.create({
        userId: req.user.id,
        age,
        gender,
        height,
        weight,
        preference,
        goal
      });

    const bmi =
      calculateBMI(weight, height);

    const ibw =
      calculateIBW(gender, height);

    res.status(201).json({
      success: true,
      profile,
      metrics: {
        bmi,
        ibw
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET PROFILE
export const getProfile = async (
  req,
  res
) => {

  try {

    const profile =
      await Profile.findOne({
        userId: req.user.id
      });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    const bmi =
      calculateBMI(
        profile.weight,
        profile.height
      );

    const ibw =
      calculateIBW(
        profile.gender,
        profile.height
      );

    res.status(200).json({
      success: true,
      profile,
      metrics: {
        bmi,
        ibw
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// UPDATE PROFILE
export const updateProfile = async (
  req,
  res
) => {

  try {

    const {
      age,
      gender,
      height,
      weight,
      preference,
      goal
    } = req.body;

    const profile =
      await Profile.findOneAndUpdate(
        {
          userId: req.user.id
        },
        {
          age,
          gender,
          height,
          weight,
          preference,
          goal
        },
        {
          new: true
        }
      );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    const bmi =
      calculateBMI(
        profile.weight,
        profile.height
      );

    const ibw =
      calculateIBW(
        profile.gender,
        profile.height
      );

    res.status(200).json({
      success: true,
      profile,
      metrics: {
        bmi,
        ibw
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};