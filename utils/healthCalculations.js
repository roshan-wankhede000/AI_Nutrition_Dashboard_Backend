export const calculateBMI = (
  weight,
  height
) => {
  const heightInMeters = height / 100;

  return Number(
    (
      weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1)
  );
};

export const calculateIBW = (
  gender,
  height
) => {

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